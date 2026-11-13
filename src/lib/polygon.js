import { ethers } from "ethers";

export const POLYGON_HEX_CHAIN_ID = "0x89";
export const POLYGON_RPC = "https://polygon-bor-rpc.publicnode.com";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const ENV_ESCROW_ADDRESS = (
  import.meta.env.VITE_POLYGON_ESCROW_ADDRESS || ""
).trim();

export const POLYGON_TOKENS = [
  { symbol: "POL", address: ZERO_ADDRESS, decimals: 18 },
  {
    symbol: "USDT",
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    decimals: 6,
  },
  {
    symbol: "USDC",
    address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
    decimals: 6,
  },
];

const ESCROW_ABI = [
  "function payNative(bytes32 dropId, address seller) external payable",
  "function payToken(bytes32 dropId, address token, uint256 amount, address seller) external",
  "event Paid(bytes32 indexed dropId, address indexed buyer, address indexed seller, address token, uint256 amount)",
];

const ERC20_ABI = [
  "function approve(address spender, uint256 value) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
];

const PAID_IFACE = new ethers.Interface([
  "event Paid(bytes32 indexed dropId, address indexed buyer, address indexed seller, address token, uint256 amount)",
]);

export function shortAddress(addr) {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function isValidEscrowAddress(addr) {
  return ethers.isAddress(addr) && !addr.toLowerCase().includes("your_deployed");
}

export async function connectPolygonWallet() {
  if (!window.ethereum) {
    throw new Error("Install MetaMask, Rabby, or Trust Wallet to connect.");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  if (!accounts.length) throw new Error("Wallet connection rejected.");

  await switchToPolygon();
  return ethers.getAddress(accounts[0]);
}

export async function switchToPolygon() {
  if (!window.ethereum) throw new Error("No Web3 wallet detected.");
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: POLYGON_HEX_CHAIN_ID }],
    });
  } catch (err) {
    if (err && err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: POLYGON_HEX_CHAIN_ID,
            chainName: "Polygon PoS",
            nativeCurrency: { name: "POL", symbol: "POL", decimals: 18 },
            rpcUrls: [POLYGON_RPC],
            blockExplorerUrls: ["https://polygonscan.com"],
          },
        ],
      });
    } else {
      throw err;
    }
  }
}

export async function payPolygonEscrow({
  escrowAddress,
  dropId,
  sellerWallet,
  tokenAddress,
  tokenDecimals,
  price,
  onStatus,
}) {
  if (!window.ethereum) {
    throw new Error("No browser wallet detected.");
  }
  if (!isValidEscrowAddress(escrowAddress)) {
    throw new Error(
      "Deploy PolygonEscrow.sol on Polygon PoS and set VITE_POLYGON_ESCROW_ADDRESS in .env."
    );
  }

  onStatus("Switching wallet to Polygon PoS...");
  await switchToPolygon();

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const buyer = await signer.getAddress();

  const dropBytes32 = ethers.sha256(ethers.toUtf8Bytes(dropId));
  const amountUnits = ethers.parseUnits(price, tokenDecimals);
  const escrow = new ethers.Contract(escrowAddress, ESCROW_ABI, signer);

  let tx;
  if (tokenAddress.toLowerCase() === ZERO_ADDRESS) {
    onStatus("Confirm POL payment (97% seller / 3% fee)...");
    tx = await escrow.payNative(dropBytes32, sellerWallet, {
      value: amountUnits,
    });
  } else {
    const erc20 = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const allowance = await erc20.allowance(buyer, escrowAddress);
    if (allowance < amountUnits) {
      if (allowance > 0n) {
        onStatus("Resetting existing token allowance...");
        const resetTx = await erc20.approve(escrowAddress, 0n);
        await resetTx.wait();
      }
      onStatus("Step 1/2: Approve token spend in wallet...");
      const approveTx = await erc20.approve(escrowAddress, amountUnits);
      await approveTx.wait();
    }
    onStatus("Step 2/2: Confirm escrow split in wallet...");
    tx = await escrow.payToken(dropBytes32, tokenAddress, amountUnits, sellerWallet);
  }

  onStatus("Confirming on Polygon PoS...");
  await tx.wait();
  return tx.hash;
}

export async function verifyPolygonTx({
  txHash,
  escrowAddress,
  dropId,
  sellerWallet,
  tokenAddress,
  tokenDecimals,
  price,
}) {
  const cleanHash = txHash.trim();
  if (!/^0x[a-fA-F0-9]{64}$/.test(cleanHash)) {
    throw new Error("Invalid Polygon transaction hash.");
  }

  const provider = new ethers.JsonRpcProvider(POLYGON_RPC);
  const receipt = await provider.getTransactionReceipt(cleanHash);
  if (!receipt) {
    throw new Error("Transaction not found yet on Polygon PoS.");
  }
  if (receipt.status !== 1) {
    throw new Error("Transaction reverted on Polygon PoS.");
  }

  const expectedDrop = ethers.sha256(ethers.toUtf8Bytes(dropId)).toLowerCase();
  const expectedAmount = ethers.parseUnits(price, tokenDecimals);

  for (const log of receipt.logs) {
    if (
      isValidEscrowAddress(escrowAddress) &&
      log.address.toLowerCase() !== escrowAddress.toLowerCase()
    ) {
      continue;
    }
    try {
      const parsed = PAID_IFACE.parseLog({
        topics: [...log.topics],
        data: log.data,
      });
      if (!parsed || parsed.name !== "Paid") continue;
      const loggedDrop = String(parsed.args[0]).toLowerCase();
      const loggedSeller = String(parsed.args[2]).toLowerCase();
      const loggedToken = String(parsed.args[3]).toLowerCase();
      const loggedAmount = BigInt(parsed.args[4]);

      if (
        loggedDrop === expectedDrop &&
        loggedSeller === sellerWallet.toLowerCase() &&
        loggedToken === tokenAddress.toLowerCase() &&
        loggedAmount >= expectedAmount
      ) {
        return;
      }
    } catch {
      // Ignore unrelated logs
    }
  }

  throw new Error("No matching PolygonEscrow Paid event found in this transaction.");
}

#!/usr/bin/env node
/**
 * Deploys PolygonEscrow.sol to Polygon PoS (or Amoy).
 *
 *   npx hardhat run scripts/deploy-contract.ts --network amoy
 *   npx hardhat run scripts/deploy-contract.ts --network polygon
 *
 * Required environment variables:
 *   AMOY_RPC_URL / POLYGON_RPC_URL      JSON-RPC endpoint
 *   AMOY_DEPLOYER_PRIVATE_KEY / POLYGON_DEPLOYER_PRIVATE_KEY   deployer key
 *   PLATFORM_WALLET                     receives the platform fee
 *   POLYGONSCAN_API_KEY                 optional, for source verification
 *
 * The platform wallet defaults to the deployer when omitted.
 */
import { network } from "hardhat";

const { ethers } = await network.create();

const PLATFORM_WALLET = process.env.PLATFORM_WALLET || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.getAddress());
  const chainId = Number((await ethers.provider.getNetwork()).chainId);
  const networkName =
    chainId === 137 ? "polygon" : chainId === 80002 ? "amoy" : `chain-${chainId}`;

  console.log(`network:  ${networkName} (chain ${chainId})`);
  console.log(`deployer: ${deployer.getAddress()}`);
  console.log(`balance:  ${ethers.formatEther(balance)} POL`);

  if (balance === 0n) {
    console.warn("\nThe deployer has no POL — the transaction will fail.");
    console.warn("On Amoy, fund it from the Polygon faucet.");
  }

  const platformWallet = PLATFORM_WALLET || (await deployer.getAddress());
  if (!ethers.isAddress(platformWallet)) {
    throw new Error(`PLATFORM_WALLET is not a valid address: ${platformWallet}`);
  }
  console.log(`platform: ${platformWallet} (receives the fee)`);

  const factory = await ethers.getContractFactory("PolygonEscrow");
  const escrow = await factory.deploy(platformWallet);
  const deployTx = escrow.deploymentTransaction();
  await escrow.waitForDeployment();

  const address = await escrow.getAddress();
  const receipt = deployTx ? await ethers.provider.getTransactionReceipt(deployTx.hash) : null;

  console.log(`\nPolygonEscrow deployed at: ${address}`);
  console.log(`  tx:      ${deployTx?.hash}`);
  console.log(`  block:   ${receipt?.blockNumber}`);
  console.log(`  gas:     ${receipt?.gasUsed}`);
  console.log(`  fee:     ${await escrow.FEE_BPS_STANDARD()} bps standard, ${await escrow.FEE_BPS_PREMIUM()} bps premium`);

  // Sanity check: the deployed contract must actually charge what we think.
  const standard = await escrow.feeBpsFor(0);
  const premium = await escrow.feeBpsFor(1);
  if (standard !== 300n || premium !== 500n) {
    throw new Error(
      `deployed contract has unexpected fees: ${standard} / ${premium}`
    );
  }
  console.log("  verified: fee tiers read back correctly");

  console.log("\nNext steps:");
  console.log(`  1. Set ESCROW_ADDRESS=${address} in your Cloudflare Pages environment.`);
  console.log(`  2. Set PLATFORM_WALLET=${platformWallet} on the deployment.`);

  if (POLYGONSCAN_API_KEY) {
    console.log("\nVerifying source on the explorer…");
    try {
      const explorer = networkName === "amoy" ? "https://api-testnet.polygonscan.com/api" : "https://api.polygonscan.com/api";
      const params = new URLSearchParams({
        api_key: POLYGONSCAN_API_KEY,
        module: "contract",
        action: "verify",
        contractaddress: address,
        codeformat: "solidity",
        sourceCode: JSON.stringify({
          language: "Solidity",
          sources: {
            "contracts/PolygonEscrow.sol": { content: escrowSource() },
            "@openzeppelin/contracts/token/ERC20/IERC20.sol": { content: ozSource("IERC20") },
            "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol": { content: ozSource("SafeERC20") },
            "@openzeppelin/contracts/utils/ReentrancyGuard.sol": { content: ozSource("ReentrancyGuard") },
          },
          settings: {
            optimizer: { enabled: true, runs: 200 },
            evmVersion: "paris",
            outputSelection: { "*": { "*": ["abi"] } },
          },
        }),
        compilerversion: "v0.8.28+commit.7893614a",
      });
      const res = await fetch(`${explorer}?${params.toString()}`, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
      });
      const body = (await res.json()) as {
        status?: string;
        message?: string;
        result?: { message?: string };
      };
      console.log(`  ${body.status === "1" ? "submitted" : "response"}: ${body.message}`);
      if (body.result?.message) console.log(`  ${body.result.message}`);
    } catch (err) {
      console.warn(`  verification failed: ${err instanceof Error ? err.message : err}`);
    }
  }
}

/** Reads the contract source from the committed artifact. */
function escrowSource() {
  return artifact.source;
}

/** Reads an OpenZeppelin source file from node_modules. */
function ozSource(name) {
  const paths = {
    IERC20: "token/ERC20/IERC20.sol",
    SafeERC20: "token/ERC20/utils/SafeERC20.sol",
    ReentrancyGuard: "utils/ReentrancyGuard.sol",
  };
  const fs = require("node:fs");
  const path = `node_modules/@openzeppelin/contracts/${paths[name]}`;
  return fs.readFileSync(path, "utf8");
}

const artifact = await import("../contracts/artifacts/PolygonEscrow.json", {
  with: { type: "json" },
}).then((m) => m.default);

await main();

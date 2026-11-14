// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PolygonEscrow
 * @notice Minimal P2P payment splitter on Polygon PoS.
 *
 * Two fee tiers, chosen by the buyer:
 *   Standard — 3% to the platform wallet, 97% to the seller.
 *   Premium  — 5% to the platform wallet, 95% to the seller.
 *
 * The tier is an enum, never a basis-point number: a caller cannot choose an
 * arbitrary fee, only one of the two the platform offers. The `Paid` event
 * carries the fee that was applied so the off-chain unlock check can prove
 * the buyer paid the tier the drop was listed at.
 *
 * @dev The buyer chooses the tier. A seller listing an ad-free drop at the
 *      premium tier is verified off-chain: the `Paid` event must report the
 *      expected fee, or the unlock is refused.
 */
contract PolygonEscrow is ReentrancyGuard {
    using SafeERC20 for IERC20;

    /// @notice The two fee tiers the platform offers.
    enum Tier {
        Standard, // 3%
        Premium // 5%
    }

    uint16 public constant BPS = 10_000;
    uint16 public constant FEE_BPS_STANDARD = 300; // 3%
    uint16 public constant FEE_BPS_PREMIUM = 500; // 5%

    /// @notice Receives the platform fee.
    address public immutable platformWallet;

    event Paid(
        bytes32 indexed dropId,
        address indexed buyer,
        address indexed seller,
        address token,
        uint256 amount,
        uint16 feeBps
    );

    constructor(address _platformWallet) {
        require(_platformWallet != address(0), "Invalid platform wallet");
        platformWallet = _platformWallet;
    }

    /// @notice The fee, in basis points, charged for a tier.
    function feeBpsFor(Tier tier) public pure returns (uint16) {
        return tier == Tier.Premium ? FEE_BPS_PREMIUM : FEE_BPS_STANDARD;
    }

    /// @dev Splits an amount into (fee, sellerShare). The seller share is
    ///      computed by subtraction so no wei is ever stranded.
    function _split(uint256 amount, uint16 feeBps) internal pure returns (uint256 fee, uint256 sellerShare) {
        fee = (amount * feeBps) / BPS;
        sellerShare = amount - fee;
    }

    /// @notice Pays the seller in native POL.
    function payNative(bytes32 dropId, address seller, Tier tier) external payable nonReentrant {
        require(seller != address(0), "Invalid seller");
        require(msg.value > 0, "Zero value");

        uint16 feeBps = feeBpsFor(tier);
        (uint256 fee, uint256 sellerShare) = _split(msg.value, feeBps);

        (bool feeOk, ) = payable(platformWallet).call{value: fee}("");
        require(feeOk, "Fee transfer failed");

        (bool sellerOk, ) = payable(seller).call{value: sellerShare}("");
        require(sellerOk, "Seller transfer failed");

        emit Paid(dropId, msg.sender, seller, address(0), msg.value, feeBps);
    }

    /// @notice Pays the seller in an ERC-20 token.
    /// @dev The split is computed on the amount actually received, so
    ///      fee-on-transfer tokens cannot drain the escrow.
    function payToken(
        bytes32 dropId,
        address token,
        uint256 amount,
        address seller,
        Tier tier
    ) external nonReentrant {
        require(token != address(0) && seller != address(0), "Invalid address");
        require(amount > 0, "Zero amount");

        IERC20 erc20 = IERC20(token);
        uint256 beforeBal = erc20.balanceOf(address(this));
        erc20.safeTransferFrom(msg.sender, address(this), amount);
        uint256 received = erc20.balanceOf(address(this)) - beforeBal;
        require(received > 0, "Zero received");

        uint16 feeBps = feeBpsFor(tier);
        (uint256 fee, uint256 sellerShare) = _split(received, feeBps);

        if (fee > 0) erc20.safeTransfer(platformWallet, fee);
        erc20.safeTransfer(seller, sellerShare);

        emit Paid(dropId, msg.sender, seller, token, received, feeBps);
    }
}

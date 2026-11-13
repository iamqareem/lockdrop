// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PolygonEscrow
 * @notice Minimal P2P payment splitter on Polygon PoS: 97% to seller, 3% to platform wallet.
 */
contract PolygonEscrow is ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 public constant FEE_BPS = 300; // 3%
    address public immutable platformWallet;

    event Paid(
        bytes32 indexed dropId,
        address indexed buyer,
        address indexed seller,
        address token,
        uint256 amount
    );

    constructor(address _platformWallet) {
        require(_platformWallet != address(0), "Invalid platform wallet");
        platformWallet = _platformWallet;
    }

    function payNative(bytes32 dropId, address seller) external payable nonReentrant {
        require(seller != address(0), "Invalid seller");
        require(msg.value > 0, "Zero value");

        uint256 fee = (msg.value * FEE_BPS) / 10_000;
        uint256 sellerShare = msg.value - fee;

        (bool feeOk, ) = payable(platformWallet).call{value: fee}("");
        require(feeOk, "Fee transfer failed");

        (bool sellerOk, ) = payable(seller).call{value: sellerShare}("");
        require(sellerOk, "Seller transfer failed");

        emit Paid(dropId, msg.sender, seller, address(0), msg.value);
    }

    function payToken(
        bytes32 dropId,
        address token,
        uint256 amount,
        address seller
    ) external nonReentrant {
        require(token != address(0) && seller != address(0), "Invalid address");
        require(amount > 0, "Zero amount");

        IERC20 erc20 = IERC20(token);
        uint256 beforeBal = erc20.balanceOf(address(this));
        erc20.safeTransferFrom(msg.sender, address(this), amount);
        uint256 received = erc20.balanceOf(address(this)) - beforeBal;
        require(received > 0, "Zero received");

        uint256 fee = (received * FEE_BPS) / 10_000;
        uint256 sellerShare = received - fee;

        if (fee > 0) erc20.safeTransfer(platformWallet, fee);
        erc20.safeTransfer(seller, sellerShare);

        emit Paid(dropId, msg.sender, seller, token, received);
    }
}

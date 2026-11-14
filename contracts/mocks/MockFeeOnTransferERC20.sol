// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MockERC20} from "./MockERC20.sol";

/**
 * @title MockFeeOnTransferERC20
 * @notice Burns a percentage of every transfer, to prove the escrow splits
 *         the amount it actually received rather than the amount requested.
 */
contract MockFeeOnTransferERC20 is MockERC20 {
    uint256 public feeBps = 100; // 1%

    function setFeeBps(uint256 bps) external {
        feeBps = bps;
    }

    function _transfer(address from, address to, uint256 amount) internal override {
        uint256 fee = (amount * feeBps) / 10_000;
        require(balanceOf[from] >= amount, "Insufficient balance");
        balanceOf[from] -= amount;
        balanceOf[to] += amount - fee;
        balanceOf[address(this)] += fee;
        // Standard ERC-20 semantics: the event reports the amount moved, even
        // though the recipient receives slightly less.
        emit Transfer(from, to, amount);
    }
}

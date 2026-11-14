import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { network } from "hardhat";
const { ethers } = await network.create();
const TIER = { Standard: 0, Premium: 1 };
const BPS = 10000n;
const ONE = 10n ** 18n;
describe("PolygonEscrow", () => {
  let escrow;
  let deployer;
  let seller;
  let platform;
  let platformAddress;
  let sellerAddress;
  beforeEach(async () => {
    const signers = await ethers.getSigners();
    deployer = signers[0];
    seller = signers[1];
    platform = signers[2];
    platformAddress = await platform.getAddress();
    sellerAddress = await seller.getAddress();
    const factory = await ethers.getContractFactory("PolygonEscrow");
    escrow = await factory.deploy(platformAddress);
    await escrow.waitForDeployment();
  });
  test("rejects the zero platform wallet", async () => {
    const factory = await ethers.getContractFactory("PolygonEscrow");
    await assert.rejects(factory.deploy(ethers.ZeroAddress));
  });
  test("exposes the two fee tiers", async () => {
    assert.equal(await escrow.feeBpsFor(TIER.Standard), 300n);
    assert.equal(await escrow.feeBpsFor(TIER.Premium), 500n);
    assert.equal(await escrow.FEE_BPS_STANDARD(), 300n);
    assert.equal(await escrow.FEE_BPS_PREMIUM(), 500n);
  });
  describe("payNative", () => {
    test("splits 97/3 on the standard tier", async () => {
      const amount = 1000n * ONE;
      const dropId = ethers.id("drop-standard");
      const before = await ethers.provider.getBalance(sellerAddress);
      const platformBefore = await ethers.provider.getBalance(platformAddress);
      const tx = await escrow.connect(deployer).payNative(dropId, sellerAddress, TIER.Standard, { value: amount });
      const receipt = await tx.wait();
      const sellerAfter = await ethers.provider.getBalance(sellerAddress);
      const platformAfter = await ethers.provider.getBalance(platformAddress);
      assert.equal(sellerAfter - before, amount * 9700n / BPS);
      assert.equal(platformAfter - platformBefore, amount * 300n / BPS);
      assert.equal(await ethers.provider.getBalance(await escrow.getAddress()), 0n);
      const log = receipt.logs.map((entry) => {
        try {
          return escrow.interface.parseLog(entry);
        } catch {
          return null;
        }
      }).find((parsed) => parsed?.name === "Paid");
      assert.ok(log, "expected a Paid event");
      assert.equal(log.args.dropId, dropId);
      assert.equal(log.args.buyer, await deployer.getAddress());
      assert.equal(log.args.seller, sellerAddress);
      assert.equal(log.args.token, ethers.ZeroAddress);
      assert.equal(log.args.amount, amount);
      assert.equal(log.args.feeBps, 300n);
    });
    test("splits 95/5 on the premium tier", async () => {
      const amount = 1000n * ONE;
      const dropId = ethers.id("drop-premium");
      const before = await ethers.provider.getBalance(sellerAddress);
      const platformBefore = await ethers.provider.getBalance(platformAddress);
      const tx = await escrow.connect(deployer).payNative(dropId, sellerAddress, TIER.Premium, { value: amount });
      const receipt = await tx.wait();
      assert.equal(
        await ethers.provider.getBalance(sellerAddress) - before,
        amount * 9500n / BPS
      );
      assert.equal(
        await ethers.provider.getBalance(platformAddress) - platformBefore,
        amount * 500n / BPS
      );
      assert.equal(await ethers.provider.getBalance(await escrow.getAddress()), 0n);
      const log = receipt.logs.map((entry) => {
        try {
          return escrow.interface.parseLog(entry);
        } catch {
          return null;
        }
      }).find((parsed) => parsed?.name === "Paid");
      assert.ok(log);
      assert.equal(log.args.feeBps, 500n);
    });
    test("never strands a wei, even on an awkward amount", async () => {
      const amount = 1n;
      const before = await ethers.provider.getBalance(sellerAddress);
      const platformBefore = await ethers.provider.getBalance(platformAddress);
      await (await escrow.connect(deployer).payNative(ethers.id("odd"), sellerAddress, TIER.Standard, {
        value: amount
      })).wait();
      const sellerGain = await ethers.provider.getBalance(sellerAddress) - before;
      const platformGain = await ethers.provider.getBalance(platformAddress) - platformBefore;
      assert.equal(sellerGain + platformGain, amount);
      assert.equal(await ethers.provider.getBalance(await escrow.getAddress()), 0n);
    });
    test("rejects a zero seller and a zero value", async () => {
      await assert.rejects(
        escrow.connect(deployer).payNative(ethers.id("x"), ethers.ZeroAddress, TIER.Standard, {
          value: ONE
        })
      );
      await assert.rejects(
        escrow.connect(deployer).payNative(ethers.id("x"), sellerAddress, TIER.Standard, {
          value: 0n
        })
      );
    });
  });
  describe("payToken", () => {
    let token;
    beforeEach(async () => {
      const factory = await ethers.getContractFactory("MockERC20");
      token = await factory.deploy();
      await token.waitForDeployment();
      await token.mint(await deployer.getAddress(), 10000n * ONE);
    });
    test("splits 97/3 on the standard tier", async () => {
      const amount = 1000n * ONE;
      const escrowAddress = await escrow.getAddress();
      await token.approve(escrowAddress, amount);
      const sellerBefore = await token.balanceOf(sellerAddress);
      const platformBefore = await token.balanceOf(platformAddress);
      const tx = await escrow.connect(deployer).payToken(ethers.id("tok"), await token.getAddress(), amount, sellerAddress, TIER.Standard);
      const receipt = await tx.wait();
      assert.equal(await token.balanceOf(sellerAddress) - sellerBefore, amount * 9700n / BPS);
      assert.equal(
        await token.balanceOf(platformAddress) - platformBefore,
        amount * 300n / BPS
      );
      assert.equal(await token.balanceOf(escrowAddress), 0n);
      const log = receipt.logs.map((entry) => {
        try {
          return escrow.interface.parseLog(entry);
        } catch {
          return null;
        }
      }).find((parsed) => parsed?.name === "Paid");
      assert.ok(log);
      assert.equal(log.args.token, await token.getAddress());
      assert.equal(log.args.amount, amount);
      assert.equal(log.args.feeBps, 300n);
    });
    test("splits 95/5 on the premium tier", async () => {
      const amount = 1000n * ONE;
      const escrowAddress = await escrow.getAddress();
      await token.approve(escrowAddress, amount);
      const sellerBefore = await token.balanceOf(sellerAddress);
      const platformBefore = await token.balanceOf(platformAddress);
      await (await escrow.connect(deployer).payToken(ethers.id("tok"), await token.getAddress(), amount, sellerAddress, TIER.Premium)).wait();
      assert.equal(await token.balanceOf(sellerAddress) - sellerBefore, amount * 9500n / BPS);
      assert.equal(
        await token.balanceOf(platformAddress) - platformBefore,
        amount * 500n / BPS
      );
    });
    test("splits the amount actually received, not the amount requested", async () => {
      const feeFactory = await ethers.getContractFactory("MockFeeOnTransferERC20");
      const feeToken = await feeFactory.deploy();
      await feeToken.waitForDeployment();
      await feeToken.mint(await deployer.getAddress(), 10000n * ONE);
      const requested = 1000n * ONE;
      const escrowAddress = await escrow.getAddress();
      await feeToken.approve(escrowAddress, requested);
      const receipt = await (await escrow.connect(deployer).payToken(
        ethers.id("tok"),
        await feeToken.getAddress(),
        requested,
        sellerAddress,
        TIER.Standard
      )).wait();
      const received = requested * 9900n / BPS;
      const paid = receipt.logs.map((entry) => {
        try {
          return escrow.interface.parseLog(entry);
        } catch {
          return null;
        }
      }).find((parsed) => parsed?.name === "Paid");
      assert.ok(paid);
      assert.equal(paid.args.amount, received);
      assert.equal(await feeToken.balanceOf(escrowAddress), 0n);
      const sentOut = receipt.logs.map((entry) => {
        try {
          return feeToken.interface.parseLog(entry);
        } catch {
          return null;
        }
      }).filter(
        (parsed) => parsed?.name === "Transfer" && parsed.args.from.toLowerCase() === escrowAddress.toLowerCase()
      ).reduce((total, parsed) => total + parsed.args.value, 0n);
      assert.equal(sentOut, received);
      assert.equal(received * 300n / BPS, 29700000000000000000n);
      assert.equal(received * 9700n / BPS, 960300000000000000000n);
    });
    test("rejects a zero token, a zero seller and a zero amount", async () => {
      await assert.rejects(
        escrow.connect(deployer).payToken(ethers.id("t"), ethers.ZeroAddress, ONE, sellerAddress, TIER.Standard)
      );
      await assert.rejects(
        escrow.connect(deployer).payToken(ethers.id("t"), await token.getAddress(), ONE, ethers.ZeroAddress, TIER.Standard)
      );
      await assert.rejects(
        escrow.connect(deployer).payToken(ethers.id("t"), await token.getAddress(), 0n, sellerAddress, TIER.Standard)
      );
    });
  });
});

import { configVariable, defineConfig } from "hardhat/config";
import hardhatEthersPlugin from "@nomicfoundation/hardhat-ethers";
import hardhatNodeTestRunnerPlugin from "@nomicfoundation/hardhat-node-test-runner";
import hardhatVerifyPlugin from "@nomicfoundation/hardhat-verify";

/**
 * Hardhat 3 configuration for the LockDrop escrow contract.
 *
 * This project is separate from the Pages app on purpose: the Pages build has
 * no build step and no dependency on this toolchain. Hardhat is only used to
 * compile, test and deploy `contracts/PolygonEscrow.sol`.
 */
export default defineConfig({
  plugins: [
    hardhatEthersPlugin,
    hardhatNodeTestRunnerPlugin,
    hardhatVerifyPlugin,
  ],

  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          evmVersion: "paris",
        },
      },
    },
  },

  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./.hardhat/cache",
    artifacts: "./.hardhat/artifacts",
  },

  networks: {
    hardhat: {
      type: "edr-simulated",
      chainType: "l1",
    },
    polygon: {
      type: "http",
      chainType: "generic",
      url: configVariable("POLYGON_RPC_URL"),
      accounts: configVariable("POLYGON_DEPLOYER_PRIVATE_KEY")
        ? [configVariable("POLYGON_DEPLOYER_PRIVATE_KEY")]
        : [],
    },
    amoy: {
      type: "http",
      chainType: "generic",
      url: configVariable("AMOY_RPC_URL"),
      accounts: configVariable("AMOY_DEPLOYER_PRIVATE_KEY")
        ? [configVariable("AMOY_DEPLOYER_PRIVATE_KEY")]
        : [],
    },
  },
});

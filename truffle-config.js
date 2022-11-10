const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json");

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider(
          keys.MNEMONIC,
          `https://goerli.infura.io/v3/${keys.INFURA_API_KEY}`
        );
      },
      network_id: "5", // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 20000000000,
      confirmations: 2, // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },
  compilers: {
    solc: {
      version: "0.8.4", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};

/*
   > transaction hash:    0x5181dc55b7180c7efa760b304bfbfd1939317b8cd35cab8ce0696f59a266f604
   > Blocks: 2            Seconds: 22
   > contract address:    0x26e67f730FD464005dB8736b634FE3295D1D0929
   > block number:        7929732
   > block timestamp:     1668110784
   > account:             0x474814dB5ed4601FBF6C06bf1601854cf9F29EaB
   > balance:             0.26615374
   > gas used:            1692313 (0x19d299)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03384626 ETH
*/

# Packages

- tailwindcss: styling
- postcss: styling
- autoprefixer: styling

html characters

# cannot resolve fs problem

- the first way to solve this issue is to alter the next.config.js file and changing the webpack configuration not to load the fs package by adding the following line of code:

```
webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  }
```

- the only problem that accompanies this solution is that our contract will be part of the webpack and hence it will take so much data while transiting it

- the second way to counter this problem is to create a folder in the public folder /js/truffle-contract.js
- now go to the nodemodules/@truffle/contract/browser-dist/truffle-contract.min.js
- copy that file to the public folder we created earlier.
- in our base layout component, import Script from next/script and use it as following. (Script is used to load thirdparty scripts)

```
 <Script
      src="/js/truffle-contract.js"
      strategy="beforeInteractive"
  />
```

- we use strategy before interact to help load the script to our window object before any other thing happens with our applicaiton.
- this could cause a lag in our application.

- the third way would be to load our contract through web3 and not using @truffle/contract module at all.
- we can create a new instance of contract using web3.eth.contract(abi, address_of_the_contract_in_the_network) e.g.

```
contract = new Web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[5777].address
)
```

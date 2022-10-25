import { handler as createUseAccount } from "./useAccount";


// this function is used to execute functions that will create other hooks
export const setupHooks = (web3) => {
  return {
    useAccount: createUseAccount(web3),
  };
};

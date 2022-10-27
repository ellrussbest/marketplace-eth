import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";

// this function is used to execute functions that will create other hooks
export const setupHooks = (...deps) => {
  return {
    useAccount: createAccountHook(...deps),
    useNetwork: createNetworkHook(...deps),
  };
};

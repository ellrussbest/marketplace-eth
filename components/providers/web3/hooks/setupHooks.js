import { handler as createUseAccount } from "./useAccount";


// this function is used to execute functions that will create other hooks
export const setupHooks = (...deps) => {
  return {
    useAccount: createUseAccount(...deps),
  };
};

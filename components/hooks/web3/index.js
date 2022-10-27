import { useHooks } from "@components/providers/web3";

const enhanceHook = (swrResponse) => {
  return {
    ...swrResponse,
    hasFinishedFirstFetch: swrResponse.data || swrResponse.error,
  };
};

export const useAccount = () => {
  return enhanceHook(useHooks((hooks) => hooks.useAccount()));
};

export const useNetwork = () => {
  return enhanceHook(useHooks((hooks) => hooks.useNetwork()));
};

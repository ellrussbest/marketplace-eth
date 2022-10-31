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

export const useWalletInfo = () => {
  const account = useAccount();
  const network = useNetwork();
  const canPurchaseCourse = !!(account.data && network.isSupported);

  return {
    account,
    network,
    canPurchaseCourse,
  };
};

export const useOwnedCourses = (...args) => {
  return enhanceHook(useHooks((hooks) => hooks.useOwnedCourses(...args)));
};

export const useOwnedCourse = (...args) => {
  return enhanceHook(useHooks((hooks) => hooks.useOwnedCourse(...args)));
};

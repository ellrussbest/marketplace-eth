import { useHooks } from "@components/providers/web3";

const _isEmpty = (data) => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};

const enhanceHook = (swrResponse) => {
  const { data, error } = swrResponse;
  const hasFinishedFirstFetch = !!(data || error);

  const isEmpty = hasFinishedFirstFetch && _isEmpty(data);
  return {
    ...swrResponse,
    hasFinishedFirstFetch,
    isEmpty,
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
  const hasConnectedWallet = !!(account.data && network.isSupported);
  const isConnecting =
    !account.hasFinishedFirstFetch && !network.hasFinishedFirstFetch;


  return {
    account,
    network,
    hasConnectedWallet,
    isConnecting,
  };
};

export const useOwnedCourses = (...args) => {
  return enhanceHook(useHooks((hooks) => hooks.useOwnedCourses(...args)));
};

export const useOwnedCourse = (...args) => {
  return enhanceHook(useHooks((hooks) => hooks.useOwnedCourse(...args)));
};

export const useManagedCourses = (...args) => {
  return enhanceHook(useHooks((hooks) => hooks.useManagedCourses(...args)));
};

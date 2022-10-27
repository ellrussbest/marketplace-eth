import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0x7f8f693dee85b11822fcac457803316bffb513479f361030ab4be24332cfa70b": true,
};

export const handler = (web3, provider) => () => {
  /**
   * to make api calls to apis that doesn't have a dedicated fetch url like
   * blockchain servers,
   * we can use swr...
   * the first parameter will be a function that will RETURN the IDENTIFIER
   * of the function... if the return value of your identifier is null, then your
   * callback function will not be executed.
   *
   * the second parameter will be an asynchronous function that will make
   * an api request to your api...
   * the RETURN of this api will be stored in const { data } = useSWR(() => {
   *  return true ? "identifier" : null
   * }, async () => {
   *  const data = await api
   *  return data
   * })
   */

  /**
   * properties of swrRespones:
   * data -> the data you're returning from your fetcher function
   * error -> incase your request will fail
   * isValidating -> when it is still validating/loading the data
   * mutate -> mutating/changing your current state. mutate will re-execute your swr api asynchronous
   * callback function
   */

  const { mutate, data, ...rest } = useSWR(
    () => {
      return web3 ? "web3/accounts" : null;
    },
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );

  useEffect(() => {
    provider &&
      provider.on("accountsChanged", (accounts) => {
        mutate(accounts[0] ?? null);
      });
  }, [provider]);

  return {
    data,
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
    mutate,
    ...rest,
  };
};

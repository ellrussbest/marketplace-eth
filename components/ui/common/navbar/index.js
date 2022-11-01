import { useWeb3 } from "@components/providers";
import { Button, ActiveLink } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3";
import { useRouter } from "next/router";

export default function Navbar() {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { data: address, isAdmin } = useAccount();

  const { pathname } = useRouter();

  return (
    <>
      <div
        className={`relative pt-6 px-4 sm:px-6 lg:px-8 backdrop-blur-3xl bg-slate-400/30 rounded-md py-6`}
      >
        <nav className="relative" aria-label="Global">
          <div className="flex xs:flex-row xs:justify-between items-center">
            <div>
              <ActiveLink href="/">
                <a className="font-medium mr-1 sm:mr-8 hover:text-gray-900">
                  Home
                </a>
              </ActiveLink>

              <ActiveLink href="/marketplace">
                <a className="font-medium mr-1 sm:mr-8 hover:text-gray-900">
                  Marketplace
                </a>
              </ActiveLink>

              <ActiveLink href="/blogs">
                <a className="font-medium mr-5 hover:text-gray-900">Blogs</a>
              </ActiveLink>
            </div>

            <div className="text-center flex items-center">
              <ActiveLink href="/wishlist">
                <a className="font-medium sm:mr-8 mr-1 hover:text-gray-900">
                  Wishlist
                </a>
              </ActiveLink>

              {isLoading ? (
                <Button
                  disabled={true}
                  onClick={connect}
                  className="text-white bg-indigo-600 hover:text-indigo-700"
                >
                  Loading...
                </Button>
              ) : address ? (
                <Button className="cursor-default" hoverable={false}>
                  Hi there {isAdmin && "Admin"}
                </Button>
              ) : requireInstall ? (
                <Button
                  onClick={() => {
                    window.open("https://metamask.io/download/", "_blank");
                  }}
                >
                  Install metamask
                </Button>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {address && !pathname.includes("/marketplace") && (
        <div className="flex justify-end sm:px-6 lg:px-8 py-1">
          <div className="text-white bg-indigo-600 rounded-md p-2 text-sm xs:text-base">
            {address}
          </div>
        </div>
      )}
    </>
  );
}

import { useWeb3 } from "@components/providers";
import { Button, ActiveLink } from "@components/ui/common";
import { useAccount } from "@components/hooks/web3";
import { useRouter } from "next/router";

export default function Navbar() {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { data: address, isAdmin } = useAccount();

  const { pathname } = useRouter();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <ActiveLink href="/">
                <a className="font-medium mr-8 hover:text-gray-900">
                  Home
                </a>
              </ActiveLink>

              <ActiveLink href="/marketplace">
                <a className="font-medium mr-8 hover:text-gray-900">
                  Marketplace
                </a>
              </ActiveLink>

              <ActiveLink href="/blogs">
                <a className="font-medium mr-8 hover:text-gray-900">
                  Blogs
                </a>
              </ActiveLink>
            </div>

            <div>
              <ActiveLink href="/wishlist">
                <a className="font-medium mr-8 hover:text-gray-900">
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
        <div className="flex pt-1 justify-end sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {address}
          </div>
        </div>
      )}
    </section>
  );
}

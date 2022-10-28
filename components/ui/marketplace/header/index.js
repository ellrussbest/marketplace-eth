import { Breadcrumbs } from "@components/ui/common";
import { EthRates, Walletbar } from "@components/ui/web3";

const LINKS = [
  {
    href: "/marketplace",
    name: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    name: "My Courses",
  },
  {
    href: "/marketplace/courses/manage",
    name: "Manage Courses",
  },
];

export default function Header() {
  return (
    <>
      <Walletbar />
      <EthRates />
      <div className="flex flex-row-reverse pb-4 px-4 sm:px-6 lg:px-8">
        <Breadcrumbs links={LINKS} />
      </div>
    </>
  );
}

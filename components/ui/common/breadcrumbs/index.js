import { useAccount } from "@components/hooks/web3";
import { ActiveLink } from "@components/ui/common";

export default function Breadcrumbs({ links }) {
  const { isAdmin } = useAccount();

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        {links.map((link, i) => {
          return (
            <li
              key={link.href}
              className={`${
                i == 0 ? "pr-4" : "px-4"
              } font-medium text-gray-500 hover:text-gray-900 text-sm sm:text-base ${
                !isAdmin &&
                link.href === "/marketplace/courses/managed" &&
                "hidden"
              }`}
            >
              <ActiveLink href={link.href}>
                <a>{link.name}</a>
              </ActiveLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

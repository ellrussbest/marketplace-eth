import { Web3Provider } from "@components/providers";
import { Footer, Navbar } from "@components/ui/common";

export default function BaseLayout({ children }) {
  return (
    <Web3Provider>
      <div className="fixed top-0 z-50 left-0 right-0">
        <Navbar />
      </div>
      <div className="mb-44 sm:mb-32"></div>
      <div className="px-4 max-w-7xl mx-auto">
        <div className="fit">{children}</div>
      </div>
      <Footer />
    </Web3Provider>
  );
}

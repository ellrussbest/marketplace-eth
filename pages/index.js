import { Breadcrumbs, Hero } from "@components/common";
import { CourseCard } from "@components/course";
import { BaseLayout } from "@components/layout";
import { OrderCard } from "@components/order";
import { EthRates, Walletbar } from "@components/web3";

export default function Home() {
  return (
    <BaseLayout>
      <Hero />

      <Breadcrumbs />

      <Walletbar />

      <EthRates />

      <OrderCard />

      <section className="grid grid-cols-2 gap-4 mb-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <CourseCard key={i} />
        ))}
      </section>
    </BaseLayout>
  );
}

// Home.Layout = BaseLayout;

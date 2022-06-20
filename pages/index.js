import { Hero, Breadcrumbs } from "@components/common"
import { CourseList } from "@components/course"
import { BaseLayout } from "@components/layout"
import { OrderCard } from "@components/orders"
import { EthRates, Walletbar } from "@components/web3"

export default function Home() {
  return (
    <BaseLayout>
      {/*------ HERO STARTS ------*/}
      <Hero />
      {/*------ HERO ENDS ------*/}

      {/*------ BREADCRUMBS STARTS ------*/}
      <Breadcrumbs />
      {/*------ BREADCRUMBS ENDS ------*/}

      {/*------ ADDRESS STARTS ------*/}
      <Walletbar />
      {/*------ ADDRESS ENDS ------*/}

      {/*------ CURRENCY STARTS ------*/}
      <EthRates />
      {/*------ CURRENCY ENDS ------*/}

      {/*------ ORDER INFO STARTS ------*/}
      <OrderCard />
      {/*------ ORDER INFO ENDS ------*/}

      {/*------ COURSE CARD STARTS ------*/}
      <CourseList />
      {/*------ COURSE CARD ENDS ------*/}
    </BaseLayout>
  )
}
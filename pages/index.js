import { Navbar, Footer, Hero, Breadcrumbs } from "@components/common"
import { CourseList } from "@components/course"
import { OrderCard } from "@components/orders"
import { EthRates, Walletbar } from "@components/web3"

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">

          {/*------ NAVBAR STARTS -------*/}
          <Navbar />
          {/*------ NAVBAR ENDS -------*/}
          <div className="fit">

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

          </div>
        </div>
        {/*----- FOOTER STARTS ------*/}
        <Footer />
        {/*----- FOOTER ENDS ------*/}
      </div>
    </div>
  )
}
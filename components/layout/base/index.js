import { Navbar, Footer } from "@components/common"

export default function BaseLayout({children}) {
    return (
        <>
            <div className="max-w-7xl mx-auto px-4">

                {/*------ NAVBAR STARTS -------*/}
                <Navbar />
                {/*------ NAVBAR ENDS -------*/}
                <div className="fit">
                    {children}
                </div>
            </div>
            {/*----- FOOTER STARTS ------*/}
            <Footer />
            {/*----- FOOTER ENDS ------*/}
        </>
    )
}
import { Header, Footer } from "@components/common"

export default function BaseLayout({children}) {

    return (
        <>
            <Header/>

            <body className="bg-white max-w-7xl mx-auto pt-7"> 
                {children}
            </body>
        
            <Footer/>
        </>
    )
}
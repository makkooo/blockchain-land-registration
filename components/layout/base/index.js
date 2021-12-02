import { Header, Footer } from "@components/common"
import { Web3Provider } from "@components/providers"

/**
 * 
 * @param   {Component} children children components 
 * @returns Layout      Returns base layout
 */
export default function BaseLayout({children}) {

    return (
        <Web3Provider>
            <Header/>

            <body className="bg-white max-w-7xl mx-auto py-7"> 
                {children}
            </body>
        
            <Footer/>
        </Web3Provider>
    )
}
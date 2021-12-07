import { AdminHeader, Footer } from "@components/common"
import { Web3Provider } from "@components/providers"
import { useState } from "react"

/**
 * 
 * @param   {Component} children children components 
 * @returns Layout      Returns admin layout
 */
export default function AdminLayout({children}) {

    const [isFieldValidator, setIsFieldValidator] = useState(false) 

    return (

        <Web3Provider>
            <AdminHeader/>

            <body className="bg-white max-w-7xl mx-auto py-7"> 
                {children}
            </body>
        
            <Footer/>
        </Web3Provider>
    )
}
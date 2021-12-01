import { AdminHeader, Footer } from "@components/common"
import { useAccount } from "@components/hooks/web3/useAccount"
import { Web3Provider } from "@components/providers"

export default function AdminLayout({children}) {

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
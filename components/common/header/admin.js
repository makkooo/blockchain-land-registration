import { useWeb3 } from "@components/providers"
import { useAccount } from "@components/hooks/web3/useAccount"
import { AddPropertyModal } from "@components/properties"
import { useState } from "react"

export default function AdminHeader() {

    const [showModal, setShowModal] = useState(null)
    const { connect, isLoading, isWeb3Loaded } = useWeb3()
    const { account } = useAccount()

    console.log(showModal)

    return (
        <header className="bg-white px-10 border-b">
            {account.data}
            <nav className="max-w-7xl mx-auto py-3" aria-label="Global">
                <div className="flex justify-between items-center">
                    <div>
                        <a href="/"><img src="logo.png"/></a>
                    </div>
                    <div className="my-auto">
                    {
                        isLoading ? 
                        <button 
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-48 p-2 text-center"
                            onClick={connect}>
                            Loading...
                        </button> : isWeb3Loaded ? account.data ? account.isAdmin ?
                        <div>
                            <button
                                className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-2 p-2 text-center">
                                Add Field Validator
                            </button>
                            <button 
                                className="cursor-default bg-red-500 text-white font-medium rounded-lg text-sm ml-2 p-2 text-center">
                                Connected LRA
                            </button>
                        </div> :
                        <div>
                            <button
                                className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-2 p-2 text-center"
                                onClick={() => setShowModal(true)}>
                                Add Property
                            </button>
                            <button 
                                className="cursor-default bg-red-500 text-white font-medium rounded-lg text-sm ml-2 p-2 text-center">
                                Connected
                            </button>
                        </div> :
                        <button 
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-48 p-2 text-center"
                            onClick={connect}>
                            Connect
                        </button> : 
                        <button 
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-48 p-2 text-center"
                            onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                            Install MetaMask
                        </button> 
                    }
                    </div>
                </div>
            </nav>
            {
                showModal && 
                <AddPropertyModal
                    onClose={() => setShowModal(null)}
                />
            }
        </header>
    )
}
import { useWeb3 } from "@components/providers"
import { useAccount } from "@components/hooks/web3/useAccount"
import { AddPropertyModal } from "@components/properties"
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/**
 * Admin header component of the App.
 *    
 * @returns     component   Returns the Admin header component
 */
export default function AdminHeader() {

    // Set modal visibility state
    const [showAddPropModal, setShowAddPropModal] = useState(null)

    const [showAddFvModal, setShowAddFvModal] = useState(null)

    // Web3 component constants
    const { connect, isLoading, isWeb3Loaded, contract, web3 } = useWeb3()

    // MetaMask account constant
    const { account } = useAccount()

    const [isAuthorized, setIsAuthorized] = useState(false)

    const addFvSwal = withReactContent(Swal)

    useEffect(async () => {
        try {
            account.isAdmin ? setIsAuthorized(true) :
            setIsAuthorized(await contract.methods.isFieldValidator(account.data).call())
        } catch {
            console.log("isFieldValidator() failed.")
        }
    }, [account.data])

    const addFieldValidator = async () => {
        const { value: text } = await addFvSwal.fire({
            input: "text",
            title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">Add Field Validator</h3>,
            inputPlaceholder: "Input ETH Address",
            inputValidator: (value) => {
                if (!value) {
                  return 'Please input ETH Address!'
                }
                if(!web3.utils.isAddress(value)) {
                    return 'Invalid ETH Address!'
                }
                if(value == 0x49cA365BD02D83c7a4d43AE99C110a11f99Ce182) {
                    return 'Cannot add Field Validator privileges to Admin account'
                }
            },
            showCancelButton: true,
            confirmButtonText: "Confirm",
            confirmButtonColor: "#d33",
            cancelButtonColor: '#6b7280',
        })
        if(text){
            addFvSwal.fire({
                title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">Are you sure?</h3>,
                text: `Add ${text} as Field Validator?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: "Confirm",
                confirmButtonColor: "#d33",
                cancelButtonColor: '#6b7280',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await contract.methods.addFieldValidator(text).send({from: account.data})
                        await addFvSwal.fire({
                            title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">ETH Address added as Field Validator!</h3>,
                            confirmButtonText: "Confirm",
                            confirmButtonColor: "#d33",
                            icon: "success"
                        })
                    } catch {
                        console.log("Add Field Validator operation failed.")
                    }
                }
            })
        }
    }

    return (
        <header className="bg-white px-10 border-b">
            <nav className="max-w-7xl mx-auto py-3" aria-label="Global">
                <div className="flex justify-between items-center">
                    <div>
                        <a href="/admin"><img src="logo.png"/></a>
                    </div>
                    <div className="my-auto">
                    {
                        // Checks if Web3 is loading
                        isLoading ? 
                        <button 
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-48 p-2 text-center"
                            onClick={connect}>
                            Loading...
                        </button> : 

                        // If Web3 is loaded, check for MetaMask account data
                        isWeb3Loaded ? account.data ? isAuthorized? account.isAdmin ?

                        // Account is LRA
                        <div>
                            <button
                                className="text-black hover:text-red-500 font-medium mx-3 p-2 text-center"
                                onClick={() => addFieldValidator()}>
                                Add Field Validator
                            </button>
                            <button 
                                className="cursor-default bg-red-100 border-2 border-red-500 text-red-500 font-medium rounded-lg text-sm ml-3 p-2 text-center">
                                Connected LRA
                            </button>
                        </div> : 

                        // Account is a Field Validator
                        <div>
                            <a href="/validated" className="text-black hover:text-red-500 font-medium mx-3 p-2 text-center">Validated Properties</a> 
                            <button
                                className="text-black hover:text-red-500 font-medium mx-2 p-2 text-center"
                                onClick={() => setShowAddPropModal(true)}>
                                Add Property
                            </button>
                            <button 
                                className="cursor-default bg-red-100 border-2 border-red-500 text-red-500 font-medium rounded-lg text-sm ml-3 p-2 text-center">
                                Connected
                            </button>
                        </div> :

                        <button 
                            className="cursor-default bg-red-100 border-2 border-red-500 text-red-500 font-medium rounded-lg text-sm ml-3 p-2 text-center">
                            Unauthorized
                        </button> : 

                        // Account is not connected to the App
                        <button 
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-2 p-2 text-center"
                            onClick={connect}>
                            Connect
                        </button> : 

                        // MetaMask is not installed
                        <button 
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-2 p-2 text-center"
                            onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                            Install MetaMask
                        </button> 
                    }
                    </div>
                </div>
            </nav>
            {
                /**
                 * Renders the modal but sets the visibility
                 * to false. If setShowModal==true, set modal
                 * visibility to true and pass account prop 
                 * to component.
                 */ 
                showAddPropModal && 
                <AddPropertyModal
                    account={account.data}
                    onClose={() => setShowAddPropModal(null)}
                />
            }
        </header>
    )
}
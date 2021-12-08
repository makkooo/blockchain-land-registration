import { useAccount } from "@components/hooks/web3/useAccount"
import { AdminLayout } from "@components/layout"
import { PropertyCard, PropertyList, PropertyModal, RegisterPropertyModal } from "@components/properties"
import { useWeb3 } from "@components/providers"
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/**
 * Admin page.
 * 
 * @returns Returns Admin page
 */
export default function Admin() {

    // MetaMask account 
    const { account } = useAccount()

    const { contract } = useWeb3()

    // Sets selected property
    const [selectedProperty, setSelectedProperty] = useState(null)

    // Sets selected property to be registered
    const [registerProperty, setRegisterProperty] = useState(null)

    // Sets properties data
    const [properties, setProperties] = useState(null)

    const [isAuthorized, setIsAuthorized] = useState(false)

    const rejectSwal = withReactContent(Swal)

    useEffect(async () => {
        try {
            account.isAdmin ? setIsAuthorized(true) :
            setIsAuthorized(await contract.methods.isFieldValidator(account.data).call())
        } catch {
            console.log("isFieldValidator() failed.")
        }
    }, [account.data])

    /**
     * Fetch Pending properties from the database
     * and sets the properties object
     */
    useEffect(() => {
        fetch("http://localhost:3500/properties?status=Pending")
        .then(res => {
            return res.json()
        })
        .then(data => 
            {setProperties(data)})
    }, [])

    const handleReject = async (property) => {
        const { value: text } = await rejectSwal.fire({
            input: "textarea",
            title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">Reject Property</h3>,
            inputPlaceholder: "Type rejection message here...",
            showCancelButton: true,
            confirmButtonText: "Confirm",
            confirmButtonColor: "#d33",
            cancelButtonColor: '#6b7280',
        })
        if (text) {
            fetch(`http://localhost:3500/properties/${property.id}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...property,
                    status: "Rejected",
                    rejectionMessage: text
                })
            })
            rejectSwal.fire({
                title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">Property status updated!</h3>,
                confirmButtonText: "Done",
                confirmButtonColor: "#d33"
            }).then(location.reload())
        }
    }

    return (
        <>
        { isAuthorized ?
        <div className="px-auto sm:px-10 md:px-10">
            <h2 className="font-bold text-3xl py-6">Pending properties</h2>
            {/* Checks if properties!=null and renders properties list */}
            {properties && <PropertyList properties = {properties}>

            {/* Maps properties array to individual property */}
            { property => 
                <PropertyCard 
                    key = {property.id}
                    property = {property}
                    Footer = {() => 
                        <div className="flex justify-center"> 
                            { 
                                // If account is LRA
                                account.isAdmin ?
                                <div>                                
                                    <button 
                                        className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 mr-2 text-center"
                                        onClick = {() => setRegisterProperty(property)}>
                                        Register
                                    </button>
                                    <button 
                                        className="bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center"
                                        onClick = {() => handleReject(property)}>
                                        Reject
                                    </button>
                                </div> :

                                // If account is account Field Validator
                                <button
                                    className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center"
                                    onClick = {() => setSelectedProperty(property)}>
                                    View Details
                                </button>
                            }
                        </div>
                    }
                />
            }     
            </PropertyList> }             
            {
                // If account is LRA
                account.isAdmin ? 

                /**
                 * Renders the modal but sets the visibility
                 * to false. If registerProperty!=null, set modal
                 * visibility to true and pass property prop 
                 * to component.
                 */ 
                registerProperty &&
                <RegisterPropertyModal
                    property={registerProperty}
                    onClose = {() => setRegisterProperty(null)}
                /> :

                /**
                 * Renders the modal but sets the visibility
                 * to false. If selectedProperty!=null, set modal
                 * visibility to true and pass property prop 
                 * to component.
                 */ 
                selectedProperty && 
                <PropertyModal
                    property={selectedProperty}
                    onClose = {() => setSelectedProperty(null)}
                />
            }
        </div> :
        <div className="mt-10">
            <div className="block text-center">
                <h1 className="leading-none font-black opacity-50 text-3xl uppercase">Error 401: Unauthorized Access</h1>
            </div>
            <div>
                <img src="401-media.png" alt="Farmer"/>
            </div>
        </div>
        }
        </>
    )
}

// Sets Admin page layout to Admin layout
Admin.Layout = AdminLayout

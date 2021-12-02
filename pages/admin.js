import { useAccount } from "@components/hooks/web3/useAccount"
import { AdminLayout } from "@components/layout"
import { PropertyCard, PropertyList, PropertyModal, RegisterPropertyModal } from "@components/properties"
import { useState, useEffect } from "react"

/**
 * Admin page.
 * 
 * @returns Returns Admin page
 */
export default function Admin() {

    // MetaMask account 
    const { account } = useAccount()

    // Sets selected property
    const [selectedProperty, setSelectedProperty] = useState(null)

    // Sets selected property to be registered
    const [registerProperty, setRegisterProperty] = useState(null)

    // Sets properties data
    const [properties, setProperties] = useState(null)

    /**
     * Fetch Pending properties from the database
     * and sets the properties object
     */
    useEffect(() => {
        fetch(" http://localhost:3500/properties?status=Pending")
        .then(res => {
            return res.json()
        })
        .then(data => 
            {setProperties(data)})
    }, [])

    return (
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
                                        onClick = {() => setSelectedProperty(property)}>
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
        </div>
    )
}

// Sets Admin page layout to Admin layout
Admin.Layout = AdminLayout

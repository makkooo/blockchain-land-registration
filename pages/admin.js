import { useAccount } from "@components/hooks/web3/useAccount"
import { AdminLayout } from "@components/layout"
import { PropertyCard, PropertyList, PropertyModal, RegisterPropertyModal } from "@components/properties"
import { useState, useEffect } from "react"

export default function Admin() {

    const { account } = useAccount()
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [properties, setProperties] = useState(null)

    useEffect(() => {
        fetch(" http://localhost:3500/properties?status=Pending")
        .then(res => {
            return res.json()
        })
        .then(data => {
            setProperties(data)
        })
    }, [])

    return (
        <div className="px-auto sm:px-10 md:px-10">
            <h2 className="font-bold text-3xl py-6">Pending properties</h2>
            {properties && <PropertyList properties = {properties}>
            { property => 
                <PropertyCard 
                    key = {property.id}
                    property = {property}
                    Footer = {() => 
                        <div className="flex justify-center"> 
                            { account.isAdmin ?
                                <div>                                
                                    <button 
                                        className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 mr-2 text-center"
                                        onClick = {() => setSelectedProperty(property)}>
                                        Register
                                    </button>
                                    <button 
                                        className="bg-gray-500 hover:bg-gray-600 focus:ring-gray-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center"
                                        onClick = {() => setSelectedProperty(property)}>
                                        Reject
                                    </button>
                                </div> :
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
                account.isAdmin ? 

                selectedProperty &&
                <RegisterPropertyModal 
                    property={selectedProperty}
                    onClose = {() => setSelectedProperty(null)}
                /> :
                selectedProperty && 
                <PropertyModal
                    property={selectedProperty}
                    onClose = {() => setSelectedProperty(null)}
                />
            }
        </div>
    )
}

Admin.Layout = AdminLayout

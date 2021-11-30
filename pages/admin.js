import { useAccount } from "@components/hooks/web3/useAccount"
import { AdminLayout } from "@components/layout"
import { PropertyCard, PropertyList, RegisterPropertyModal } from "@components/properties"
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
                    property={property}
                    Footer = {() => 
                    <button 
                        disabled={!account.isAdmin}
                        className="disabled:opacity-50 disabled:cursor-not-allowed bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-20 p-2 text-center"
                        onClick={() => setSelectedProperty(property)}
                    >
                        Register
                    </button> 
                    }
                />
            }     
            </PropertyList> }             
            {
                selectedProperty &&
                <RegisterPropertyModal 
                    property={selectedProperty}
                    onClose = {() => setSelectedProperty(null)}
                />
            }
        </div>
    )
}

Admin.Layout = AdminLayout

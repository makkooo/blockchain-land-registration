import { useAccount } from "@components/hooks/web3/useAccount"
import { AdminLayout } from "@components/layout"
import { EditPropertyModal, PropertyCard, PropertyList } from "@components/properties"
import { useState, useEffect } from "react"

export default function Admin() {

    const { account } = useAccount()
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [properties, setProperties] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3500/properties?validator=" +"0x307d005e3C5B039254De932589e879d4acB94681"+ "&status=Pending")
        .then(res => {
            return res.json()
        })
        .then(data => {
            setProperties(data)
        })
    }, [])

    return (
        <div className="px-auto sm:px-10 md:px-10">
            <h2 className="font-bold text-3xl py-6">Validated Properties</h2>
            {properties && <PropertyList properties = {properties}>
            { property => 
                <PropertyCard
                key = {property.id}
                property = {property}
                Footer = {() => 
                    <div className="flex justify-center"> 
                        <button
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center"
                            onClick = {() => setSelectedProperty(property)}>
                            Edit Details
                        </button>
                    </div>
                    }
                />            
            }     
            </PropertyList> }     
            {
                selectedProperty && 
                <EditPropertyModal 
                    property = {selectedProperty}
                    onClose = {() => setSelectedProperty(null)}
                />
            }
        </div>
    )
}

Admin.Layout = AdminLayout
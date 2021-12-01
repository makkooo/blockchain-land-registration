import { useAccount } from "@components/hooks/web3/useAccount"
import { AdminLayout } from "@components/layout"
import { EditPropertyModal, PropertyCard, PropertyList } from "@components/properties"
import { useState, useEffect } from "react"

export default function Validated() {
    
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [properties, setProperties] = useState(null)
    const {account} = useAccount()
    const validator = account.data

    useEffect(() => {
        fetch("http://localhost:3500/properties?validator=" + validator + "&status_ne=Registered&_sort=createdAt&_order=desc")
        .then(res => {
            return res.json()
        })
        .then(data => 
            {setProperties(data)})
    }, [validator])

    const handleMakeAvailable = (_property) => {
        fetch("http://localhost:3500/properties/" + _property.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ..._property,
                status: "Pending"
            })
        }).then(location.reload())
    }

    const handleDetele = (_property) => {
        fetch("http://localhost:3500/properties/" + _property.id, {
            method: "DELETE"
        }).then(location.reload())
    }

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
                            disabled={property.status=="Pending"}
                            className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 focus:ring-blue-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center"
                            onClick = {() => handleMakeAvailable(property)}>
                            Make Available
                        </button>
                        <button
                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={property.status=="Pending"}
                            onClick = {() => setSelectedProperty(property)}>
                            <svg className="w-9 h-9 bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white rounded-lg mx-2 p-1" stroke="currentColor" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button
                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={property.status=="Pending"}
                            onClick = {() => handleDetele(property)}>
                            <svg className="w-9 h-9 bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white rounded-lg p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
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

Validated.Layout = AdminLayout
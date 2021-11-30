import { PropertyCard, PropertyList, PropertyModal } from "@components/properties"
import { BaseLayout } from "@components/layout"
import { useEffect, useState } from "react"

export default function Properties() {

    const [selectedProperty, setSelectedProperty] = useState(null)
    const [properties, setProperties] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3500/properties?_sort=createdAt&_order=desc")
        .then(res => {
            return res.json()
        })
        .then(data => {
            setProperties(data)
        })
    }, [])

    return (
        <div className="px-auto sm:px-10 md:px-10">
            <h2 className="font-bold text-3xl py-6">Latest properties</h2>
            {properties && <PropertyList properties = {properties}>
            { property => 
                <PropertyCard 
                    key = {property.id}
                    property={property}
                    Footer = {() =>
                    <button className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm ml-20 p-2 text-center"
                        onClick={() => setSelectedProperty(property)}
                        >
                        View Details
                    </button> 
                    }
                />
            }     
            </PropertyList> }             
            {
                selectedProperty &&
                <PropertyModal 
                    property={selectedProperty}
                    onClose = {() => setSelectedProperty(null)}
                />
            }
        </div>
    )
}

Properties.Layout = BaseLayout

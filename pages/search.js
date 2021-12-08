import { PropertyCard, PropertyList, PropertyModal } from "@components/properties"
import { BaseLayout } from "@components/layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Search() {

    const router = useRouter()

    const query = router.query.keyword

    // Sets selected property
    const [selectedProperty, setSelectedProperty] = useState(null)

    // Sets properties data
    const [properties, setProperties] = useState(null)

    // Fetch all properties from the database
    useEffect(() => {
        fetch("http://localhost:3500/properties?q=" + query)
        .then(res => {return res.json()})
        .then(data => {setProperties(data)})
    }, [query])

    return(
        <div className="px-auto sm:px-10 md:px-10">
            <h2 className="font-bold text-3xl py-6">Search Results for "{query}"</h2>
            {/* Checks if properties!=null and renders properties list */}
            {properties && <PropertyList properties = {properties}>

            {/* Maps properties array to individual property */}    
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

Search.Layout = BaseLayout
import { PropertyCard, PropertyList, PropertyModal } from "@components/properties"
import { BaseLayout } from "@components/layout"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/**
 * Displays all properties.
 * 
 * @returns Properties page
 */
export default function Properties() {

    // Sets selected property
    const [selectedProperty, setSelectedProperty] = useState(null)

    // Sets properties data
    const [properties, setProperties] = useState(null)

    const rejectionMessageSwal = withReactContent(Swal)

    // Fetch all properties from the database
    useEffect(() => {
        fetch("http://localhost:3500/properties?sort=createdAt&_order=desc")
        .then(res => {return res.json()})
        .then(data => {setProperties(data)})
    }, [])

    const viewRejectionMessage = async (property) => {
        await rejectionMessageSwal.fire({
            title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">Rejection Message</h3>,
            html: <h2 className="py-5 text-2xl font-regular italic leading-6 text-gray-900">{property.rejectionMessage}</h2>,
            confirmButtonText: "Done",
            confirmButtonColor: "#d33",
            icon: "warning"
        })
    }

    return (
        <div className="px-auto sm:px-10 md:px-10">
            <h2 className="font-bold text-3xl py-6">Latest properties</h2>
            {/* Checks if properties!=null and renders properties list */}
            {properties && <PropertyList properties = {properties}>

            {/* Maps properties array to individual property */}    
            { property => 
                <PropertyCard 
                    key = {property.id}
                    property={property}
                    Footer = {() =>
                        <div className="flex justify-center">
                            { property.status=="Rejected" ?    
                                <button className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center"
                                    onClick = {() => viewRejectionMessage(property)}>
                                    View Details
                                </button> :
                                <button className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center"
                                    onClick={() => setSelectedProperty(property)}>
                                    View Details
                                </button> 
                            }
                        </div>
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

// Sets Propeties page layout to Base Layout
Properties.Layout = BaseLayout

import { useAccount } from "@components/hooks/web3/useAccount"
import { AdminLayout } from "@components/layout"
import { EditPropertyModal, PropertyCard, PropertyList } from "@components/properties"
import { useState, useEffect } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

/**
 * Displays valiadted properties
 * 
 * @returns Validated properties page
 */
export default function Validated() {
    
    // Sets selected property
    const [selectedProperty, setSelectedProperty] = useState(null)

    // Sets properties data
    const [properties, setProperties] = useState()

    // MetaMask account 
    const {account} = useAccount()

    // Sets validator constant to MetaMask account address
    const validator = account.data

    const makeAvailableSwal = withReactContent(Swal)
    const deleteSwal = withReactContent(Swal)
    const rejectionMessageSwal = withReactContent(Swal)

    /**
     * Fetch properties from database where property 
     * validator == current MetaMask account address
     */
    useEffect(() => {
        fetch(`http://localhost:3500/properties?validator=${validator}&status_ne=Registered&_sort=createdAt&_order=desc`)
        .then(res => {
            return res.json()
        })
        .then(data => 
            {setProperties(data)})
    }, [validator])

    /**
     * Change the status of the selected property 
     * from "Created" to "Pending"
     * 
     * @param   {object}    property Selected property
     */
    const handleMakeAvailable = async (e, property) => {
        e.preventDefault()
        fetch(`http://localhost:3500/properties/${property.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...property,
                status: "Pending"
            })
        })
        await makeAvailableSwal.fire({
            title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">Property marked as available!</h3>,
            confirmButtonColor: "#d33",
            icon: "success"
        })
        .then((result) => {
            if(result.isConfirmed) {
                location.reload()
            }
        })
    }

    /**
     * Deletes the selected property from the database
     * 
     * @param {object} property 
     */
    const handleDetele = async (e, property) => {
        e.preventDefault()
        await deleteSwal.fire({
            title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">Are you sure you want to delete property?</h3>,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: '#6b7280',
            confirmButtonText: "Confirm"
        }).then((result) => {
            if(result.isConfirmed) {
                fetch("http://localhost:3500/properties/" + property.id, {
                    method: "DELETE"
                })
                deleteSwal.fire({
                    title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">Property deleted!</h3>,
                    confirmButtonColor: "#d33",
                    icon: "success"
                }).then((result) => {
                    if(result.isConfirmed) {
                        location.reload()
                    }
                })
            }
        })
    }

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
            <h2 className="font-bold text-3xl py-6">Validated Properties</h2>
            {/* Checks if properties!=null and renders properties list */}
            {properties && <PropertyList properties = {properties}>
            
            {/* Maps properties array to individual property */}  
            { property => 
                <PropertyCard
                key = {property.id}
                property = {property}
                Footer = {() => 
                    /**
                     * If property status==Pending, prevent the 
                     * Field Validator from editing and deleting
                     * property by disabling buttons
                     */
                    <div className="flex justify-center">
                        { property.status=="Created" ?
                        <button
                            disabled={property.status=="Pending"}
                            className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 focus:ring-blue-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center"
                            onClick = {(e) => handleMakeAvailable(e, property)}>
                            Make Available
                        </button> :
                        <button
                            disabled={property.status=="Pending"}
                            className="disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600 focus:ring-blue-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center"
                            onClick = {(e) => viewRejectionMessage(property)}>
                            View Details
                        </button>
                        }
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
                            onClick = {(e) => handleDetele(e, property)}>
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
                /**
                 * Renders the modal but sets the visibility
                 * to false. If selectedProperty!=null, set modal
                 * visibility to true and pass property prop 
                 * to component.
                 */ 
                selectedProperty && 
                <EditPropertyModal 
                    property = {selectedProperty}
                    onClose = {() => setSelectedProperty(null)}
                />
            }
        </div>
    )
}

// Sets Validated page layout to Admin layout
Validated.Layout = AdminLayout

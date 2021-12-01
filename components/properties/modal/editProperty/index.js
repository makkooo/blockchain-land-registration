import Modal from "@components/common/modal"
import { useState } from "react"

export default function EditPropertyModal({property, onClose}) {

    const [isOpen, setIsOpen] = useState(true)
    const [propertyDetails, setPropertyDetails] = useState(property)

    const closeModal = () => {
        setIsOpen(false)
        setPropertyDetails(property)
        onClose()
    }

    const handleSubmit = () => {
        fetch('http://localhost:3500/properties/' + property.id, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(propertyDetails)
        }).then(closeModal())
    }

    return (
        <Modal isOpen={isOpen}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b" id="modal-title">
                            Edit Property
                        </h3>
                        <div className="absolute top-7 right-5">
                            <button onClick={closeModal}>
                            <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button> 
                        </div>
                    </div> 
                <form onSubmit={handleSubmit}>
                    <div class="px-10">
                        <div> 
                            <div className="flex items-center px-4 pt-3 pb-1">
                                <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                                <span className="text-xs text-gray-500 font-medium uppercase">Lot Number</span>
                            </div>
                            <div className="pl-5">
                                <input
                                    onChange={({target : {value}}) => {
                                        setPropertyDetails({
                                            ...propertyDetails,
                                            lotNum: value.trim()
                                        })
                                    }}
                                    required
                                    defaultValue={property.lotNum}
                                    name="lotNum"
                                    id="lotNum"
                                    className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter Lot Number"
                                />
                            </div>
                        </div>
                        <div> 
                            <div className="flex items-center px-4 pt-3 pb-1">
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <span className="text-xs text-gray-500 font-medium uppercase">Survey number</span>
                            </div>
                            <div className="pl-5">
                                <input
                                    onChange={({target : {value}}) => {
                                        setPropertyDetails({
                                            ...propertyDetails,
                                            surveyNum: value.trim()
                                        })
                                    }}
                                    required
                                    defaultValue={property.surveyNum}
                                    name="surveyNum"
                                    id="surveyNum"
                                    className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter Survey Number"
                                />
                            </div>
                        </div>
                        <div> 
                            <div className="flex items-center px-4 pt-3 pb-1">
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                                <span className="text-xs text-gray-500 font-medium uppercase">Total Area</span>
                            </div>
                            <div className="pl-5">
                                <input
                                    onChange={({target : {value}}) => {
                                        setPropertyDetails({
                                            ...propertyDetails,
                                            area: value
                                        })
                                    }}
                                    required
                                    defaultValue={property.area}
                                    type="number" step="0.01" min="0"
                                    name="area"
                                    id="area"
                                    className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter Total Area in Hectares"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center px-4 pt-3 pb-1">
                                <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className="text-xs text-gray-500 font-medium uppercase">Location</span>
                            </div>
                            <div className="pl-5">
                                <input
                                    onChange={({target : {value}}) => {
                                        setPropertyDetails({
                                            ...propertyDetails,
                                            location: value.trim()
                                        })
                                    }}
                                    required
                                    defaultValue={property.location}
                                    name="location"
                                    id="location"
                                    className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter Property Location"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center px-4 pt-3 pb-1">
                                <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className="text-xs text-gray-500 font-medium uppercase">Location Description</span>
                            </div>
                            <div className="pl-5">
                                <input
                                    onChange={({target : {value}}) => {
                                        setPropertyDetails({
                                            ...propertyDetails,
                                            locationDesc: value.trim()
                                        })
                                    }}
                                    required
                                    defaultValue={property.locationDesc}
                                    name="locationDesc"
                                    id="locationDesc"
                                    className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter Property Location Description"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                <div className="flex items-center px-4 pt-3 pb-1">
                                    <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                    <span className="text-xs text-gray-500 font-medium uppercase">Type of farm</span>
                                </div>
                                <div className="pl-5">
                                    <select 
                                        onChange={({target : {value}}) => {
                                            setPropertyDetails({
                                                ...propertyDetails,
                                                type: value
                                            })
                                        }}
                                        required
                                        defaultValue={property.type}
                                        className="focus:ring-indigo-500 shadow-md focus:border-indigo-500 block p-3 sm:text-sm border-gray-300 rounded-md">\
                                        <option value="" selected disabled hidden>Choose Type of Farm</option>
                                        <option value="Regular">Regular Farm</option>
                                        <option value="Commercial">Commercial Farm</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center px-4 pt-3 pb-1">
                                    <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                    <span className="text-xs text-gray-500 font-medium uppercase">Farm status</span>
                                </div>
                                <div className="pl-5">
                                    <select 
                                        onChange={({target : {value}}) => {
                                            setPropertyDetails({
                                                ...propertyDetails,
                                                farmStatus: value
                                            })
                                        }}
                                        required
                                        defaultValue={property.farmStatus}
                                        className="focus:ring-indigo-500 shadow-md focus:border-indigo-500 block p-3 sm:text-sm border-gray-300 rounded-md">
                                        <option value="" selected disabled hidden>Choose Farm Status</option>
                                        <option value="Cultivated">Cultivated</option>
                                        <option value="Idle">Idle</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center py-10">
                        <button
                            type="submit" 
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center mr-2">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

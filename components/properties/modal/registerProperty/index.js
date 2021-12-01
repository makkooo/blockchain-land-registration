import Modal from "@components/common/modal";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useWeb3 } from "@components/providers";
import { useEffect, useState } from "react";

const defaultDeedDetails = {
    owner: "",
    address: "",
    cadNum: "",
    lrcNum: "",
    registeredAt: ""
}

export default function RegisterPropertyModal({property, onClose}) {
     
    const { account } = useAccount()
    const { contract } = useWeb3()
    const [isOpen, setIsOpen] = useState(false)
    const [deedDetails, setDeedDetails] = useState(defaultDeedDetails)

    useEffect(() => {
        if(!!property) {
            setIsOpen(true)
        }
    }, [property])

    const closeModal = () => {
        setIsOpen(false)
        onClose()
    }
    
    const handleSubmit = async () => {
        fetch('http://localhost:3500/properties/' + property.id, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...property,
                status: "Registered",
                deed: [{
                    ...deedDetails,
                    registeredAt: Date.now()
                }]
            })
        }).then(closeModal())
        try {
            await contract.methods.registerProperty(
                Number(property.id),
                Number(property.lotNum),
                Number(property.surveyNum),
                String(property.area),
                String(property.location),
                String(property.locationDesc),
                String(property.validator),
                String(deedDetails.owner),
                String(deedDetails.address),
                Number(deedDetails.cadNum),
                Number(deedDetails.lrcNum)
            ).send({from: account.data})
        } catch {
            console.log("Property registration has failed. Please try again.")
        }
    }

    return (
        <Modal isOpen={isOpen}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-y-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

                <div className="relative">
                    <img className="w-full bg-cover" src={property.image}/>
                    <div className="absolute top-3 right-3">
                        <button onClick={closeModal}>
                        <svg className="w-8 h-8 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button> 
                    </div>
                    <div className="absolute bottom-5 left-5">
                        { property.status=="Registered" ?
                            <span
                                className="bg-green-100 border-2 border-green-500 text-green-500 font-medium rounded-lg text-sm p-2 text-center">
                                Registered
                            </span> : property.status=="Pending"?
                            <span
                                className="bg-yellow-100 border-2 border-yellow-500 text-yellow-500 font-medium rounded-lg text-sm p-2 text-center">
                                Pending
                            </span> :
                            <span
                                className="bg-blue-100 border-2 border-blue-500 text-blue-500 font-medium rounded-lg text-sm p-2 text-center">
                                Created
                            </span>
                        }
                    </div>
                </div>

                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b" id="modal-title">
                        Property Details
                    </h3>
                </div> 
                <div class="grid gap-1 grid-cols-2 px-3">
                    <div> 
                        <div className="flex items-center px-4 pt-3 pb-1">
                        <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Property id</span>
                        </div>
                        <span className="px-10 text-md font-medium">{property.id}</span>
                    </div>
                    <div> 
                        <div className="flex items-center px-4 pt-3 pb-1">
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Lot Number</span>
                        </div>
                        <span className="px-10 text-md font-medium">{property.lotNum}</span>
                    </div>
                    <div> 
                        <div className="flex items-center px-4 pt-3 pb-1">
                        <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Survey number</span>
                        </div>
                        <span className="px-10 text-md font-medium">{property.surveyNum}</span>
                    </div>
                    <div> 
                        <div className="flex items-center px-4 pt-3 pb-1">
                        <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Total Area</span>
                        </div>
                        <span className="px-10 text-md font-medium">{property.area} Hectare</span>
                    </div>
                    <div>
                        <div className="flex items-center px-4 pt-3 pb-1">
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Location</span>
                        </div>
                        <span className="px-10 text-md font-medium">{property.location}</span>
                    </div>
                    <div>
                        <div className="flex items-center px-4 pt-3 pb-1">
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Location Description</span>
                        </div>
                        <span className="px-10 text-sm font-medium">{property.locationDesc}</span>
                    </div>
                    <div>
                        <div className="flex items-center px-4 pt-3 pb-1">
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Type of farm</span>
                        </div>
                        <span className="px-10 text-md font-medium">{property.type}</span>
                    </div>
                    <div>
                        <div className="flex items-center px-4 pt-3 pb-1">
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Farm status</span>
                        </div>
                        <span className="px-10 text-md font-medium">{property.farmStatus}</span>
                    </div>
                    <div>
                        <div className="flex items-center px-4 pt-3 pb-1">
                            <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Field Validator</span>
                        </div>
                        <span className="px-10 text-md font-medium">{property.validator}</span>
                    </div>
                </div>


                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b" id="modal-title">
                        Deed Details
                    </h3>
                </div> 

                <form onSubmit={handleSubmit}>
                    <div class="grid gap-1 grid-cols-2 px-3">
                        <div>
                            <div className="flex items-center px-4 pt-3 pb-1">
                                <svg className="h-5 w-5 text-gray-500 mr-1"  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                <span className="text-xs text-gray-500 font-medium uppercase">Owner</span>
                            </div>
                            <div className="pl-5">
                                <input
                                    onChange={({target : {value}}) => {
                                        setDeedDetails({
                                            ...deedDetails,
                                            owner: value.trim()
                                        })
                                    }}
                                    required
                                    name="owner"
                                    id="owner"
                                    className="w-30 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter Owner Name"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center px-4 pt-3 pb-1">
                                <svg class="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                <span className="text-xs text-gray-500 font-medium uppercase">Owner Address</span>
                            </div>
                            <div className="pl-5">
                                <input
                                    onChange={({target : {value}}) => {
                                        setDeedDetails({
                                            ...deedDetails,
                                            address: value.trim()
                                        })
                                    }}
                                    required
                                    name="address"
                                    id="address"
                                    className="w-30 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter Owner Address"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center px-4 pt-3 pb-1">
                                <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                <span className="text-xs text-gray-500 font-medium uppercase">Cadastral Number</span>
                            </div>
                            <div className="pl-5">
                                <input
                                    onChange={({target : {value}}) => {
                                        setDeedDetails({
                                            ...deedDetails,
                                            cadNum: value.trim()
                                        })
                                    }}
                                    required
                                    name="cadNum"
                                    id="cadNum"
                                    className="w-30 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter Cadastral Number"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center px-4 pt-3 pb-1">
                                <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>
                                <span className="text-xs text-gray-500 font-medium uppercase">LRC Record Number</span>
                            </div>
                            <div className="pl-5">
                                <input
                                    onChange={({target : {value}}) => {
                                        setDeedDetails({
                                            ...deedDetails,
                                            lrcNum: value.trim()
                                        })
                                    }}
                                    required
                                    name="lrcNum"
                                    id="lrcNum"
                                    className="w-30 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter LRC Record Number"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center py-10">
                        <button 
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center mr-2">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
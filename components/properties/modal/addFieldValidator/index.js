import Modal from "@components/common/modal"
import { useWeb3 } from "@components/providers"
import { useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function AddFieldValidatorModal({account, onClose}) {

    const { contract } = useWeb3()

    const [isOpen, setIsOpen] = useState(true)

    const [accountAddress, setAccountAddress] = useState("")

    const AddFvSwal = withReactContent(Swal)

    const closeModal = () => {
        setIsOpen(false)
        onClose()
        location.reload()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await contract.methods.addFieldValidator(accountAddress).send({from: account.data})
            await AddFvSwal.fire({
                title: <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b">Account added as Field Validator!</h3>,
                confirmButtonColor: "#d33",
                icon: "success"
            }).then((result) => {
                if(result.isConfirmed) {
                    closeModal()
                }
            })
        } catch {
            console.log("Add Field Validator operation failed.")
        }
    }

    return (
        <Modal isOpen={isOpen}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="pb-3 text-lg font-bold leading-6 text-gray-900 border-b" id="modal-title">
                        Add Field Validator
                    </h3>
                    
                    <div className="absolute top-7 right-5">
                        {/* Modal Close Button */}
                        <button onClick={closeModal}>
                        <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button> 
                    </div>
                </div> 
                <form onSubmit={handleSubmit}>
                    <div class="px-10">
                        {/* Property Lot Number */}
                        <div> 
                            <div className="flex items-center px-4 pt-3 pb-1">
                                <svg className="h-8 w-8 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                                {/* Lot Number Text Input */}
                                <input
                                    onChange={({target : {value}}) => {
                                        setAccountAddress(
                                            value.trim()
                                        )
                                    }}
                                    required
                                    name="accountAddress"
                                    id="accountAddress"
                                    className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Enter Account Address"
                                />
                            </div>
                            <div className="flex items-center justify-center py-10">
                                {/* Submit Button */}
                                <button
                                    type="submit" 
                                    className="bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-medium rounded-lg text-sm p-2 text-center mr-2">
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Modal>
    )
}
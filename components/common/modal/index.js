// export default function Modal({properties, isOpen}) {

//     return (
//         <>
//         { properties.map(property =>
//             <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
//                 <div className="relative w-auto my-6 mx-auto max-w-3xl">

//                     {/*content*/}
//                     <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        
//                         {/*header*/}
//                         <div className="flex items-start justify-between p-5 border-b rounded-t">
//                             <h3 className="text-2xl font-medium">Property Details</h3>
//                         </div>

//                         {/*body*/}
//                         <div className="relative p-6 flex-auto">
                            
//                         </div>

//                         {/*footer*/}
//                         <div className="flex items-center justify-end p-6 rounded-b">
//                             <button
//                                 className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm ml-44 p-2 text-center"
//                                 type="button" onClick={() => hideModal(false)}>
//                                 Close
//                             </button>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         )}
//         </>
//     )
// }

export default function Modal({isOpen, children}) {

    return (
      <section>
        <div className={`${!isOpen && "hidden"} fixed z-10 inset-0 overflow-y-auto max-h-full"`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            { isOpen &&
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            }
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            {children}
          </div>
        </div>
      </section>
    )
  }
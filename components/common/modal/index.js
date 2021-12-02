/**
 * Base modal component of the App.
 * 
 * @param   {boolean}     isOpen sets the visibility of the component
 * @param   {Component}   children children components    
 * @returns component     Returns the base modal component
 */

export default function Modal({isOpen, children}) {

    return (
      <section>
        {/* Sets modal visibility to hidden if isOpen==false */}
        <div className={`${!isOpen && "hidden"} fixed z-10 inset-0 overflow-y-auto max-h-full"`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Sets background color to bg-gray-600 if isOpen==true */}
            { isOpen &&
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            }
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            {/* Children components */}
            {children}
          </div>
        </div>
      </section>
    )
  }
export default function Card({property, Footer}) {

    return (
        <>
        <div key={property.id} className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
            <img 
                className="rounded-t-lg" 
                src={property.image}
                alt=""/>
            <div className="p-5">
                { property.deed.map(d =>
                    <div className="pb-3">
                        <div className="flex items-center px-4 pt-3 pb-1">
                            <svg className="h-5 w-5 text-gray-500 mr-1"  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            <span className="text-xs text-gray-500 font-medium uppercase">Owner</span>
                        </div>
                        <span className="px-10 text-lg font-medium">{d.owner}</span>
                    </div>
                )}
                <div className="pb-5"> 
                    <div className="flex items-center px-4 pt-3 pb-1">
                        <svg className="h-5 w-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span className="text-xs text-gray-500 font-medium uppercase">Location</span>
                    </div>
                    <span className="px-10 text-lg font-medium">{property.location}</span>
                </div>
                {
                    Footer &&
                    <Footer/>
                }
            </div>
        </div>
        </>
    )
}

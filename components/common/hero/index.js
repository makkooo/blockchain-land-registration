/**
 * Hero component of the App.
 *    
 * @returns     component   Returns the Hero component
 */

export default function Hero() {

    return (
        <section className="px-2 py-10 lg:px-0 flex w-full container mx-auto">
            <div className="w-full text-black flex justify-center md:justify-start text-center md:text-left">
                <div className="mt-20 md:w-1/3 w-full">
                    {/* Hero Title */}
                    <h2 className="leading-none font-regular text-2xl xs:text-2x1 md:text-5xl lg:6x1">A <span className="font-bold">public record keeping</span> of land titles for 
                        <span className="text-red-500 font-bold"> Filipino farmers.</span>
                    </h2>
                    {/* Hero Subtitle */}
                    <p className="font-regular text-gray-500 text-lg my-10">
                        Utilizing blockchain technology for a secure land registration and public record keeping.
                    </p>
                    {/* Hero Call-to-Action Button */}
                    <a href="/properties" 
                        className=" px-10 rounded-lg bg-red-500 hover:bg-red-600 focus:ring-red-200 focus:ring-4 text-white font-bold p-4">
                        Explore Properties
                    </a>
                </div>
                {/* Hero Image */}
                <div className="md:w-2/3 md:justify-center md:flex hidden">
                    <img src="index-media.png" alt="Farmer" />
                </div>
            </div>
        </section>
    )
}
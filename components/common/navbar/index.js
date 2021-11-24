export default function Navbar() {

    return (
        <section>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="relative" aria-label="Global">
                <div className="flex justify-between">
                <div>
                    <a href="#" className="font-medium mr-8 text-gray-500 hover:text-gray-900">SOTERA</a>
                </div>
                <div>
                    <a href="#" className="font-medium mr-8 text-gray-500 hover:text-gray-900">Search</a>
                    <a href="#" className="font-medium mr-8 text-red-500 hover:text-red-400">Logout</a>
                </div>
                </div>
            </nav>
            </div>
        </section>
    )
}
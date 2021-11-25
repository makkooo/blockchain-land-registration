import { SearchBar } from ".."

export default function Header() {

    return (
        <header className="bg-white px-10 border-b">
            <nav className="max-w-7xl mx-auto py-3" aria-label="Global">
                <div className="flex justify-between">
                    <div>
                        <a href="#"><img src="logo.png"/></a>
                    </div>
                    <div className="my-auto">
                        <SearchBar/>
                    </div>
                </div>
            </nav>
        </header>
    )
}

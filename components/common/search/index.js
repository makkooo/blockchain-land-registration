import { useState } from "react"
import { useRouter } from 'next/router'

/**
 * Search bar component of the App.
 *    
 * @returns     component   Returns the Search bar component
 */
export default function Search() {

    const router = useRouter()
    const [query, setQuery] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push({
            pathname: "/search",
            query: { keyword: query },
        })
    }

    return (
        <div className="pt-2 relative mx-auto text-gray-600">
            <form onSubmit={handleSubmit}>
                <input 
                    onChange={({target : {value}}) => {
                        setQuery(
                            value.trim()
                        )
                    }}
                    value={query}
                    type="text" 
                    name="search" 
                    className="border-2 border-gray-300 bg-white h-10 px-3 pr-10 rounded-lg text-sm focus:outline-none"
                    placeholder="Search Properties"/>
                <button
                    type="submit" 
                    className="absolute right-2 top-4">
                    <svg class="w-6 h-6 text-gray-600 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </form>
        </div>
    )
}
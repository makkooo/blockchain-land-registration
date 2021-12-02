/**
 * Search bar component of the App.
 *    
 * @returns     component   Returns the Search bar component
 */

export default function SearchBar() {

    return (
        <div class="pt-2 relative mx-auto text-gray-600">
            {/* Text Bar */}
            <input class="border-2 border-gray-100 bg-white h-10 px-3 pr-24 rounded-lg focus:outline-none"
                type="search" name="search" placeholder="Search land titles..."/>
            {/* Search Icon */}
            <svg class="w-6 h-6 absolute right-0 top-0 mt-4 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
      </div>
    )
}
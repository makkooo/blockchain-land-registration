export default function Card() {
    
    return (
        <div class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm mb-5">
            <a href="#">
                <img class="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt=""/>
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p class="font-normal text-gray-700 mb-3">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mr-2" href="#">
                    Accept
                </a>
                <a class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center" href="#">
                    Reject
                </a>
            </div>
        </div>
    )
}

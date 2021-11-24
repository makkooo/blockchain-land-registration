export default function Footer() {

    return (
        <footer className="bg-white-900 pt-1">
          <div className="container mx-auto px-6">
            <div className="mt-5 flex flex-col items-center">
              <div className="py-6">
                <p className="mb-6 text-black text-sm text-primary-2 font-bold">
                    © {new Date().getFullYear()} Made with ❤️ Group 2 BSCS 4-3
                </p>
              </div>
            </div>
          </div>
        </footer>
    )
}
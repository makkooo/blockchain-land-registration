export default function List({properties, children}) {

    return (
        <section className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-10">
            { properties.map(property => children(property))}
        </section>
    )
}
import properties from "./index.json"

export const getAllProperties = () => {

    return {
        data: properties,
        propertyMap: properties.reduce((accumulator, property, index) => {
            accumulator[property.id] = property
            accumulator[property.id].index = index
            return accumulator
        }, {}) 
    }
}
export const updateObject = ( object, objectWithUpdatedProperties ) => {
    return {
        ...object, 
        ...objectWithUpdatedProperties
    }
}

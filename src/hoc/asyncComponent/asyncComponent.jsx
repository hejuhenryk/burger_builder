import React, { useState, useEffect } from 'react'

const asyncComponent = (importComponent) => {
    return (props) => {
        const [Component, setComponent] = useState(null)

        useEffect(() => {
            importComponent()
                .then( cmp => setComponent( cmp.default ))
        }, [])
        
        return Component ? <Component {...props} /> : null
    }
}

export default asyncComponent

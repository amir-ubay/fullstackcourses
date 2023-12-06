import { useState, useEffect } from 'react'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        (async () => {
            const response = await fetch(baseUrl)
            const data = await response.json()
            setResources(data)
        })()
    },[])

    const create = async (resource) => {
        const body = {
            
        }
        // (async () => {
        //     const response = await fetch(baseUrl, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(resource)
        //     })
        //     const data = await response.json()
        //     setResources([...resources, data])
        // })()
    }
}
import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    useEffect( () => {
        async function fetchData() {
            const response = await axios.get(baseUrl)
            setResources(response.data)
        }
        fetchData()
    },[baseUrl])

    const create = async (resource) => {
            const response = await axios.post(baseUrl, resource)
            setResources([...resources, response.data])
            return response.data
    }

    const update = async (resource) => {
        const response = await axios.put(`${baseUrl}/${resource.id}`, resource)
        setResources(resources.map(n => n.id === response.data.id ? response.data : n))
        return response.data
    }
    
    return {
        resources,
        create,
        update
    }
}
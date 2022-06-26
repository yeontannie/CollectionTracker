import React, { useEffect } from "react"
import collectionService from "../services/collectionService"
import ShowCollections from "../components/ShowCollections"

export default function Collections(){
    const [collections, setCollections] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    localStorage.removeItem("items")

    function getCollections(data){
        setCollections(data)
        setIsLoading(false)
    }

    useEffect(() => {
        collectionService.getAll()
            .then(response => {
                getCollections(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return(
        <div>
            <ShowCollections isLoading={isLoading} collections={collections} />
        </div>
    ) 
}
import React, { useEffect } from "react"
import collectionService from "../services/collectionService"
import ShowCollections from "../components/ShowCollections"

export default function MyCollections(){
    const [myCollections, setMyCollections] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    localStorage.removeItem("items")

    function setData(data){
        setMyCollections(data)
        setIsLoading(false)
    }

    useEffect(() => {
        collectionService.getMyCollections(JSON.parse(localStorage.getItem("username")))
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    function refreshCollections(){
        collectionService.getMyCollections(JSON.parse(localStorage.getItem("username")))
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    function addCollection(newCollection){
        collectionService.createCollection(newCollection)
            .then(response => {
                console.log(response)
                refreshCollections()
            })
            .catch(error => {
                console.log(error)
            })
    }

    function editCollection(collection, id){
        collectionService.editCollection(collection, id)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
            
        console.log(collection)
        console.log(id)
    }

    function deleteCollection(id){
        collectionService.deleteCollection(id)
            .then(response => {
                console.log(response)
                refreshCollections()
            })
            .catch(error => console.log(error))
    }

    return(
        <div>
            <ShowCollections isLoading={isLoading} 
                collections={myCollections}
                addCollection={addCollection}
                delete={deleteCollection} 
                edit={editCollection}
            />
        </div>
    )
}
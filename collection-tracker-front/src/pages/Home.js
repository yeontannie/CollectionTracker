import React, { useEffect } from "react"
import itemService from "../services/itemService"
import ShowItems from "../components/ShowItems"

export default function Home(){
    const [allItems, setAllItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    localStorage.removeItem("collections")
    localStorage.removeItem("cWithItems")

    useEffect(() => {
        itemService.getAll()
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    function setData(data){
        setAllItems(data)
        setIsLoading(false)
    }

    function refreshItems(){
        itemService.getAll()
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => console.log(error))
    }

    /*function addItem(model){
        itemService.createItem(model)
            .then(response => {
                console.log(response)
                refreshItems()
            })
            .catch(error => console.log(error))
    }

    function deleteItem(id){
        itemService.deleteItem(id)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    function editItem(model, id){
        itemService.editItem(model, id)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }*/

    return(
        <div>
            <ShowItems isLoading={isLoading} 
                items={allItems}
                refresh={refreshItems}
            />
        </div>
    )
}
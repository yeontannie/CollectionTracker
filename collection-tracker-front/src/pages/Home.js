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

    return(
        <div>
            <div className="items-list">
                <ShowItems isLoading={isLoading} 
                    items={allItems}
                    refresh={refreshItems}
                />
            </div>
        </div>
    )
}
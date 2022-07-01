import React from "react"
import ShowItems from "../components/ShowItems"
import itemService from "../services/itemService"

export default function Items(){
    const [collection] = React.useState(JSON.parse(localStorage.getItem("cWithItems")))
    const [items, setItems] = React.useState(collection.items)

    function setData(data){
        setItems(data)
    }

    function refreshItems(){
        itemService.getByCollection(collection.id)
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(error => console.log(error))
    }

    return(
        <div>
            <h1>{collection.name} by {collection.userName}</h1>
            <p className="collection-desc">{collection.description}</p>
            <div className="items-list">
                <ShowItems 
                    items={items}
                    refresh={refreshItems} 
                />
            </div>            
        </div>
    )
}
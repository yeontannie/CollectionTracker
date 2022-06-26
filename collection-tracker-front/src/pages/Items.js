import React from "react"
import ShowItems from "../components/ShowItems"

export default function Items(){
    const [collection] = React.useState(JSON.parse(localStorage.getItem("cWithItems")))
    const [items] = React.useState(collection.items)

    return(
        <div>
            <h1>{collection.name} by {collection.userName}</h1>
            <p className="collection-desc">{collection.description}</p>
            <div className="items-list">
                <ShowItems  items={items} />
            </div>            
        </div>
    )
}
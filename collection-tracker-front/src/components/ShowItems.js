import React from "react"
import Item from "./Item"
import AddBtn from "./AddBtn"

export default function ShowItems(props){
    if(props.isLoading){
        return(
            <div className="center-title"><h2>Loading...</h2></div>
        )
    } else {
        if(!props.items){
            <div className="center-title"><h2>No items yet</h2></div>
        } else {
            return(
                <div>
                    { JSON.parse(localStorage.getItem("username")) && <AddBtn /> }
                    <div className="items-list">
                        {props.items && props.items.map(i => <Item img="nature-2.png" item={i} key={i.id} />)}
                    </div>
                </div>
            )
        }
    }
}
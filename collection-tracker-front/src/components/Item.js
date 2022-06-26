import React from "react"

export default function Item(props){
    return(
        <div className="item">
            <img alt="" src={`./${props.img}`} className="item-img" />
            <p className="item-title">
                <b>{props.item.name}</b> | ({props.item.created.toString().substring(0,10)})
            </p>
        </div>
    )
}
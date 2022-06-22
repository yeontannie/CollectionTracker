import React from "react"

export default function Collection(props){
    return(
        <div>
            <img alt="" src={`./${props.img}`} className="collection-img" />
            <button className="badge">SHOW</button>
        </div>
    )
}
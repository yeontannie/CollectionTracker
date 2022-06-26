import React from "react"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

export default function Collection(props){
    const [usernm] = React.useState(JSON.parse(localStorage.getItem("username")))

    return(
        <div>
            <div className="collection">
                <img alt="" src={`./${props.img}`} className="collection-img" />
                <p className="collection-author">{props.collection.name} by {props.collection.userName}</p>
                { props.collection.userName === usernm && <>
                    <button onClick={() => {props.delete(props.id)}} className="collection-delete"><DeleteOutlined /></button>
                    <button className="collection-edit"><EditOutlined /></button> 
                </>}
                <button className="badge" 
                    onClick={() => {props.handleShow(props.id)}}>SHOW
                </button>
            </div>
        </div>
    )
}
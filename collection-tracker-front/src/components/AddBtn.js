import React from "react"
import { PlusOutlined } from '@ant-design/icons'

export default function AddBtn(props){
    return(
        <div className="btn-div">
            <button className="add-btn" onClick={props.showModal}><PlusOutlined /></button>
        </div>
    )
}
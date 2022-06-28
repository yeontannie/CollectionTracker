import React from "react"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ModalWindow from "./ModalWindow"
import DeleteModal from "./DeleteModal"

export default function Collection(props){
    const [usernm] = React.useState(JSON.parse(localStorage.getItem("username")))
    const [editCollection, setEditCollection] = React.useState(props.collection)
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [confirmVisible, setConfirmVisible] = React.useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
        setConfirmVisible(false)
    }

    const handleOk = () => {
        setIsModalVisible(false)
        props.edit(editCollection, editCollection.id)
    }

    const handleDelete = () => {
        props.delete(props.id)
        setConfirmVisible(false)
    }

    function handleChange(event, name) {
        setEditCollection(oldData => {
            return {
                ...oldData,
                [name]: event.target.value
            }
        })
    }

    const showConfirm = () => {
        setConfirmVisible(true)
    }

    return(
        <div>
            {confirmVisible && <><DeleteModal isModalVisible={confirmVisible} 
                name={props.collection.name} handleCancel={handleCancel} handleOk={handleDelete} /></>
            }

            {isModalVisible && <>
                <ModalWindow 
                    isModalVisible={isModalVisible} 
                    handleOk={handleOk} 
                    handleCancel={handleCancel} 
                    handleChange={handleChange}
                    collection={editCollection}
                    title="Edit Collection"
                /></>
            }
            <div className="collection">
                <img alt="" src={`./${props.img}`} className="collection-img" />
                <p className="collection-author">{props.collection.name} by {props.collection.userName}</p>
                { props.collection.userName === usernm && <>
                    <button onClick={showConfirm} className="collection-delete"><DeleteOutlined /></button>
                    <button onClick={showModal} className="collection-edit"><EditOutlined /></button> 
                </>}
                <button className="badge" 
                    onClick={() => {props.handleShow(props.id)}}>SHOW
                </button>
            </div>
        </div>
    )
}
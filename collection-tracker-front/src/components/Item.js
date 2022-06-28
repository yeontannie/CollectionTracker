import React from "react"
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ModalItem from "./ModalItem"
import DeleteModal from "./DeleteModal"

export default function Item(props){
    const [usernm] = React.useState(JSON.parse(localStorage.getItem("username")))
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [editItem, setEditItem] = React.useState(props.item)
    const [confirmVisible, setConfirmVisible] = React.useState(false)

    const handleCancel = () => {
        setIsModalVisible(false)
        setConfirmVisible(false)
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        console.log(editItem)
        props.edit(editItem, editItem.id)
        setIsModalVisible(false)
    }

    const handleDelete = () => {
        props.delete(props.id)
        setConfirmVisible(false)
    }

    function handleChange(event, name){
        setEditItem(oldData => {
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
                name={props.item.name} handleCancel={handleCancel} handleOk={handleDelete} /></>
            }

            { isModalVisible && <>
                <ModalItem isModalVisible={isModalVisible}
                    handleCancel={handleCancel} 
                    handleOk={handleOk}
                    item={editItem} 
                    collections={props.collections} 
                    handleChange={handleChange}
                    title="Edit Item" 
                />
            </>}
            <div className="item">
                <img alt="" src={`./${props.img}`} className="item-img" />
                <p className="item-title">
                    <b>{props.item.name}</b> | ({props.item.created.toString().substring(0,10)})
                </p>
                { props.item.userName === usernm && <>
                    <div className="item-btns">
                        <button onClick={showConfirm} className="item-delete"><DeleteOutlined /></button>
                        <button onClick={showModal} className="item-edit"><EditOutlined /></button> 
                    </div>
                </>}
            </div>
        </div>
    )
}
import React from "react"
import { DeleteOutlined, EditOutlined, LikeOutlined, LikeFilled, CommentOutlined } from '@ant-design/icons'
import ModalItem from "./ModalItem"
import DeleteModal from "./DeleteModal"
import itemService from "../services/itemService"

export default function Item(props){
    const [usernm] = React.useState(JSON.parse(localStorage.getItem("username")))
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [editItem, setEditItem] = React.useState(props.item)
    const [confirmVisible, setConfirmVisible] = React.useState(false)
    const [isLiked, setIsLiked] = React.useState(props.isLiked)
    /* 
    показати к-сть лайків всього
    
    коментарі*/


    const liked = isLiked ? <LikeFilled style={{ fontSize: "22px" }} /> : <LikeOutlined style={{ fontSize: "22px" }} />

    console.log(props.isLiked)

    function changeLike(){
        setIsLiked(oldValue => !oldValue)
        likeItem()
    }

    function likeItem(){
        itemService.likeItem({ itemId: props.item.id, userName: usernm }, usernm)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log(error))
    }

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

    function showComments(item){
        localStorage.setItem("currentItem", JSON.stringify(item))
        window.location.href = "./item/comments"
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
                <div className="item-title">
                    <span><b>{props.item.name}</b> |</span> 
                    <span><p onClick={changeLike} className="like-item">{liked}</p></span>
                    <span><p onClick={() => {showComments(props.item)}} className="like-item"><CommentOutlined style={{ fontSize: "22px" }} /></p></span>
                </div>
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
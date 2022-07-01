import React, { useEffect } from "react"
import Item from "./Item"
import AddBtn from "./AddBtn"
import ModalItem from "./ModalItem"
import collectionService from "../services/collectionService"
import itemService from "../services/itemService"
import Moment from 'moment'

export default function ShowItems(props){
    const [isModalVisible, setIsModalVisible] = React.useState(false)
    const [usernm] = React.useState(JSON.parse(localStorage.getItem("username")))
    const [collections, setCollections] = React.useState()
    const [newItem, setNewItem] = React.useState({
        name: "",
        userName: JSON.parse(localStorage.getItem("username")),
        created: Moment.utc(Date.now()).toISOString(),
        collectionId: 0
    })

    localStorage.removeItem("currentItem")

    function setData(data){
        setCollections(data)
    }

    useEffect(() => {
        collectionService.getAll()
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    function handleChange(event, name){
        setNewItem(oldData => {
            return {
                ...oldData,
                [name]: event.target.value
            }
        })
    }

    const handleOk = () => {
        addItem(newItem)
        setIsModalVisible(false)
    }

    function addItem(model){
        itemService.createItem(model)
            .then(response => {
                console.log(response)
                props.refresh()
            })
            .catch(error => console.log(error))
    }

    function deleteItem(id){
        console.log(id)
        itemService.deleteItem(id)
            .then(response => {
                console.log(response)
                props.refresh()
            })
            .catch(error => console.log(error))
    }

    function editItem(model, id){
        itemService.editItem(model, id)
            .then(response => {
                console.log(response)
                props.refresh()
            })
            .catch(error => console.log(error))
    }

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
                    { JSON.parse(localStorage.getItem("username")) && <AddBtn showModal={showModal} /> }
                    { isModalVisible && <>
                        <ModalItem isModalVisible={isModalVisible}
                            handleCancel={handleCancel} 
                            handleOk={handleOk}
                            item={newItem} 
                            collections={collections} 
                            handleChange={handleChange}
                            title="Create Item"  
                        />
                    </>}
                    <div className="items-list">
                        {props.items && props.items.map(i => <Item img="nature-2.png" 
                            item={i} id={i.id}
                            collections={collections}
                            key={i.id}
                            delete={deleteItem} 
                            edit={editItem} isLiked={i.likes && (i.likes.filter(l => l.userName === usernm).length === 1 ? true : false)}
                        />)}
                    </div>
                </div>
            )
        }
    }
}
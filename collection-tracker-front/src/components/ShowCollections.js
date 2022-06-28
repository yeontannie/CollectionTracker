import React from "react"
import collectionService from "../services/collectionService"
import Collection from "./Collection"
import AddBtn from "./AddBtn"
import ModalWindow from "./ModalWindow"

export default function ShowCollection(props){
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [newCollection, setNewCollection] = React.useState({
        name: "",
        description: "",
        theme: "",
        userName: `${JSON.parse(localStorage.getItem("username"))}`,
        itemAmounts: 0
    })

    function addCollection(newCollection){
        collectionService.createCollection(newCollection)
            .then(response => {
                console.log(response)
                props.refresh()
            })
            .catch(error => {
                console.log(error)
            })
    }

    function editCollection(collection, id){
        collectionService.editCollection(collection, id)
            .then(response => {
                console.log(response)
                props.refresh()
            })
            .catch(error => console.log(error))
    }

    function deleteCollection(id){
        collectionService.deleteCollection(id)
            .then(response => {
                console.log(response)
                props.refresh()
            })
            .catch(error => console.log(error))
    }

    function handleChange(event, name){
        setNewCollection(oldData => {
            return {
                ...oldData,
                [name]: event.target.value
            }
        })
    }

    async function handleShow(id){
        await collectionService.getById(id)
            .then(response => {
                localStorage.setItem("cWithItems", JSON.stringify(response.data))
            })
            .catch(error => {
                console.log(error)
            }
        )
        window.location.href = "./items"
    }

    const showModal = () => {
        setIsModalVisible(true);
    }

    async function handleOk() {
        addCollection(newCollection)
        setIsModalVisible(false);
    }
    
    const handleCancel = () => {
        setIsModalVisible(false)
    }

    if(props.isLoading){
        return(<div className="center-title"><h2>Loading...</h2></div>
        )
    } else {
        if(!props.collections){
            <div className="center-title"><h2>No collections yet</h2></div>
        } else {
            return(
                <div> 
                    { JSON.parse(localStorage.getItem("username")) &&  <AddBtn showModal={showModal} /> }
                    {isModalVisible && <>
                        <ModalWindow 
                            isModalVisible={isModalVisible} 
                            handleOk={handleOk} 
                            handleCancel={handleCancel} 
                            handleChange={handleChange}
                            collection={newCollection}
                            title="Create Collection" 
                        /></>
                    }
                    <div className="collection-list">
                        {props.collections && <>
                            {props.collections.map(c => <Collection id={c.id} 
                                img="photo.png" collection={c}
                                handleShow={handleShow} key={c.id} 
                                delete={deleteCollection} 
                                edit={editCollection}
                            />)}
                        </>}
                    </div>
                </div>
            )
        }
    }
}
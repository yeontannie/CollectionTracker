import React, { useEffect } from "react"
import Comment from "../components/Comment"
import likeCommentService from "../services/likeCommentService"
import Moment from 'moment'
import { Input } from "antd"
import { SendOutlined } from '@ant-design/icons'

export default function Comments(){
    const [item] = React.useState(JSON.parse(localStorage.getItem("currentItem")))
    const [comments, setComments] = React.useState()
    const [comment, setComment] = React.useState({
        text: "",
        commentedDate: Moment.utc(Date.now()).toISOString(),
        username: JSON.parse(localStorage.getItem("username")),
        itemId: item.id
    })

    function setData(data){
        setComments(data)
        comment.text = ""
    }

    useEffect(() => {
        likeCommentService.getComments(item.id)
            .then(response => {
            console.log(response)
            setData(response.data)
            })
            .catch(error => console.log(error))
    }, [item.id])

    function refreshComments(){
        likeCommentService.getComments(item.id)
            .then(response => {
                console.log(response)
                setData(response.data)
            }
        )
        .catch(error => console.log(error))
    }

    const commentsEl = comments && comments.map(c => <Comment username={c.userName} 
        text={c.text} date={c.commentedDate} />)

    function sendComment(e){
        e.preventDefault()
        likeCommentService.addComment(comment)
            .then(response => {
                console.log(response)
                refreshComments()
            })
            .catch(error => console.log(error))
    }

    function handleChange(event, name){
        setComment(oldData => {
            return {
                ...oldData,
                [name]: event.target.value
            }
        })
    }

    return(
        <div className="comment-div">
            <div className="comment-as-pin">
                <div>
                    <h1 className="title-on-comm">comments on {item.name}</h1>
                    <img alt="nov" src="/nature-2.png" className="comment-img"/>
                </div>
                <div className="comment-list">
                    <h2>{comments && comments.length} comments</h2>
                    <div className="comment-only-coms">{comments && commentsEl}</div>
                    <div className="add-comment">
                        <Input value={comment.text} className="comment-input" onChange={(e) => {handleChange(e, "text")}} />
                        <button className="send-comment" onClick={(e) => {sendComment(e)}} ><SendOutlined /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
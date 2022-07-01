import React from "react"

export default function Comment(props){
    return (
            <div className="comment">
                <h4>{props.username}</h4>
                <div className="comm-text-date">
                    <p className="com-text">{props.text}</p>
                    <p>{props.date.substring(0,16).replace('T',' ')}</p>
                </div>
            </div>
    )
}
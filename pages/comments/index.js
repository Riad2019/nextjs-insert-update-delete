import { CONFIG_FILES } from 'next/dist/shared/lib/constants'
import React, { useState } from 'react'


export default function CommentsPage() {

    const [com, setCom] = useState([])
    const [comment, setComment] = useState("")

    const fetchComments = async () => {
        const response = await fetch('/api/comments')
        const data = await response.json()
        setCom(data)
    }
    const submitComments = async () => {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    }
    const deletecomment = async (commentId) => {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: "DELETE",
        })
        const data = await response.json()
        console.log(data)
        fetchComments()


    }
    return (
        <>
            <input type='text' value={comment} onChange={(e) => setComment(e.target.value)}></input>
            <button onClick={submitComments}>Submit comments</button>
            <button onClick={fetchComments}>Load comments</button>
            {
                com.map(comment => {
                    return (
                        <div key={comment.id}>
                            {comment.id} {comment.text}
                            <button onClick={() => deletecomment(comment.id)}>Delete</button>
                        </div>
                    )
                })
            }

        </>
    )
}

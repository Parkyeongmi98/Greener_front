import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ReplyComment from './ReplyComment'
import SingleComment from './SingleComment'

function Comment(props) {

    const [commentValue, setCommentValue] = useState("")

    const boardsId = props.boardsId
    const membersId = localStorage.getItem("id");

    const handleClick = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            content : commentValue,
            boardsid : boardsId,
            membersid : membersId
        }

        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.post("/api/v1/comments", data)
        .then((response) => {

            if(response.data){
                alert("등록되었습니다.")
                console.log(response.data)
                setCommentValue("")
                props.refreshFunction(response.data)

                window.location.href = `/marketdetail/${boardsId}`;
            }else {
                alert("오류발생")
            }
        })
    }

    return (
        <><br/>
            <div>
                <p style={{marginLeft: "3%", fontSize: "30px"}}>댓글</p>
                <hr/>

                {/* Root Comment Form */}

                <form style={{display: 'flex'}} onSubmit={onSubmit} >
                    <textarea
                        style={{width: "100%", borderRadius: "5px", marginBottom: "5%", padding: "10px"}}
                        onChange={handleClick}
                        value={commentValue}
                        placeholder="댓글을 입력해주세요."

                    />
                    <br/>
                    <Button style={{width: "20%", height: "95px"}} onClick={onSubmit} variant="secondary">입력</Button>

                </form>

                
                {/* Comment List*/}
                {props.commentLists && props.commentLists.map((comment, index) => (
                    (!comment.parentCommentsId && 
                        <>
                        <SingleComment boardsId={boardsId} comment={comment} refreshFunction={props.refreshFunction} />
                        <ReplyComment boardsId={boardsId} parentId={comment.id} commentLists={props.commentLists} refreshFunction={props.refreshFunction} />
                        </>
                    )
                ))}



            </div>
        </>
    )
}

export default Comment
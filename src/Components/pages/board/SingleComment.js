import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import { Comment, Avatar, Input} from 'antd';
import axios from "axios";
import { Button } from 'react-bootstrap'
import "../css/Detail.css"

const {TextArea} = Input;


function SingleComment(props) {

    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState("")
    const boardId = useParams().boardsId
    const memberId = localStorage.getItem("id")

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            content : commentValue,
            boardsid : boardId,
            membersid : memberId,
            parentCommentsId: props.comment.id
        }

        axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
        axios.post("/api/v1/comments", data)
        .then(response => {

            if(response.data){
                alert("등록되었습니다.")
                console.log(response.data)
                setCommentValue("")
                props.refreshFunction(response.data)
                setOpenReply(false)
            }else {
                alert("오류발생")
            }
        })
    }

    const onClickReplyOpen = () => {
        setOpenReply(!openReply)
    }

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const action = [
        <Button onClick={onClickReplyOpen} 
        style={{textDecoration: "none", paddingLeft: "0px", color: "#5e5e5e", fontSize: "15px"}} variant="link">답글달기</Button>
    ]

    return(
        <>
        <div style={{ marginLeft: "2%", listStyle: "none", display: "flex", width: "100%", marginBottom: "5%"}}>
            <div>
            <Comment
                avatar={<i class="fa-solid fa-user-pen" style={{fontSize: "40px", marginTop: "15%"}}></i>}
            />
            </div>
            <div>
                <Comment
                    actions={action}
                    author={<a style={{fontSize: "20px", color: "#8b8b8b"}}>{props.comment.nickName}</a>}
                    content={<p style={{fontSize: "28px", margin: "0", wordBreak: "break-all", width: "65vw"}}>{props.comment.content}</p>}
                    style={{marginLeft: "4%", width: "95%"}}
                />
                <Comment
                    content={<a style={{fontSize: "20px", color: "#8b8b8b"}}>{props.comment.createDate}</a>}
                    style={{marginLeft: "4%"}}
                />
            </div>
        </div>

        {openReply &&
        <form style={{display: 'flex', marginTop: "2%"}} onSubmit={onSubmit}>
            <TextArea
                style={{width: "80%", borderRadius: "5px", marginLeft: "10%", padding: "10px"}}
                onChange={onHandleChange}
                value={commentValue}
                placeholder="댓글을 입력해주세요."

            />
            <br/>
            <Button style={{width: "18%", height: "95px"}} onClick={onSubmit} variant="secondary" >입력</Button>
        </form>
        }

        </>
    )
}

export default SingleComment
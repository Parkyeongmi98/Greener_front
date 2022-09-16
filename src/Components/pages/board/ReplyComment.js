import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [childCommentNumber, setChildCommentNumber] = useState(0)
    const [openReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {

        let commentNumber = 0;
        props.commentLists.map((comment) => {
            if(comment.parentCommentsId === props.parentId) {
                commentNumber ++
            }
        })

        setChildCommentNumber(commentNumber)

    }, [props.commentLists])

    const renderReplyComment = (parentId) =>
    props.commentLists.map((comment, index) => (
        <div key={index}>
        {
        comment.parentCommentsId === parentId &&
            <div style={{width: "90%", marginLeft: "10%"}}>
            <SingleComment boardsId={props.boardsId} refreshFunction={props.refreshFunction} comment={comment} /> 
            <ReplyComment boardsId={props.boardsId} parentId={comment.id} commentLists={props.commentLists} refreshFunction={props.refreshFunction} />
            </div>
        }
        </div>
    ))

    const onHandleChange = () => {
        setOpenReplyComments(!openReplyComments)

    }

    return (
        <>
        <div>
            {childCommentNumber > 0 && 
            <p style={{fontSize: '14px', margiin: 0, color: 'gray'}} onClick={onHandleChange}>
                View {childCommentNumber} more comment
            </p>
            }

            {openReplyComments &&
                renderReplyComment(props.parentId)
            }
        </div>
        </>
    )
}

export default ReplyComment
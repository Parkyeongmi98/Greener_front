import React from 'react'
import {Modal} from 'react-bootstrap';
import Message from './Message';

const ChatModal = ({show, onHide}) => {
    return(
        <div>
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Greener ChatBot
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Message />
      </Modal.Body>

    </Modal>
    </div>
    )
}

export default ChatModal
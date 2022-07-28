import {faTrash, faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";

import Modal from "react-bootstrap/Modal";
import parse from 'html-react-parser';


// drag drop file component
export default function DragDropFileItem({name, info, onView = null, saveAs = null, onRemove = null}) {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="file-item">
            <div className="content">
                <span style={{width: "25rem"}}>{name}</span>
                <span style={{width: "10rem"}}>{info()}</span>
                <span style={{width: "8rem", textAlign: "right"}} className="buttons">
                   { onView ? <button className="view-btn" onClick={handleShow}><FontAwesomeIcon icon={faEye}/></button> : "" }
                   { saveAs ? <button className="download-btn" onClick={saveAs}><FontAwesomeIcon icon={faDownload}/></button> : "" }
                   { onRemove ? <button className="trash-btn" onClick={onRemove}><FontAwesomeIcon icon={faTrash}/></button> : "" }
                </span>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{parse(onView())}</Modal.Body>
            </Modal>
       </div>
    );
}
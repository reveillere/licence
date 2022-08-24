import {faTrash, faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";

import Modal from "react-bootstrap/Modal";
import CsvToHtmlTable from "./CsvToHtmlTable";

// drag drop file component
export default function DragDropFileItem({name, info, exportFile = null, saveFile = null, onRemove = null}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="file-item">
            <div className="content">
                <span style={{width: "25rem"}}>{name}</span>
                <span style={{width: "10rem"}}>{info()}</span>
                <span style={{width: "8rem", textAlign: "right"}} className="buttons">
                   { exportFile ? <button className="view-btn" onClick={handleShow}><FontAwesomeIcon icon={faEye}/></button> : "" }
                   { saveFile ? <button className="download-btn" onClick={saveFile}><FontAwesomeIcon icon={faDownload}/></button> : "" }
                   { onRemove ? <button className="trash-btn" onClick={onRemove}><FontAwesomeIcon icon={faTrash}/></button> : "" }
                </span>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CsvToHtmlTable data={exportFile()} />
                </Modal.Body>
            </Modal>
       </div>
    );
}
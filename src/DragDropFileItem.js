import React from "react";
import {faTrash, faDownload, faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// drag drop file component
export default function DragDropFileItem({name, info, onView = null, saveAs = null, onRemove = null}) {
    return (
        <div className="file-item">
            <div className="content">
                <span style={{width: "25rem"}}>{name}</span>
                <span style={{width: "10rem"}}>{info()}</span>
                <span style={{width: "8rem", textAlign: "right"}} className="btn">
                   { onView ? <button className="view-btn" onClick={onView}><FontAwesomeIcon icon={faEye}/></button> : "" }
                   { saveAs ? <button className="download-btn" onClick={saveAs}><FontAwesomeIcon icon={faDownload}/></button> : "" }
                   { onRemove ? <button className="trash-btn" onClick={onRemove}><FontAwesomeIcon icon={faTrash}/></button> : "" }
                </span>
            </div>
       </div>
    );
}
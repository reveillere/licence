import React from "react";
import DragDropFileItem from "./DragDropFileItem"
import {exportFile, fileNameChangeExtension, saveFile} from "./lib";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileZipper} from "@fortawesome/free-solid-svg-icons";

export default function DragDropFileItemList({
        items = [],
        emptyLabel = "Aucun fichier sélectionné",
        onRemoveFile = f => f,
        fileInfo = f => null,
        exportType,
        ...args
    }) {

    if (!items.length) return <div className="drop-label">{emptyLabel}</div>

    function createZipFile(items) {
        const zip = new JSZip();
        items.forEach(file => {
            const output = exportFile(file, exportType);
            zip.file(fileNameChangeExtension(file.fd.name, exportType), output);
        });
        zip.generateAsync({type: "blob"}).then(content => saveAs(content, "UE_redoublants.zip"));
    }

    function getZip(items) {
        return (
            <button type="button" className="btn btn-primary float-end" onClick={() => createZipFile(items)}>Tout télécharger <FontAwesomeIcon icon={faFileZipper} /></button>
        )
    }


        return (
        <div className="drop-label">
            {items.map( (file) => (
                <DragDropFileItem
                    key={file.id}
                    name={file.fd.name}
                    onRemove={() => onRemoveFile(file.id)}
                    exportFile={() => exportFile(file, exportType)}
                    saveFile={() => saveFile(file, exportType)}
                    info={() => fileInfo(file)}
                    {...args}
                />
            ))}
            {items.length > 1 ? getZip(items) : ""}
        </div>
    );
}
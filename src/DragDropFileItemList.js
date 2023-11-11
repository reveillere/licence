import React from "react";
import DragDropFileItem from "./DragDropFileItem"
import {exportFile, exportData, fileNameChangeExtension, saveFile} from "./lib";
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileZipper} from "@fortawesome/free-solid-svg-icons";
import exportFromJSON from 'export-from-json'


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

    async function  createMergedFile(items) {
        const content = [].concat(...items.map(file => file.opt));
        // console.log(data);
        const fileName = fileNameChangeExtension("Fusion", exportType);
        const data = await exportData(content, exportType);
        const blob = new Blob([data], {type: "text/csv;charset=utf-8"});
        saveAs(blob, fileName);
    }

    function getZip(items) {
        return (
            // <button type="button" className="btn btn-primary float-end" onClick={() => createZipFile(items)}>Zip <FontAwesomeIcon icon={faFileZipper} /></button>
            <button type="button" className="btn btn-primary float-end" onClick={() => createMergedFile(items)}>Fichier unique <FontAwesomeIcon icon={faFileZipper} /></button>
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
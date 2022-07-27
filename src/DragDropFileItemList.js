import React from "react";
import DragDropFileItem from "./DragDropFileItem"

export default function DragDropFileItemList({
        items = [],
        emptyLabel = "Aucun fichier sélectionné",
        onRemoveFile = f => f,
        fileInfo = f => null,
        saveFile,
        viewFile,
        ...args
    }) {

    if (!items.length) return <div className="drop-label">{emptyLabel}</div>

    return (
        <div className="drop-label">
            {items.map( (file) => (
                <DragDropFileItem
                    key={file.id}
                    name={file.file.name}
                    onRemove={() => onRemoveFile(file.id)}
                    onView={viewFile ? () => viewFile(file) : null}
                    saveAs={saveFile ? () => saveFile(file) : null}
                    info={() => fileInfo(file)}
                    {...args}
                />
            ))}
        </div>
    );
}
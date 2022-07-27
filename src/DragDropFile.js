import React from "react";
import DragDropInputFile from "./DragDropInputFile";
import DragDropFileItemList from "./DragDropFileItemList";
import { v4 } from "uuid";

export default function DragDropFile({ files, setFiles, processFile = f => null, ...args} ) {

    const handleFiles = async items => {
        const newFiles = await Promise.all([...items].map(async f => {
            const data = await processFile(f);
            return {id: v4(), file: f, data: data};
        }));
        setFiles(newFiles);
    }

    return (
        <>
        <DragDropInputFile {...args} handleFiles={handleFiles}></DragDropInputFile>
        <DragDropFileItemList
            items = {files}
            onRemoveFile = { id => {
                const newFiles = files.filter(file => file.id !== id);
                setFiles(newFiles);
            }}
            {...args}
        />
        </>
    )
}

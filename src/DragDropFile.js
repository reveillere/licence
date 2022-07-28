import React from "react";
import DragDropInputFile from "./DragDropInputFile";
import DragDropFileItemList from "./DragDropFileItemList";
import { v4 } from "uuid";

export default function DragDropFile({ files, setFiles, readFile, processFile = f => null, ...args} ) {

    const handleFiles = async items => {
        const newFiles = await Promise.all([...items].map(async f => {
            const content = await readFile(f);
            const opt = await processFile(content);
            return {id: v4(), fd: f, content, opt};
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

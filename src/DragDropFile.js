import React from "react";
import DragDropInputFile from "./DragDropInputFile";
import DragDropFileItemList from "./DragDropFileItemList";
import { v4 } from "uuid";
import exportFromJSON from "export-from-json";

export default function DragDropFile({
        exportType = exportFromJSON.types.csv,
        append = false,
        files, setFiles, readFile, processFile = f => null, ...args} ) {

    const handleFiles = async items => {
        const newFiles = await Promise.all([...items].map(async f => {
            const content = await readFile(f);
            const opt = await processFile(content);
            return {id: v4(), fd: f, content, opt};
        }));
        if (append)
            setFiles([...files, ...newFiles]);
        else
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
            exportType = {exportType}
            {...args}
        />
        </>
    )
}

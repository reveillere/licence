import {XMLParser} from "fast-xml-parser";
import { saveAs } from 'file-saver';
import exportFromJSON from 'export-from-json'

export function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
            resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsText(file);
    })
}


export async function parse(file) {
    const promise = await new Promise((resolve, reject) => {
        const parser = new XMLParser.XMLParser();

        parser.parse(file, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
    return promise;
}

export const readXMLFile = async file => {
    const text = await readFileAsync(file);
    const parser = new XMLParser();
    const data = parser.parse(text);
    return data;
}

export const exportFile = (file, exportType) => {
    const data = file.opt;
    const processor = f => f;
    return exportFromJSON({ data, exportType, processor });
}

export const fileNameChangeExtension = (fileName, ext) => fileName.replace(/\.[^/.]+$/, "."+ext)

export const saveFile = async (file, exportType) => {
    const fileName = fileNameChangeExtension(file.fd.name, exportType);
    const data = await exportFile(file, exportType);
    const blob = new Blob([data], {type: "text/csv;charset=utf-8"});
    saveAs(blob, fileName);
}

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

export const saveJSON = json => {
    console.log('save as');
    return saveAs(new Blob([JSON.stringify(json, null, 2)], {type: "application/json"}), Date.now());
}

export const saveAsXlsx = data => {
    const fileName = 'testme';
    const exportType =  exportFromJSON.types.csv
    return exportFromJSON({ json, fileName, exportType });
}

export const readXMLFile = async file => {
    const text = await readFileAsync(file);
    const parser = new XMLParser();
    const data = parser.parse(text);
    return data;
}
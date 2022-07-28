import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

import DragDropFile from "./DragDropFile";
import {readXMLFile} from "./lib";
import exportFromJSON from "export-from-json";


export default function App() {
    const [etapeFiles, setEtapeFiles] = useState([]);
    const [ues, setUEs] = useState([]);

    const processEtape = xmlData => {
        const students = xmlData.EEDIER10.LIST_G_CGE.G_CGE.LIST_G_ETP.G_ETP.LIST_G_IAE.G_IAE;
        const repeating = students
            .filter(student => student.NBR_INS_ETP > 1)
            .map(student => ({
                id: student.COD_ETU,
                lastname: student.UPPER_IND_LIB_NOM_PAT_IND_DECO,
                firstname: student.INITCAP_IND_LIB_PR1_IND_
            }));
        return repeating;
    }

    const processUE = xmlData => {
        const repeating = etapeFiles[0].opt.map(student => student.id);
        const students = xmlData.ERCS2R10.LIST_G_TRI.G_TRI.LIST_G_RES.G_RES.LIST_G_RES_IND.G_RES_IND;
        const repeatingADM = students.filter(student => repeating.includes(student.COD_ETU) && student.COD_TRE === 'ADM');
        return repeatingADM.map(student => ({
            id: student.COD_ETU,
            lastname: student.LIB_NOM_PAT_IND,
            firstname: student.LIB_PR1_IND
        }));
    }

    const viewFile = file => {
        const exportType =  exportFromJSON.types.xls
        const data = file.opt;
        const processor = f => f;
        const output = exportFromJSON({ data, exportType, processor });
        return output;
    }

    const info = file => {
        const nb = file.opt.length;
        if (file.opt)
            return (`${nb} étudiant`) + (nb > 1 ? "s" : "") ;
    }

    return (
        <div className="App">
            <h1>Gestion des redoublants</h1>
            <h2>Extraction des redoublants</h2>
            <DragDropFile
                files={etapeFiles}
                setFiles={setEtapeFiles}
                types={["xml"]}
                multiple={false}
                fileInfo={info}
                saveFile={async file => {
                    const fileName = file.content.EEDIER10.LIST_G_CGE.G_CGE.LIST_G_ETP.G_ETP.COD_ETP;
                    const exportType =  exportFromJSON.types.csv
                    const data = file.opt;
                    return exportFromJSON({ data, fileName, exportType });
                }}
                viewFile={viewFile}
                readFile={async file => await readXMLFile(file)}
                processFile={processEtape}
            />
            <div style={ {marginTop: "5rem"}}>
            { etapeFiles.length === 1 ?
                <>
                <h2>Listes des UEs</h2>
                <DragDropFile
                    files={ues}
                    setFiles={setUEs}
                    types={["xml"]}
                    multiple={true}
                    fileInfo={info}
                    viewFile={viewFile}
                    saveFile={async file => {
                        const fileName = file.content.ERCS2R10.LIST_G_TRI.G_TRI.LIST_G_RES.G_RES.COD_RES;
                        const exportType =  exportFromJSON.types.csv
                        const data = file.opt;
                        return exportFromJSON({ data, fileName, exportType });
                    }}
                    readFile={async file => await readXMLFile(file)}
                    processFile={processUE}
                />
                </> : "" }
            </div>
        </div>
    );
}
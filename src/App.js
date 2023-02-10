import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";

import DragDropFile from "./DragDropFile";
import {exportFile, readXMLFile} from "./lib";

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
                firstname: student.INITCAP_IND_LIB_PR1_IND_,
                etape: student.NBR_INS_ETP
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
            firstname: student.LIB_PR1_IND,
            note: student.NOT_RES
        }));
    }


    const info = file => {
        const nb = file.opt.length;
        if (file.opt)
            return (`${nb} étudiant`) + (nb > 1 ? "s" : "") ;
    }

    useEffect(() => {
        document.title = "Gestion des redoublants";  
      }, []);

    return (
        <div className="App">
            <h1>Gestion des redoublants</h1>
            <h3 style={{marginTop: "1rem"}}>Extraction des redoublants (fichier étape)</h3>
            <DragDropFile
                files={etapeFiles}
                setFiles={setEtapeFiles}
                types={["xml"]}
                multiple={false}
                fileInfo={info}
                readFile={async file => await readXMLFile(file)}
                processFile={processEtape}
            />
            <div style={ {marginTop: "5rem"}}>
            { etapeFiles.length === 1 ?
                <>
                <h3>Listes des UEs</h3>
                <DragDropFile
                    files={ues}
                    setFiles={setUEs}
                    append={true}
                    types={["xml"]}
                    multiple={true}
                    fileInfo={info}
                    readFile={async file => await readXMLFile(file)}
                    processFile={processUE}
                />
                </> : "" }
            </div>
        </div>
    );
}
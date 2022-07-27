import React from "react";
import {faCloudUpload} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// drag drop file component
export default function DragDropInputFile(
    {
        types = [],
        multiple = true,
        label = <FontAwesomeIcon icon={faCloudUpload} size="2x" color="rgb(79, 79, 79)"/>,
        labelUpload = multiple ? "Glisser-déposer vos fichiers ici ou cliquer" : "Glisser-déposer un fichier ici ou cliquer",
        handleFiles
    }) {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function(e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

// triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    const onInputClick = (event) => {
        event.target.value = ''
    }


    const acceptedExt = (types) => {
        return types.map((type) => `.${type.toLowerCase()}`).join(',');
    };

    return (
        <form className="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} type="file" accept={acceptedExt(types)} disabled={false} id="input-file-upload" multiple={multiple} onClick={onInputClick} onChange={handleChange} />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                <div>
                    <div>{label}</div>
                    <button className="upload-button" onClick={onButtonClick}>{labelUpload}</button>
                </div>
            </label>
            { dragActive && <div className="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
        </form>
    );
};
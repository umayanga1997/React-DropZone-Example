import { MdFileUpload, MdDelete } from "react-icons/md";
import { IoMdDocument } from "react-icons/io";
import { RiArrowRightCircleFill } from "react-icons/ri";
import "../Components/File_Uploader.css";

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { uploadFile } from "../Utils/File_Upload";

function FileUploader() {
  const [file, setFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    // validator: validation,
  });

  function removeFile() {
    setFile(null);
  }

  return (
    <div className="upload-container">
      <h2>Upload an official document</h2>
      <p>Upload any one of the following documents :</p>

      <ul className="list-of-doc">
        <li>
          <RiArrowRightCircleFill size={15} />
          Salary certificate
        </li>
        <li style={{ margin: "4px 0px" }}>
          <RiArrowRightCircleFill size={15} />
          Employee visa
        </li>
        <li>
          <RiArrowRightCircleFill size={15} />
          Bank Statement
        </li>
      </ul>

      <div
        className={isDragActive ? "drop-box active-drop" : "drop-box"}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <IoMdDocument size={40} className="doc-icon" />
        <p>{file !== null ? file.name : "Drop your file here"}</p>
        <span className="msg-text">
          {file !== null
            ? (file.size / 1000).toFixed(2) + " KB"
            : "Supported file formats: PDF/JPEG/JPG"}
        </span>
        <div className="upload-btn" onClick={file !== null ? removeFile : open}>
          {file !== null ? <MdDelete size={16} /> : <MdFileUpload size={16} />}
          <span>{file !== null ? "Delete" : "Upload"}</span>
        </div>
      </div>

      <div className="proced-section">
        <button
          className={file == null ? "proced-btn  disable" : "proced-btn"}
          disabled={file == null}
          onClick={uploadFile}
        >
          Proced
        </button>
        <button className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
}

export default FileUploader;

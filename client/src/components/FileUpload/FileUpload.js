import React, { useState } from "react";
import axios from "axios";
import styles from "./FileUpload.module.css";
import { BASE_URL } from "../../constants";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
    setError("");
  };
  const onFileUpload = async () => {
    try {
      let url = "api/upload";
      if (selectedFile) {
        setError("");
        const formData = new FormData();
        formData.append("file", selectedFile);
        if (selectedFile.name.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
          url = "api/imageupload";
        }
        const resp = await axios.post(`${BASE_URL}${url}`, formData);
        setMessage(resp?.data?.message);
        setTimeout(() => {
          setMessage("");
        }, 4000);
        setSelectedFile(null);
      } else {
        throw new Error("No file chosen");
      }
    } catch (error) {
      setError(error?.message);
    }
  };
  return (
    <div>
      <h3>FILE UPLOAD</h3>
      <div>
        {/* <input type="file" name="file" id="file" className={styles.inputfile} />
        <label for="file">Choose a file</label> */}
        <div className={styles.uploadBtnWrapper}>
          <button className={styles.btn} onClick={onFileUpload}>
            Upload a file
          </button>
          <input type="file" name="myfile" onChange={onFileChange} />
        </div>
      </div>
      <div>
        {/* <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload</button> */}
        {selectedFile && (
          <div>
            <h1>File Name:</h1>
            <p>{selectedFile?.name}</p>
            <h1>File Type:</h1>
            <p>{selectedFile?.type}</p>
            <h1>File Size:</h1>
            <p>{selectedFile?.size}</p>
          </div>
        )}
      </div>
      <h2 className={styles.red}>{error}</h2>
      <h2 className={styles.green}>{message}</h2>
    </div>
  );
};

export default FileUpload;

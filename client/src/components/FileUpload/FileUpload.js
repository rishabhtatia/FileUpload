import React, { useState } from "react";
import axios from "axios";
import RotateLoader from "react-spinners/RotateLoader";
import "./FileUpload.scss";
import { BASE_URL } from "../../constants";
import Table from "../Table/Table";

const FileUpload = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tableReload, setTableReload] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
    setError("");
  };
  const onFileUpload = async () => {
    setIsSubmitLoading(true);
    try {
      if (selectedFile) {
        setError("");
        const formData = new FormData();
        formData.append("file", selectedFile);
        const resp = await axios.post(`${BASE_URL}api/uploadcsv`, formData);
        setMessage(resp?.data?.message);
        setTableReload(resp?.data?.message);
        setTimeout(() => {
          setMessage("");
        }, 4000);
        setSelectedFile(null);
      } else {
        throw new Error("No file chosen");
      }
    } catch (error) {
      setError(error?.message);
    } finally {
      setIsSubmitLoading(false);
    }
  };
  return (
    <div>
      <h1>FILE UPLOAD</h1>
      <div className="container">
        <div className="uploadBtnWrapper">
          <button className="btn">Select a file</button>
          <input type="file" name="myfile" onChange={onFileChange} />
        </div>
        <div>
          {isSubmitLoading ? (
            <RotateLoader color="black" loading={true} size={15} />
          ) : (
            <button className="btn" onClick={onFileUpload}>
              Upload
            </button>
          )}
        </div>
      </div>
      <div>
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
      <h2 className="red">{error}</h2>
      <h2 className="green">{message}</h2>
      <Table tableReload={tableReload} />
    </div>
  );
};

export default FileUpload;

import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const onFileChange = event => {
    setSelectedFile(event.target.files[0]);
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
        const resp = await axios.post(`http://localhost:8080/${url}`, formData);
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
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload</button>
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
      <h2 style={{ color: "red" }}>{error}</h2>
      <h2 style={{ color: "green" }}>{message}</h2>
    </div>
  );
};

export default FileUpload;

import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("upload-file", selectedFile);
      const resp = await axios.get("http://localhost:8080/api/upload");
      console.log(resp);
    } else {
      setError("No file chosen");
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
    </div>
  );
};

export default FileUpload;

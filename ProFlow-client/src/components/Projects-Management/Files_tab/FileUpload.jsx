import React from "react";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
const FileUpload = ({ selectedFiles, setSelectedFiles,projectId }) => {
  const handleFileChange = async(e) => {
    const files = Array.from(e.target.files);
    for (let file of files) {
    const formData = new FormData();
    formData.append("file", file);
  

    try {
      const res = await axios.post(`http://localhost:5000/project/upload?projectId=${projectId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Uploaded:", res.data);
        setSelectedFiles((prev) => [...prev, res.data.file]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  }

  };
  return (
    <div className="flex justify-end mb-4">
      <label className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition">
        <FiUploadCloud className="mr-2" /> Upload Files
        <input
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileUpload;

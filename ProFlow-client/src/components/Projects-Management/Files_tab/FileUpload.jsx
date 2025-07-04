import React from "react";
import { FiUploadCloud } from "react-icons/fi";

const FileUpload = ({ selectedFiles, setSelectedFiles }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
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

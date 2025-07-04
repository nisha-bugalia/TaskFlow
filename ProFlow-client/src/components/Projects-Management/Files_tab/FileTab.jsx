import React from "react";
import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import FileUpload from "./FileUpload";
import FileCard from "./FileCard";
import FilePreviewModal from "./FilePreviewModal";

const FilesTab = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewedFile, setPreviewedFile] = useState(null);
  const [fileTypeFilter, setFileTypeFilter] = useState("All");

  const filteredFiles = selectedFiles.filter((file) => {
    const type = file.type;

    if (fileTypeFilter === "All") return true;

    if (fileTypeFilter === "PDF") return type === "application/pdf";

    if (fileTypeFilter === "Image") return type.startsWith("image/");

    if (fileTypeFilter === "Doc")
      return (
        type === "application/msword" ||
        type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );

    if (fileTypeFilter === "Text") return type === "text/plain";

    if (fileTypeFilter === "Code") {
      const ext = file.name.split(".").pop();
      return [
        "js",
        "ts",
        "py",
        "html",
        "css",
        "json",
        "cpp",
        "c",
        "java",
      ].includes(ext);
    }

    return true;
  });

  return (
    <div className="p-6 bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FiFileText /> Project Files
        </h2>
        <FileUpload
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
        />
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {["All", "PDF", "Image", "Doc", "Text", "Code"].map((type) => (
            <button
              key={type}
              onClick={() => setFileTypeFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition 
        ${
          fileTypeFilter === type
            ? "bg-purple-600 text-white shadow-sm"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {filteredFiles.map((file, index) => (
          <FileCard
            key={index}
            file={file}
            onClick={() => setPreviewedFile(file)}
            onRemove={() => {
              setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
            }}
          />
        ))}
      </div>
      {previewedFile && (
        <FilePreviewModal
          file={previewedFile}
          onClose={() => setPreviewedFile(null)}
        />
      )}
    </div>
  );
};

export default FilesTab;

import React from "react";
import { FiFile, FiX } from "react-icons/fi";

const FileCard = ({ file, onClick, onRemove }) => {
  console.log(file.fileUrl)
  const getFileIcon = (type) => {
    if (type.startsWith("image/"))
      return (
       <img
        src={`http://localhost:5000${file.fileUrl}`}
        alt={file.fileName}
        className="h-24 w-full object-cover rounded"
      />
      );
    return <FiFile className="text-4xl text-purple-600" />;
  };

  return (
    <div className="relative p-3 bg-gray-100 dark:bg-gray-800 rounded-lg shadow hover:shadow-md hover:scale-[1.02] transition-all duration-200">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 bg-white dark:bg-gray-900 text-gray-500 hover:text-red-600 rounded-full p-1 shadow"
      >
        <FiX size={16} />
      </button>

      <div
        onClick={onClick}
        className="mb-2 h-24 flex justify-center items-center overflow-hidden rounded"
      >
        {getFileIcon(file.type)}
      </div>

      <div className="text-sm truncate text-center dark:text-white">
        {file.fileName}
      </div>
    </div>
  );
};

export default FileCard;

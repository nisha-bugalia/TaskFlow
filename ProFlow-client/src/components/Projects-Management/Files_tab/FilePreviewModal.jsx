import React from "react";
import { Dialog } from "@headlessui/react";
import { FiDownload, FiX } from "react-icons/fi";

const FilePreviewModal = ({ file, onClose }) => {
  if (!file) return null;
  console.log("File previewed");

  const fileURL = URL.createObjectURL(file);

  const isImage = file.type.startsWith("image/");

  const formatSize = (bytes) =>
    bytes < 1024
      ? `${bytes} B`
      : bytes < 1024 * 1024
        ? `${(bytes / 1024).toFixed(1)} KB`
        : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

      <div className="bg-white dark:bg-gray-900 max-w-md w-full p-6 rounded-lg z-50 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black dark:hover:text-white"
        >
          <FiX size={20} />
        </button>

        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
          File Preview
        </h3>

        <div className="mb-4 text-center">
          {isImage ? (
            <img
              src={fileURL}
              alt={file.name}
              className="max-h-64 w-auto mx-auto rounded"
            />
          ) : file.type === "application/pdf" || file.type === "text/plain" ? (
            <iframe
              src={fileURL}
              title="File Preview"
              className="w-full h-64 rounded border"
            ></iframe>
          ) : (
            <div className="text-sm text-gray-600 dark:text-gray-300 italic">
              Preview not available for this file type.
            </div>
          )}
        </div>

        <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          <p>
            <strong>Name:</strong> {file.name}
          </p>
          <p>
            <strong>Size:</strong> {formatSize(file.size)}
          </p>
          <p>
            <strong>Type:</strong> {file.type || "Unknown"}
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <a
            href={fileURL}
            download={file.name}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
          >
            <FiDownload />
            Download
          </a>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default FilePreviewModal;

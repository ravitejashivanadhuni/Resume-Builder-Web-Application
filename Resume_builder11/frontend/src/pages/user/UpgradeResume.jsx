import React, { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { FaCloudUploadAlt, FaEdit } from "react-icons/fa";

const SERVER_URL = "http://localhost:9000";

const UpgradeResume = () => {
  const [fileId, setFileId] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const validateFile = (file) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      handleFileUpload(file);
    }
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${SERVER_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setFileId(data.fileId);
      console.log("File Uploaded:", data);
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Resume Editor</h1>
        <p className="text-gray-600 mt-2">
          Upload your resume, edit content, and download in multiple formats.
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="max-w-xl mx-auto">
          <div
            className={`flex flex-col items-center justify-center border-2 border-dashed ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } rounded-lg p-8 hover:border-blue-500 transition-colors`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt className="text-5xl text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Upload Your Resume</h2>
            <p className="text-gray-500 mb-4">
              Drag and drop your file here or click to browse
            </p>
            <p className="text-gray-500 mb-4">
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
            <label className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <FaEdit className="mr-2" />
              Choose File
            </label>
          </div>
        </div>
      </div>

      {fileId && (
        <div className="mt-4 w-full max-w-screen-xl h-screen border rounded-lg shadow-lg">
          <iframe
            src={`https://docs.google.com/document/d/${fileId}/edit`}
            title="Google Docs Editor"
            className="w-full h-full"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default UpgradeResume;

import React, { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupColor, setPopupColor] = useState(""); // Used to style the popup

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file in state
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setPopupMessage("Please select a file to upload.");
      setPopupColor("red");
      return;
    }

    setIsUploading(true);

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        setPopupMessage("File uploaded successfully!");
        setPopupColor("green");
        window.location.reload();
      } else {
        setPopupMessage("Something went wrong.");
        setPopupColor("red");
      }
    } catch (error) {
      setPopupMessage("An error occurred while uploading.");
      setPopupColor("red");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex justify-end mb-4 mr-8 mt-8 space-x-4">
      {/* Styled button that opens file selector */}
      <label
        htmlFor="file-input"
        className="relative text-white items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group cursor-pointer"
      >
        <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
        <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
          <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
          <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
        </span>
        <span className="relative text-white">Select File</span>
      </label>

      <input
        type="file"
        id="file-input"
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="relative text-white items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
      >
        <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
        <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
          <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
          <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
        </span>
        <span className="relative text-white"> Upload File</span>
      </button>

      {/* Popup for feedback */}
      {popupMessage && (
        <div
          style={{
            color: popupColor,
            padding: "10px",
            border: `2px solid ${popupColor}`,
          }}
        >
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

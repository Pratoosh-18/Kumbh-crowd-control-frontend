import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const VideoUpload = () => {
  const { fetchCustomUploadFileList } = useAppContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await response.json();
        await fetchCustomUploadFileList();
        setUploadMessage("Upload successful");
      } else {
        await response.json();
        setUploadMessage("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("Something went wrong while uploading the file.");
    }
  };

  return (
    <div className="md:flex">
      <div className="mb-3 md:mb-0 flex w-full justify-center">
        <input type="file" accept="video/*" onChange={handleFileChange} />
      </div>
      <div className="flex w-full justify-center">
        <button
          onClick={handleUpload}
          className="px-4 border-2 border-black rounded-md"
        >
          Upload
        </button>
        <p className="text-xs">{uploadMessage}</p>
      </div>
    </div>
  );
};

export default VideoUpload;
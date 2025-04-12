import React, { useState } from "react";
import { LiaImage } from "react-icons/lia";

export default function ImageUpload2({
  handleFileChange,
  uploadedFiles,
}: {
  handleFileChange: (files: File[]) => void;
  uploadedFiles: File[] | null;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files); // Convert FileList to Array
      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]); // Append new files to previous ones
      handleFileChange([...selectedFiles, ...filesArray]); // Pass updated files to parent
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger the hidden file input
  };

  return (
    <div onClick={handleButtonClick} className="flex cursor-pointer">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
        style={{ display: "none" }} // Hide the input
      />
      <div className="text-center mt-12">
        <LiaImage
          size={54}
          fill="#9c27b0"
          fillOpacity={0.3}
          className="m-auto"
        />
        <h2 className="text-xs text-ash w-1/2 mx-auto">
          {selectedFiles[0] ? (
            <div>{selectedFiles[0].name}</div>
          ) : (
            <>
              <span className="hidden md:block">Drag & Drop or</span>
              <span className="cursor-pointer text-ash hover:text-white">
                Choose File
              </span>{" "}
              to upload
            </>
          )}
        </h2>
      </div>
    </div>
  );
}

import React, { useState } from "react";

export default function ImageUpload({
  handleFileChange,
}: {
  handleFileChange: (files: File[]) => void;
}) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [divHovered, setDivHovered] = useState<boolean>(false);

  // const [uploadImage, { isLoading, isSuccess, isError }] =
  //   useUploadImageMutation();

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
    <div className="flex">
      <input
        type="file"
        ref={fileInputRef}
        multiple
        onChange={onFileChange}
        accept="image/*" // Restrict to image files
        style={{ display: "none" }} // Hide the input
      />
      <div className="w-max mx-auto text-center ">
        <h2 className=" max-w-52 text-ash">
          Drag & Drop or{" "}
          <span
            onClick={() => handleButtonClick()}
            className="cursor-pointer text-ash hover:text-white"
          >
            Choose File
          </span>{" "}
          to upload
        </h2>
        {/* <div className="content-center border border-ash  cursor-pointer">
          <motion.h2
            whileTap={{ scale: 1.1 }}
            whileHover={{
              backgroundColor: "white",
              color: "black",
              x: 8,
              y: 8,
            }}
            className="text-ash p-4 hover:text-white h-full content-center"
          >
            Upload
          </motion.h2>
        </div> */}
      </div>
      {/* {isSuccess && <p>Files uploaded successfully!</p>}
      {isError && <p>There was an error uploading files.</p>} */}
      <div>
        {/* <ul>
          {selectedFiles.map((file, index) => (
            <img key={index} src={file.name} alt="my-image" />
          ))}
        </ul> */}
      </div>
    </div>
  );
}

import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";

export default function FileUpload({
  setUploadedFiles,
  uploadedFiles,
}: {
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  uploadedFiles: File[];
}) {
  const [divHovered, setDivHovered] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles((prev) => [...prev, ...acceptedFiles]); // append new previews
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
    maxFiles: 5,
  });

  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-2 block">
        Upload Logos
      </label>
      <motion.div
        className="rounded-xl"
        onHoverStart={() => setDivHovered(true)}
        onHoverEnd={() => setDivHovered(false)}
        whileHover={{ borderColor: "#4f46e5", boxShadow: "0 0 10px #4f46e5" }}
      >
        <div
          {...getRootProps()}
          className={`
    p-6 text-center cursor-pointer w-full  rounded-xl
    transition-colors border-transparent  duration-700 ease-in-out

    ${isDragActive ? "border-[#4f46e5]/50  border-2 border-dashed" : ""}
  `}
        >
          <input {...getInputProps()} multiple />
          {isDragActive ? (
            <p className="text-[#4f46e5]">Drop the logos here...</p>
          ) : (
            <p
              className={`text-gray-800 duration-500 transition-all hover:text-[#4f46e5] w-max mx-auto ${
                divHovered ? "text-[#4f46e5]/70" : ""
              }`}
            >
              <span
                className={`text-gray-600 ${divHovered ? "text-white" : ""}`}
              >
                Drag & drop
              </span>{" "}
              or click to upload
            </p>
          )}
        </div>
      </motion.div>

      {/* Preview multiple images */}
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-4">
          {uploadedFiles.map((previewUrl, index) => (
            <li>{previewUrl.name}</li>
          ))}
        </div>
      )}
    </div>
  );
}

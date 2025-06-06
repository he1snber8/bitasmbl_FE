import MediaUploadSection2 from "src/sections/MediaUploadSection2";
import React, { useState } from "react";
import { motion } from "framer-motion";
import FileUpload from "../../FileUpload";
// import FileUpload from "../FileUpload";

export default function ProjectImagesUpload({
  handleBack,
  handleNext,
  setUploadedFiles,
  uploadedFiles,
}: {
  handleBack: () => void;
  handleNext: () => void;
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
  uploadedFiles: File[];
}) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col flex-wrap w-1/2 max-w-2xl  gap-2  mx-auto">
        <div className="mt-6">
          {/* <MediaUploadSection2
            uploadedFiles={uploadedFiles}
            handleFileChange={setUploadedFiles}
          /> */}
          <FileUpload
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </div>
        <div className="flex justify-end gap-4  w-full">
          <h1 className="p-4 cursor-pointer" onClick={() => handleBack()}>
            Back
          </h1>
          <motion.h1
            initial={{ opacity: 0, y: 11 }}
            animate={{
              opacity: uploadedFiles.length > 0 ? 1 : 0,
              y: uploadedFiles.length > 0 ? 0 : 11,
            }}
            transition={{ duration: 0.3 }}
            className="self-end p-4 cursor-pointer"
            style={{
              pointerEvents: uploadedFiles.length > 0 ? "auto" : "none",
            }}
            onClick={() => handleNext()}
          >
            Next
          </motion.h1>
        </div>
      </div>
    </div>
  );
}

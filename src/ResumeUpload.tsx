"use client";

import { motion } from "framer-motion";

import { ArrowLeft, ArrowRight } from "lucide-react";
import FileUpload from "./components/FileUpload";
import { Button } from "@material-tailwind/react";

type ResumeUploadStepProps = {
  handleBack: () => void;
  handleNext: () => void;
  uploadedFiles: File[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

export default function ResumeUploadStep({
  handleBack,
  handleNext,
  uploadedFiles,
  setUploadedFiles,
}: ResumeUploadStepProps) {
  const hasFiles = uploadedFiles.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center px-6 py-12 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-semibold mb-3">
        Upload Your Resume or Portfolio
      </h2>
      <p className="text-muted-foreground mb-8">
        PDF format only. This helps others understand your background and skills
        better.
      </p>

      <div className="w-full mb-8">
        <FileUpload
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>

      <div className="flex justify-between w-full mt-4">
        {/* <motion.button
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleBack}
          className=" text-white hover:text-indigo-500"
        >
          Back
        </motion.button> */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          animate={{ opacity: hasFiles ? 1 : 0, y: hasFiles ? 0 : 10 }}
          style={{ pointerEvents: hasFiles ? "auto" : "none" }}
          onClick={handleNext}
          className=" text-white float-right border w-full hover:text-indigo-500"
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
}

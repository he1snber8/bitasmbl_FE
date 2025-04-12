import { RiDeleteBin6Line } from "react-icons/ri";
import ImageUpload from "../components/ImageUpload";
import { motion } from "framer-motion";

interface MediaUploadProps {
  uploadedFiles: File[];
  handleFileChange(files: File[]): void;
}

export function MediaUploadSection({
  uploadedFiles,
  handleFileChange,
}: MediaUploadProps) {
  return (
    <div className="flex justify-between w-full">
      <div className="flex flex-col w-1/2">
        <h1 className="text-xl mb-4">
          Media <span className="text-concrete text-sm">optional</span>
        </h1>
        <h3 className=" text-ash mr-16">
          Make your project stand out by uploading relevant imagery or perhaps
          pdf file that further explains/demonstrates the purpose of your idea.
        </h3>
      </div>
      <div className="flex w-1/2 my-auto gap-2   min-h-40 max-h-40">
        <motion.div
          style={{ backgroundColor: "#18161b" }}
          whileHover={{
            backgroundColor: "rgb(126, 24, 145, 0.1)",
            borderColor: "#9c27b0",
          }}
          className={`${
            uploadedFiles.length > 0 ? "w-1/2" : "w-full"
          } content-center  mx-auto border-[1px] border-concrete`}
        >
          <ImageUpload handleFileChange={handleFileChange} />
        </motion.div>

        <div
          className={`${
            uploadedFiles.length > 0 ? "w-full  overflow-y-scroll" : ""
          }`}
        >
          <ul>
            {uploadedFiles.map((fileA, index) => (
              <li
                key={index}
                className="text-ash flex flex-grow  p-4 justify-between items-center "
              >
                <div className="flex items-center gap-2">
                  <img
                    className="size-12"
                    src={URL.createObjectURL(fileA)}
                    alt="file_image"
                  />
                  {fileA.name}
                </div>
                <div
                  onClick={() => {
                    //   setUploadedFiles([]);
                  }}
                  className="flex"
                >
                  Delete
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

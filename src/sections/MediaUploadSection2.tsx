import { motion } from "framer-motion";
import { LiaImage } from "react-icons/lia";
import ImageUpload from "../components/ImageUpload";
import ImageUpload2 from "../components/ImageUpload2";
import { VscFiles } from "react-icons/vsc";

interface MediaUploadProps {
  uploadedFiles: File[];
  handleFileChange(files: File[]): void;
}

export default function MediaUploadSection2({
  uploadedFiles,
  handleFileChange,
}: MediaUploadProps) {
  console.log(uploadedFiles);
  return (
    <div className="flex md:flex-row flex-col  justify-between w-full ">
      <div className="flex flex-col mx-auto mb-6 w-full md:w-1/2">
        <h1 className="text-base">
          Media <span className="text-concrete text-sm">optional</span>
        </h1>
        <h3 className="text-xs md:text-sm text-ash mr-6">
          Make your project stand out by uploading relevant imagery{" "}
          <span className="hidden md:inline">
            or perhaps pdf file that further explains/demonstrates the purpose
            of your idea.
          </span>
        </h3>
      </div>
      {/* <ImageUpload2 /> */}
      <div className="min-h-56 md:w-1/2 flex">
        <motion.div
          whileHover={{
            borderColor: "#9c27b0",
          }}
          className="bg-[#9c27b0]/20 m-1 flex border border-transparent  w-1/2"
        >
          <ImageUpload2
            uploadedFiles={uploadedFiles}
            handleFileChange={handleFileChange}
          />
          {/* {uploadedFiles[0].name} */}
        </motion.div>
        <div className="flex flex-col  w-1/2">
          <motion.div
            whileHover={{
              borderColor: "#9c27b0",
            }}
            className="border my-auto border-transparent bg-[#9c27b0]/20 h-1/3"
          >
            <div className="flex h-full cursor-pointer">
              <input
                type="file"
                // ref={fileInputRef}
                multiple
                // onChange={onFileChange}
                accept="image/*" // Restrict to image files
                style={{ display: "none" }} // Hide the input
              />
              <div className=" flex items-center justify-around  w-full">
                <h2 className="text-sm text-ash ">
                  {uploadedFiles[1] ? (
                    <div key={1}>{uploadedFiles[1].name}</div>
                  ) : (
                    <div className="flex items-center gap-4 ">
                      <VscFiles size={25} fill="#9c27b0" fillOpacity={0.3} />
                      <p className="text-[#9c27b0]/40">Upload more files</p>
                    </div>
                  )}
                </h2>
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{
              borderColor: "#9c27b0",
            }}
            className="border m-1 border-transparent bg-[#9c27b0]/20 h-1/3"
          >
            <div className="flex h-full cursor-pointer">
              <input
                type="file"
                // ref={fileInputRef}
                multiple
                // onChange={onFileChange}
                accept="image/*" // Restrict to image files
                style={{ display: "none" }} // Hide the input
              />
              <div className=" flex items-center justify-around     w-full">
                <h2 className="text-sm text-ash ">
                  {uploadedFiles[2] ? (
                    <div key={2}>{uploadedFiles[2].name}</div>
                  ) : (
                    <div className="flex items-center gap-4 ">
                      <VscFiles size={25} fill="#9c27b0" fillOpacity={0.3} />
                      <p className="text-[#9c27b0]/40">Upload more files</p>
                    </div>
                  )}
                </h2>
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{
              borderColor: "#9c27b0",
            }}
            className="border m-1 border-transparent bg-[#9c27b0]/20 h-1/3"
          >
            <div className="flex h-full cursor-pointer">
              <input
                type="file"
                // ref={fileInputRef}
                multiple
                // onChange={onFileChange}
                accept="image/*" // Restrict to image files
                style={{ display: "none" }} // Hide the input
              />
              <div className=" flex items-center justify-around     w-full">
                <h2 className="text-sm text-ash ">
                  {uploadedFiles[3] ? (
                    <div key={3}>{uploadedFiles[3].name}</div>
                  ) : (
                    <div className="flex items-center gap-4 ">
                      <VscFiles size={25} fill="#9c27b0" fillOpacity={0.3} />
                      <p className="text-[#9c27b0]/40">Upload more files</p>
                    </div>
                  )}
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

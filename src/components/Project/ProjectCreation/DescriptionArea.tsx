import { motion } from "framer-motion";
import { useState } from "react";

export default function DescriptionArea({
  handleNext,
  handleBack,
  projectDescription,
  setProjectDescription,
}: {
  handleNext: () => void;
  handleBack: () => void;
  projectDescription: string;
  setProjectDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [descriptionLimit, setDescriptionLimit] = useState<number>(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl">
          Description <span className="text-ash/50 text-sm">(required)</span>{" "}
        </h1>
        <h3 className="text-sm text-ash w-3/4">
          {" "}
          Describe your idea in a way that inspires and excites potential team
          members to join your dream project.
        </h3>
      </div>
      {/* <motion.div
        whileHover={{ borderColor: "#9c27b0" }}
        className="bg-[#18161b] relative mb-8   rounded-none text-sm md:text-base"
      > */}
      <motion.textarea
        style={{ borderColor: "#4f46e5" }}
        whileHover={{
          boxShadow: "0 0 10px #4f46e5",
        }}
        maxLength={1024}
        value={projectDescription}
        onChange={(e) => {
          setProjectDescription(e.target.value);
          setDescriptionLimit(1024 - e.target.value.length);
        }}
        className="peer bg-[#18161b] rounded-md text-ash text-sm font-sara min-h-[100px] w-full border border-concrete px-3 py-2.5 
  r placeholder-shown:border-concrete 
   focus:outline-none 
"
        placeholder=" "
      />
      {/* <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-sm font-normal leading-tight text-ash transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5  before:border-t before:border-l before:border-concrete before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:border-t after:border-r after:border-concrete after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-concrete peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent  peer-focus:leading-tight peer-focus:text-ash peer-focus:text-xs peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Max characters: {descriptionLimit}/1024
        </label> */}
      {/* </motion.div> */}

      <div className="flex justify-end gap-4  w-full">
        <h1 className="p-4 cursor-pointer" onClick={() => handleBack()}>
          Back
        </h1>
        <motion.h1
          initial={{ opacity: 0, y: 11 }}
          animate={{
            opacity: projectDescription.length > 96 ? 1 : 0,
            y: projectDescription.length > 96 ? 0 : 11,
          }}
          transition={{ duration: 0.3 }}
          className="self-end p-4 cursor-pointer"
          style={{
            pointerEvents: projectDescription.length > 96 ? "auto" : "none",
          }}
          onClick={() => handleNext()}
        >
          Next
        </motion.h1>
      </div>
    </div>
  );
}

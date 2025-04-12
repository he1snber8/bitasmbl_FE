import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function NameInput({
  handleNext,
  setProjectName,
  projectName,
}: {
  handleNext: () => void;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
  projectName: string;
}) {
  return (
    <>
      <div className="flex  flex-col gap-8 items-center mx-auto">
        <div className="flex md:flex-row flex-col gap-8">
          <div className="flex  flex-col ">
            <h1 className="text-xl">
              Name <span className="text-ash/50 text-sm">(required)</span>{" "}
            </h1>
            <h3 className="text-sm text-ash">A unique name for your project</h3>
          </div>
          <motion.div
            whileHover={{ borderColor: "#9c27b0" }}
            className="bg-[#18161b] rounded-md border border-concrete h-1/2 my-auto p-2  text-sm md:text-base"
          >
            <motion.input
              maxLength={50}
              value={projectName}
              whileHover={{
                backgroundColor: "rgb(126, 24, 145, 0.1)",
              }}
              onChange={(e) => setProjectName(e.target.value)}
              type="text"
              placeholder="Project name here"
              className={`peer
                  placeholder:text-concrete mx-auto placeholder:text-base  text-white  focus:outline-none bg-transparent`} //${projectName ? "" : "border-red-700"}
            />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 11 }}
          animate={{
            opacity: projectName.length > 6 ? 1 : 0,
            y: projectName.length > 6 ? 0 : 11,
          }}
          transition={{ duration: 0.3 }}
          className="self-end p-4 cursor-pointer"
          style={{ pointerEvents: projectName.length > 6 ? "auto" : "none" }}
          onClick={() => handleNext()}
        >
          Next
        </motion.h1>
      </div>
    </>
  );
}

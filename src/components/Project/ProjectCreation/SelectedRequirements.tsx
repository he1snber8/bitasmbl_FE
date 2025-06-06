import { ProjectRequirement } from "src/interfaces/projects/projectTypes";
import { motion } from "framer-motion";
import { LiaMinusSolid, LiaPlusSolid } from "react-icons/lia";
import { useAlterRequirements } from "src/hooks/useAlterRequirements";
import { useGetProjectRequirementTestQuery } from "src/api/ProjectsApi";
import { Switch, Tooltip } from "@material-tailwind/react";
import { useState } from "react";

export default function SelectedRequirements({
  selectedRequirements,
  setSelectedRequirements,
  handleBack,
  handleNext,
}: // handleIncrement,
// handleDecrement,
{
  selectedRequirements: ProjectRequirement[];
  setSelectedRequirements: React.Dispatch<
    React.SetStateAction<ProjectRequirement[]>
  >;
  handleBack: () => void;
  handleNext: () => void;
  // handleIncrement: (requirementId: number) => void;
  // handleDecrement: (requirementId: number) => void;
}) {
  // const enableRequirementTest = (requirementId: number) => {
  //   setSelectedRequirements((prevRequirements) =>
  //     prevRequirements.map((sr) =>
  //       sr.requirementId === requirementId
  //         ? { ...sr, isTestEnabled: true } // Update the field
  //         : sr
  //     )
  //   );
  // };

  return (
    <div className="flex  flex-col ">
      <div className="flex  max-w-xl min-w-36 mx-auto flex-wrap gap-2 ">
        {selectedRequirements.map((requirement, index) => (
          <motion.div
            whileTap={{ scale: 1 }}
            key={index}
            className="content-center  flex items-center rounded-none h-max px-2 py-[4px] bg-[
           border-[#9c27b0] gap-1 cursor-pointer  border"
          >
            {/* <p className="font-thin text-sm md:text-base">{requirement.name}</p> */}
            <motion.div
              whileHover={{ backgroundColor: "#1B0127" }}
              whileTap={{ y: 2 }}
            >
              <LiaPlusSolid
                // onClick={(e) => {
                //   e.stopPropagation(); // Prevent triggering the li click event
                //   if (requirement.requirementId !== undefined) {
                //     handleIncrement(requirement.requirementId);
                //   }
                // }}
                className="size-3 md:size-4  cursor-pointer m-1"
              />
            </motion.div>
            {/* <p className="font-thin">{requirement.maxApplicationLimit}</p> */}
            <motion.div
              whileHover={{ backgroundColor: "#1B0127" }}
              whileTap={{ y: 2 }}
            >
              <LiaMinusSolid
                // onClick={(e) => {
                //   e.stopPropagation(); // Prevent triggering the li click event
                //   if (requirement.requirementId !== undefined) {
                //     handleDecrement(requirement.requirementId);
                //   }
                // }}
                className="size-3 md:size-4  cursor-pointer m-1"
              />
            </motion.div>
            <Tooltip
              className={`${
                index === 0
                  ? "w-48 bg-[#171717] text-wheat rounded-none"
                  : "hidden"
              }`}
              content={
                <p className="text-ash">
                  Applicants will take additional test based on selected skill
                  if you turn on this option, <span>keep in mind, </span>
                  that additional coin (+1) will be deducted for each
                  requirement
                </p>
              }
              placement="left"
            >
              <Switch
                // id={requirement.requirementId?.toString()}
                ripple={false}
                // onClick={() => {
                //   if (requirement.requirementId !== undefined) {
                //     enableRequirementTest(requirement.requirementId);
                //   }
                // }}
                className="h-full w-full rounded-none bg-[#1B0127] checked:bg-[#9c27b0]"
                containerProps={{
                  className: "w-8 h-3",
                }}
                circleProps={{
                  className:
                    "before:hidden rounded-none w-4 h-4 left-0.5 border-none",
                }}
              />
            </Tooltip>
          </motion.div>
        ))}
        <div className="flex justify-end gap-4  w-full">
          <h1 className="p-4 cursor-pointer" onClick={() => handleBack()}>
            Back
          </h1>
          <h1 className="p-4 cursor-pointer" onClick={() => handleNext()}>
            Next
          </h1>
        </div>
      </div>
    </div>
  );
}

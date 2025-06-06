import { useGetProjectRequirementsQuery } from "src/api/ProjectsApi";
import { AnimatePresence, motion } from "framer-motion";
import { useAlterRequirements } from "src/hooks/useAlterRequirements";
import { ProjectRequirement } from "@/src/interfaces/projects/projectTypes";
import { useEffect } from "react";

export default function RequirementsSelection({
  handleNext,
  handleBack,
  selectedRequirements,
  // recommendedSkills,
  addRequirement,
}: {
  handleNext: () => void;
  handleBack: () => void;
  selectedRequirements: ProjectRequirement[];
  // recommendedSkills: string[];
  addRequirement: (requirement: ProjectRequirement) => void;
}) {
  const { data: requirements } = useGetProjectRequirementsQuery();

  console.log(requirements);

  useEffect(() => {
    // This ensures React knows to rerender when requirements update
    console.log(
      "Updated selectedRequirements in RequirementsSelection:",
      selectedRequirements
    );
  }, [selectedRequirements]);

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col mt-8 gap-2">
        <h1 className="text-xl flex items-center gap-4">
          Requirements <span className="text-concrete text-sm">required</span>
        </h1>
        <h3 className="text-sm text-ash">
          Create a clear roadmap for finding the right team members or
          collaborators.
        </h3>
      </div>
      <div className="flex gap-2  flex-wrap border-concrete">
        {requirements?.map((requirement, index) => (
          <motion.div
            // onClick={() =>
            //   addRequirement({
            //     requirementId: requirement.id,
            //     name: requirement.name,
            //     maxApplicationLimit: 1,
            //   })
            // }
            // whileHover={{
            //   backgroundColor: "rgb(126, 24, 145, 1)",
            //   color: "white",
            // }}
            whileTap={{ scale: 1.1 }}
            className={`content-center p-1 text-sm  md:text-base rounded-none md:p-2 cursor-pointer  shadow-md border  `}
            // ${
            //   selectedRequirements.some((req) => req.name === requirement.name)
            //     ? "bg-[#4f46e5]/60"
            //     : "bg-transparent border-concrete text-ash"
            // }
            style={{
              borderColor: "#4f46e5",
              width: "calc(max-content + 50%)",
            }}
            whileHover={{
              boxShadow: "0 0 20px #4f46e5",
              transition: { duration: 6 },
            }}
            key={index}
          >
            {/* {requirement.name} */}
          </motion.div>
        ))}
      </div>
      <div className="flex justify-end gap-4  w-full">
        <h1 className="p-4 cursor-pointer" onClick={() => handleBack()}>
          Back
        </h1>
        <motion.h1
          initial={{ opacity: 0, y: 11 }}
          animate={{
            opacity: selectedRequirements.length > 0 ? 1 : 0,
            y: selectedRequirements.length > 0 ? 0 : 11,
          }}
          transition={{ duration: 0.3 }}
          className="self-end p-4 cursor-pointer"
          style={{
            pointerEvents: selectedRequirements.length > 0 ? "auto" : "none",
          }}
          onClick={() => handleNext()}
        >
          Next
        </motion.h1>
      </div>
    </div>
  );
}

// Defining the skill requirements for your project is essential to
// ensure its successful execution. By outlining the specific skills
// needed—such as expertise in web development, graphic design, or
// marketing—you

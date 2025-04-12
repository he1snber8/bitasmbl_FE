import { motion } from "framer-motion";

import { LiaPlusSolid, LiaMinusSolid } from "react-icons/lia";
import { ProjectRequirement } from "../interfaces/projects/projectRequirementTypes";

interface RequirementsSectionProps {
  projectRequirements: ProjectRequirement[];
  selectedProjectRequirements: ProjectRequirement[];
  handleSelect: (requirement: ProjectRequirement) => void;
  handleIncrement: (requirementName: string) => void;
  handleDecrement: (requirementName: string) => void;
}

export default function RequirementsSection({
  projectRequirements,
  selectedProjectRequirements,
  handleSelect,
  handleIncrement,
  handleDecrement,
}: RequirementsSectionProps) {
  const isRequirementSelected = (requirementId: number) =>
    selectedProjectRequirements.some((p) => p.requirementId === requirementId);

  return (
    <ul>
      {projectRequirements.map((requirement) => {
        const isSelected = isRequirementSelected(requirement.requirementId!);

        return (
          <motion.li
            whileHover={{ backgroundColor: "#3A1750" }}
            onClick={() => handleSelect(requirement)}
            className="flex mb-2 justify-between cursor-pointer p-4 border bg-plum border-purple-500"
            style={{
              backgroundColor: isSelected ? "#2D0740" : "#1B0127",
              borderColor: "rgb(156 39 176)",
            }}
            key={requirement.requirementId}
          >
            {/* Requirement Name */}
            <div>{requirement.name}</div>

            {/* Render controls conditionally based on isSelected */}
            {isSelected && (
              <div className="text-base flex items-center  gap-2">
                {(() => {
                  // Find the selected requirement once for reuse
                  const foundRequirement = selectedProjectRequirements.find(
                    (r) => r.requirementId === requirement.requirementId
                  );

                  return (
                    <>
                      <motion.div
                        whileHover={{ backgroundColor: "#1B0127" }}
                        whileTap={{ y: -2 }}
                      >
                        <LiaPlusSolid
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the li click event
                            if (foundRequirement) {
                              handleIncrement(foundRequirement.name);
                            }
                          }}
                          className="size-6 cursor-pointer m-1"
                        />
                      </motion.div>
                      <div className="text-xl text-center w-6">
                        {foundRequirement?.maxApplicationLimit ||
                          requirement.maxApplicationLimit}
                      </div>
                      <motion.div
                        whileHover={{ backgroundColor: "#1B0127" }}
                        whileTap={{ y: 2 }}
                      >
                        <LiaMinusSolid
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the li click event
                            handleDecrement(requirement.name);
                          }}
                          className="size-6 cursor-pointer m-1"
                        />
                      </motion.div>
                    </>
                  );
                })()}
              </div>
            )}
          </motion.li>
        );
      })}
    </ul>
  );
}

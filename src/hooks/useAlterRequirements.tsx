import { useState } from "react";
import { ProjectRequirement } from "../interfaces/projects/projectTypes";
import { useAlterCategories } from "./useAlterCategories";

export const useAlterRequirements = () => {
  const [selectedRequirements, setSelectedRequirements] = useState<
    ProjectRequirement[]
  >([]);

  const handleIncrement = (requirementId: number) => {
    setSelectedRequirements((prevItems) =>
      prevItems.map((item) =>
        item.requirementId === requirementId
          ? { ...item, maxApplicationLimit: (item.maxApplicationLimit += 1) }
          : item
      )
    );
  };

  const handleDecrement = (requirementId: number) => {
    setSelectedRequirements((prevItems) =>
      prevItems.map((item) =>
        item.requirementId === requirementId && item.maxApplicationLimit > 1
          ? { ...item, maxApplicationLimit: (item.maxApplicationLimit -= 1) }
          : item
      )
    );
  };

  const addRequirement = (requirement: ProjectRequirement) => {
    setSelectedRequirements(
      (prev) =>
        prev.some((item) => item.requirementId === requirement.requirementId)
          ? prev.filter(
              (item) => item.requirementId !== requirement.requirementId
            ) // Remove if exists
          : [...prev, requirement] // Add if not exists
    );
  };

  return {
    handleDecrement,
    handleIncrement,
    addRequirement,
    setSelectedRequirements,
    selectedRequirements,
  };
};

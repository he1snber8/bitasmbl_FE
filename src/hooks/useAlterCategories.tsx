import { useState } from "react";
import { ProjectRequirement } from "../interfaces/projects/projectRequirementTypes";
import { Category } from "../interfaces/categoryTypes";

export const useAlterCategories = () => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  // const [selectedRequirements, setSelectedRequirements] = useState<
  //   ProjectRequirement[]
  // >([]);

  // const [selectedRequirementIndex, setSelectedRequirementIndex] = useState<
  //   number | null
  // >(null);

  // const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const addCategory = (category: Category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((item) => item !== category) // Remove if exists
          : [...prev, category] // Add if not exists
    );
  };

  // const addRequirement = (requirement: GetProjectRequirement) => {
  //   setSelectedRequirements((prev) => [
  //     ...prev, // Keep the existing selected requirements
  //     {
  //       id: requirement.id, // Map properties from GetProjectRequirement
  //       maxApplicationLimit: 2, // Default or initial value
  //     },
  //   ]);
  // };

  // const toggleIndex = (index: number) => {
  //   setSelectedIndices((prev) =>
  //     prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
  //   );

  //   // Set the selected requirement index only when adding to selected indices
  //   if (!selectedIndices.includes(index)) {
  //     setSelectedRequirementIndex(index);
  //   } else if (selectedRequirementIndex === index) {
  //     // Clear selectedRequirementIndex if it’s being deselected
  //     setSelectedRequirementIndex(null);
  //   }
  // };

  return {
    selectedCategories,
    // selectedRequirements,
    // selectedRequirementIndex,
    // selectedIndices,
    // setSelectedRequirements,
    // setSelectedIndices,
    // setSelectedRequirementIndex,
    addCategory,
    // addRequirement,
    // toggleIndex,
  };
};

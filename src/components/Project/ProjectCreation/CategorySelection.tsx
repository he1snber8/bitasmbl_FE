import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAlterCategories } from "src/hooks/useAlterCategories";
import { useGetProjectCategoriesQuery } from "src/api/ProjectsApi";
import { Category } from "@/src/interfaces/categoryTypes";

export default function CategorySelection({
  handleNext,
  handleBack,
  selectedCategories,
  addCategory,
}: {
  handleNext: () => void;
  handleBack: () => void;
  selectedCategories: Category[];
  addCategory: (category: Category) => void;
}) {
  const [active, setActive] = useState<boolean>(false);
  const { data: categories } = useGetProjectCategoriesQuery();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1
          onClick={() => setActive(true)}
          className="text-sm md:text-xl flex items-center gap-4"
        >
          Category <span className="text-concrete text-sm">required</span>
        </h1>
        <h3 className="text-xs md:text-sm text-ash">
          Categories help to organize and showcase your project effectively.
        </h3>
      </div>
      <div className="flex gap-2 flex-wrap border-concrete">
        {categories?.map((category, index) => (
          <motion.div
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              addCategory(category);
              //   toggleCategory(index);
            }}
            // whileHover={{
            //   backgroundColor: "rgb(126, 24, 145, 0.1)",
            //   borderColor: "#9c27b0",
            // }}
            key={index}
            className={`content-center rounded-none p-1 text-sm  md:text-base md:p-2 cursor-pointer  shadow-md border  ${
              selectedCategories.includes(category)
                ? "bg-[#2D0740]  border-[#9c27b0]"
                : // backgroundColor: "rgb(126, 24, 145, 0.1)",
                  // borderColor: "#9c27b0",
                  "bg-transparent border-concrete text-ash"
            }`}
          >
            {category.name}
          </motion.div>
        ))}
      </div>
      <div className="flex justify-end gap-4  w-full">
        <h1 className="   p-4 cursor-pointer" onClick={() => handleBack()}>
          Back
        </h1>
        <motion.h1
          initial={{ opacity: 0, y: 11 }}
          animate={{
            opacity: selectedCategories.length > 0 ? 1 : 0,
            y: selectedCategories.length > 0 ? 0 : 11,
          }}
          transition={{ duration: 0.3 }}
          className="self-end p-4 cursor-pointer"
          style={{
            pointerEvents: selectedCategories.length > 0 ? "auto" : "none",
          }}
          onClick={() => handleNext()}
        >
          Next
        </motion.h1>
      </div>
    </div>
  );
}

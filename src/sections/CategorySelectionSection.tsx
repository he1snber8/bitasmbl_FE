import { motion } from "framer-motion";
import { Category } from "../interfaces/categoryTypes";

interface CategorySelectionProps {
  categories: Category[] | undefined;
  addCategory: (category: Category) => void;
  toggleCategory: (index: number) => void;
  selectedCategoryIndices: number[];
}

export function CategorySelectionSection({
  categories,
  selectedCategoryIndices,
  addCategory,
  toggleCategory,
}: CategorySelectionProps) {
  return (
    <div className="flex flex-col  md:flex-row justify-between">
      <div className="flex flex-col  mb-6 md:w-1/2">
        <h1 className="text-xl mb-4">
          Category <span className="text-concrete text-sm">required</span>
        </h1>
        <h3 className=" text-ash mr-16">
          Categories help to organize and showcase your project effectively.
        </h3>
      </div>
      <div className="flex gap-2 md:w-1/2 flex-wrap">
        {categories?.map((category, index) => (
          <motion.div
            whileTap={{ scale: 1.1 }}
            onClick={() => {
              addCategory(category);
              toggleCategory(index);
            }}
            // whileHover={{
            //   backgroundColor: "rgb(126, 24, 145, 0.1)",
            //   borderColor: "#9c27b0",
            // }}
            key={index}
            className={`content-center rounded-none p-2 cursor-pointer  shadow-md border  ${
              selectedCategoryIndices.includes(index)
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
    </div>
  );
}

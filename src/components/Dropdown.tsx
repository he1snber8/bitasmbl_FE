import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import {
  GetRequirement,
  ProjectRequirement,
} from "../interfaces/projects/projectRequirementTypes";
import { Category } from "../interfaces/categoryTypes";

export default function Dropdown({
  displayItems,
  active,
  setActive,
}: // onSelect,
// addItem,
{
  displayItems: Category[];
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  // onSelect: (requirement: GetRequirement) => void;
  // addItem: (items: string) => void;
}) {
  const [item, setItem] = useState("Cateogries");

  return (
    <div className="w-max mt-4">
      <button
        className="text-sm border border-concrete px-2 text-white"
        onClick={() => setActive((prev) => !prev)}
      >
        <div className="flex items-center gap-x-10">
          {item}
          <MdKeyboardArrowDown className={`size-6 ${active && "rotate-180"}`} />
        </div>
      </button>
      {active && (
        <ul className="max-h-40 border-[1px] border-t-0 border-concrete  overflow-y-scroll hover:border-grape ">
          {displayItems.map((menuItem, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer text-ash hover:bg-plum hover:border-grape hover:text-white"
              onClick={() => {
                setActive(false);
                // onSelect(menuItem);
                // addItem(menuItem);
              }}
            >
              {menuItem.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// className="px-4 py-2 cursor-pointer text-ash hover:bg-plum hover:border-grape hover:text-white"
//  className="max-h-40 border-[1px] border-t-0 border-concrete  overflow-y-scroll hover:border-grape ">
//  <MdKeyboardArrowDown className={`size-6 ${active && "rotate-180"}`} />

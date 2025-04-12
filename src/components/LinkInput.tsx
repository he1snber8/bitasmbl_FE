import { motion } from "framer-motion";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ProjectLink } from "../interfaces/projects/projectTypes";

interface LinkInputProps {
  // setLinkInputs: React.Dispatch<React.SetStateAction<number[]>>;
  link: ProjectLink;
  updateUrlName: (index: number, value: string) => void;
  updateUrlValue: (index: number, value: string) => void;
  index: number;
  deleteInput: () => void;
}

export default function LinkInput({
  deleteInput,
  updateUrlName,
  updateUrlValue,
  index,
  link,
}: LinkInputProps) {
  return (
    <div className="flex my-5 gap-x-2">
      <motion.input
        type="text"
        value={link.urlName}
        placeholder="URL_NAME"
        onChange={(e) => updateUrlName(index, e.target.value)}
        className="w-1/2 border-[1px]  p-2 border-concrete grow bg-transparent rounded-none px-2 
               focus:!border-[#9c27b0] placeholder:text-concrete text-white focus:outline-none"
      />

      <input
        type="text"
        value={link.urlValue}
        placeholder="URL-VALUE"
        onChange={(e) => updateUrlValue(index, e.target.value)}
        className="w-1/2 border-[1px] p-2 border-concrete grow bg-transparent rounded-none px-2 
               focus:!border-[#9c27b0] placeholder:text-concrete text-white focus:outline-none"
      />

      <div className="p-2 content-center hover:border-red-600  cursor-pointer text-ash shadow-md border-[1px] border-concrete">
        <RiDeleteBin6Line onClick={deleteInput} className="size-4 my-auto" />
      </div>
    </div>
  );
}

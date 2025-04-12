import { useLinkInputs } from "src/hooks/useLinkInputs";
import { AnimatePresence, motion } from "framer-motion";
import MyButton from "../../MyButton";
import { LiaMinusSolid, LiaPlusSolid } from "react-icons/lia";
import { PiTrashLight } from "react-icons/pi";
import { ProjectLink } from "@/src/interfaces/projects/projectTypes";

export default function UsefulLinks({
  handleBack,
  handleNext,
  linkInputs,
  addInput,
  deleteInput,
  updateUrlName,
  updateUrlValue,
}: {
  handleBack: () => void;
  handleNext: () => void;
  linkInputs: ProjectLink[];
  addInput: () => void;
  deleteInput: (index: number) => void;
  updateUrlName: (index: number, value: string) => void;
  updateUrlValue: (index: number, value: string) => void;
}) {
  const isNext = linkInputs.every((link) => link.urlName && link.urlValue);

  return (
    <div className=" flex flex-col gap-2">
      <h1 className="text-base">
        Useful Links <span className="text-concrete text-sm">optional</span>
      </h1>
      <h3 className="text-sm text-ash">
        Add links to provide additional information about your project.
      </h3>
      {linkInputs.map((link, index) => (
        <div className="flex  items-center  gap-x-2">
          <div className="grow">
            <motion.input
              whileHover={{
                borderColor: "#9c27b0",
                backgroundColor: "rgb(126, 24, 145, 0.1)",
              }}
              type="text"
              value={link.urlName}
              placeholder="url-name"
              onChange={(e) => updateUrlName(index, e.target.value)}
              className=" border w-full font-thin p-1 border-concrete  bg-transparent rounded-none px-2
                        placeholder:text-concrete text-white focus:outline-none"
            />
          </div>

          <div className="grow">
            <motion.input
              whileHover={{
                borderColor: "#9c27b0",
                backgroundColor: "rgb(126, 24, 145, 0.1)",
              }}
              type="text"
              value={link.urlValue}
              placeholder="url-value"
              onChange={(e) => updateUrlValue(index, e.target.value)}
              className="border w-full  font-thin p-1 border-concrete  bg-transparent rounded-none px-2
                        placeholder:text-concrete text-white focus:outline-none"
            />
          </div>
          {linkInputs.length > 1 && (
            <div
              onClick={() => deleteInput(index)}
              className="border border-concrete hover:border-orange-900 p-1 cursor-pointer"
            >
              <PiTrashLight className="fill-concrete" size={22} />
            </div>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          addInput();
        }}
        className="content-center  border flex items-center gap-1  border-concrete  cursor-pointer w-max"
      >
        <LiaPlusSolid className="fill-concrete hover:fill-white" size={22} />
      </button>
      <div className="flex justify-end gap-4  w-full">
        <h1 className="p-4 cursor-pointer" onClick={() => handleBack()}>
          Back
        </h1>
        <div className="relative w-[50px] text-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={isNext ? "next" : "skip"}
              className="p-4 cursor-pointer absolute left-0 right-0"
              onClick={() => handleNext()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {isNext ? "Next" : "Skip"}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

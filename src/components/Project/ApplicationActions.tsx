import { GetProjectApplicationModel } from "@/src/interfaces/projects/user-specific-projects/GetUserProjectModel";
import { AnimatePresence, motion } from "framer-motion";

const ApplicationActionsDropdown = ({
  isOpen,
  onApprove,
  onReject,
  onClose,
  projectApplication,
}: {
  isOpen: boolean;
  onClose: (value: React.SetStateAction<boolean>) => void;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
  projectApplication: GetProjectApplicationModel;
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.ul
        className="bg-coal absolute top-full right-0 border-gray-700 shadow-lg z-50"
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.li
          whileTap={{ scale: 1.2 }}
          onClick={() => onApprove(projectApplication.id)} // Replace 1 with the actual id
          whileHover={{ backgroundColor: "#035E3E", color: "#B8FFD7" }}
          className="bg-opacity-50 border cursor-pointer p-4 border-black"
        >
          Approve
        </motion.li>
        <motion.li
          onClick={() => onReject(projectApplication.id)} // Replace 1 with the actual id
          whileHover={{
            backgroundColor: "rgba(208, 2, 27, 0.5)",
            color: "#FFABA2",
          }}
          className="border cursor-pointer text-center p-4 border-black"
        >
          Reject
        </motion.li>
      </motion.ul>
    </AnimatePresence>
  );
};

export default ApplicationActionsDropdown;

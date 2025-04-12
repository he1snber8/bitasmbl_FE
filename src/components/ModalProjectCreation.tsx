import { motion } from "framer-motion";
import Lottie from "lottie-react";
import confettiAnimation from "./animations/wired-flat-1103-confetti-hover-pinch.json";
import loadingAnimation from "./animations/wired-outline-1414-circle-hover-pinch.json";
import { useNavigate } from "react-router-dom";

export default function ModalProjectCreation({
  onOpen,
  setOpen,
  success,
  fail,
  isLoading,
}: any) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center"
    >
      {/* Background Blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: onOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          if (!success) {
            setOpen(false);
          }
        }} // Close on click
      ></motion.div>

      {/* Centered Text */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-white text-xl font-bold"
      >
        {isLoading && <Lottie animationData={loadingAnimation} />}
        {success && (
          <>
            <Lottie loop={false} animationData={confettiAnimation}></Lottie>
            <div className="text-center">
              <p>{success}</p>
              <p>
                You can now view it on{" "}
                <span
                  onClick={() => navigate("/home/profile")}
                  className="text-blue-500 cursor-pointer underline hover:text-blue-700"
                >
                  My Projects
                </span>
              </p>
            </div>
          </>
        )}
        {fail && <h2>{fail}</h2>}
      </motion.div>
    </motion.div>
  );
}

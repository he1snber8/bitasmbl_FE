import { motion } from "framer-motion";

export default function IntroStep({
  handleNext,
  userName,
}: {
  handleNext: () => void;
  userName: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center h-full px-4"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Bitasmbl 👋</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Let’s get your profile set up so we can match you with the best teams
        and projects.
      </p>
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 1 }}
        onClick={handleNext}
        className=" text-white hover:text-indigo-500"
      >
        Let’s Go
      </motion.button>
    </motion.div>
  );
}

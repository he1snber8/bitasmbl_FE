"use client";

import { motion } from "motion/react";

export function HeroSectionOne() {
  const handleScroll = () => {
    window.scrollBy({ top: 700, behavior: "smooth" }); // Scrolls down by 500px
  };

  return (
    <div className="relative  mx-auto h-screen  flex max-w-screen-xl flex-col items-center justify-center">
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-64 w-px bg-gradient-to-b from-transparent " />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 ">
        <div className="absolute top-0 h-64 w-px bg-gradient-to-b from-transparent " />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent" />
      </div>
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto  max-w-6xl  text-center font-bold text-2xl   text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
          {"On your own or with a squad, showcase expertise, not just potential."
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Begin your journey to building the right projects with the right
          people.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={handleScroll}
            style={{ borderColor: "#4f46e5" }}
            whileHover={{
              y: -2,
              boxShadow: "0 0 20px #4f46e5",
              // backgroundColor: "rgb(126, 24, 145, 0.1)",
            }}
            className="bg-[#18161b] rounded-md border my-auto p-2 w-[200px] text-center text-sm md:text-base"
            // className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Explore Now
          </motion.button>
          <motion.button
            style={{ borderColor: "#4f46e5" }}
            whileHover={{
              boxShadow: "0 0 20px #4f46e5",
              y: -2,
              // backgroundColor: "rgb(126, 24, 145, 0.1)",
            }}
            className="bg-[#18161b] rounded-md border my-auto p-2 w-[200px] text-center text-sm md:text-base"
            // className="w-60 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Request a demo
          </motion.button>
          {/* <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900">
            Contact Support
          </button> */}
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <h1 className="text-base font-bold md:text-2xl">Bitasmbl</h1>
      </div>
      <button className="w-24 transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 md:w-32 dark:bg-white dark:text-black dark:hover:bg-gray-200">
        Login
      </button>
    </nav>
  );
};

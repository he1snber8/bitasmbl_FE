import React, { useState } from "react";
import GithubReposDropdown from "../../GithubReposDropdown";
import { GithubRepo } from "@/src/interfaces/users/githubUserTypes";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function GithubRepoConnect({
  handleBack,
  handleNext,
  setSelectedRepo,
  selectedRepo,
}: {
  handleBack: () => void;
  handleNext: () => void;
  setSelectedRepo: React.Dispatch<React.SetStateAction<GithubRepo | null>>;
  selectedRepo: GithubRepo | null;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex  items-center flex-col md:w-1/4  ">
        <h1 className="text-base mb-2  w-full">
          Connect with repository{" "}
          <span className="text-concrete text-sm">optional</span>{" "}
        </h1>
        <h3 className="hidden md:inline text-ash text-sm">
          you can connect existing git repository to your project!
        </h3>
      </div>
      <GithubReposDropdown
        setSelectedRepo={setSelectedRepo}
        selectedRepo={selectedRepo}
      />
      <div className="flex justify-end gap-4">
        <h1 className="p-4 cursor-pointer" onClick={() => handleBack()}>
          Back
        </h1>
        <div className="relative w-[50px] text-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={"skip"}
              className="p-4 cursor-pointer absolute left-0 right-0"
              onClick={() => handleNext()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {selectedRepo ? "Next" : "Skip"}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

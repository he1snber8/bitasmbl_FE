import React from "react";
import { CardContainer, CardItem } from "./3DCard";
import { CardBody } from "@material-tailwind/react";
import { motion } from "framer-motion";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var">
      <motion.div
        whileHover={{
          borderColor: "#9c27b0",
          backgroundColor: "rgb(126, 24, 145, 0.1)",
        }}
      >
        <CardBody className="bg-coal border rounded-md border-concrete  relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black w-auto sm:w-[30rem] h-auto  p-6">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600  dark:text-white"
          >
            Header here
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            Description here
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img src="" alt="" />
          </CardItem>
          <div className="flex justify-between items-center mt-10">
            <CardItem
              translateZ={20}
              // as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Some logic here
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              and here
            </CardItem>
          </div>
        </CardBody>
      </motion.div>
    </CardContainer>
  );
}

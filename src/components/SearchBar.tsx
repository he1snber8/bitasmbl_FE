import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { animate, motion } from "framer-motion";
import { TfiSearch } from "react-icons/tfi";
import { VscChromeClose } from "react-icons/vsc";

export default function SearchBar({ className, width, hoverBgColor }: any) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [divHovered, setDivHovered] = useState(false);

  return (
    <>
      <motion.div
        onHoverStart={() => setDivHovered(true)}
        onHoverEnd={() => setDivHovered(false)}
        className={`flex bg-[#191919]/90 items-center rounded-xl border-ash/20
        hover:hoverBgColor  ${className} text-white border font-thin  `}
      >
        {/* <TfiSearch /> */}
        <input
          className={`bg-transparent w-full outline-none placeholder:font-medium  ${
            divHovered && "placeholder:text-cream   text-cream"
          }  `}
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        {/* <VscChromeClose /> */}
      </motion.div>
      {/* {searchTerm && (
        <VscChromeClose
          onClick={() => setSearchTerm(" ")}
          className=" mr-5 cursor-pointer"
        />
      )} */}
    </>
  );
}

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
        // whileHover={{ width }}
        // transition={{ duration: 0.3, ease: "easeInOut" }}
        onHoverStart={() => setDivHovered(true)}
        onHoverEnd={() => setDivHovered(false)}
        className={`flex items-center  
        hover:hoverBgColor  ${className} text-white border border-concrete font-thin p-1 `}
      >
        {/* <TfiSearch /> */}
        <input
          className={`bg-transparent outline-none   ${
            divHovered && "placeholder:text-cream  text-cream"
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

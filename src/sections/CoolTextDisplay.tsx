"use client";
import React from "react";
import { motion } from "motion/react";
import { CoolTextTransition } from "../ui/CoolTextTransition";

export function CoolTextDisplay() {
  return (
    <div className="flex items-center justify-center relative overflow-hidden bg-black">
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white z-2 font-sans">
        <CoolTextTransition text="Challenge " />
        Yourself. <br /> Build with
        <CoolTextTransition text=" Purpose" />. <br />
        Prove Your <CoolTextTransition text="Worth" />.
      </h1>
    </div>
  );
}

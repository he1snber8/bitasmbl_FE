import React from "react";
import { FaReact, FaVuejs, FaAngular } from "react-icons/fa";
import { RiSvelteFill } from "react-icons/ri";
import { SiNextdotjs } from "react-icons/si";
import { BsHourglassSplit } from "react-icons/bs";

export default function LeaderBoardPage() {
  return (
    <div className="h-screen bg-[#171717] m-8 rounded-lg border border-concrete flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-6">
        <BsHourglassSplit className="text-5xl text-ash animate-pulse" />
        <h1 className="text-3xl font-bold text-white">
          Leaderboard Coming Soon
        </h1>
        <p className="text-ash max-w-md">
          We’re building something exciting! The leaderboard will showcase top
          contributors and project rankings across various tech stacks like
          React, Vue, Angular, and more.
        </p>
        <div className="flex gap-4 text-3xl text-ash">
          <FaReact />
          <FaVuejs />
          <FaAngular />
          <RiSvelteFill />
          <SiNextdotjs />
        </div>
        <div className="text-sm text-dimmed">
          Stay tuned and keep building 💻
        </div>
      </div>
    </div>
  );
}

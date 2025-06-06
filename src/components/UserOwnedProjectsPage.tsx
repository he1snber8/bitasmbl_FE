import React from "react";
import { LuWrench, LuLaptop2 } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";

export default function UserCustomProjectsPage() {
  return (
    <div className="h-screen bg-[#171717] m-8 rounded-lg border border-concrete flex items-center justify-center">
      <div className="text-center flex flex-col items-center gap-6">
        <LuLaptop2 className="text-5xl text-ash animate-pulse" />
        <h1 className="text-3xl font-bold text-white">
          Custom Projects Coming Soon
        </h1>
        <p className="text-ash max-w-md">
          You’ll soon be able to create, manage, and showcase your own custom
          projects. Integrate your GitHub, assign tech stacks, and collaborate
          with others.
        </p>
        <div className="flex gap-4 text-3xl text-ash">
          <LuWrench />
          <FaGithub />
        </div>
        <div className="text-sm text-dimmed">
          More control, more creativity — launching soon 🛠️
        </div>
      </div>
    </div>
  );
}

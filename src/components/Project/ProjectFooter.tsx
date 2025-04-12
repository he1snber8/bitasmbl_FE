import { GetClientProjectModel } from "@/src/interfaces/projects/client-specific-projects/GetClientProjectModel";
import { ProjectLink } from "@/src/interfaces/projects/projectTypes";
import React from "react";
import { IoIosLink } from "react-icons/io";

interface ProjectFooterProps {
  status?: string;
  projectLinks?: ProjectLink[];
  dateCreated: Date;
}

export default function ProjectFooter({
  status,
  projectLinks,
  dateCreated,
}: ProjectFooterProps) {
  console.log(projectLinks);
  console.log(projectLinks?.length);
  return (
    <div className="justify-between mt-2">
      <div className="grow flex flex-col gap-2">
        <div className="flex items-center text-sm md:flex-row md:items-center gap-2">
          Status:
          <span
            className={`px-2 py-1 text-sm  ${
              status === "Active"
                ? "bg-[#035E3E] text-[#B8FFD7]"
                : status === "Filled"
                ? "bg-[#F5A623] text-[#FFECB8]"
                : status === "deleted"
                ? "bg-[#D0021B] text-[#FFABA2]"
                : status === "Launched"
                ? "bg-[#3e4be0] text-[#86a6e1]"
                : ""
            }
          bg-opacity-50 border border-black`}
          >
            {status}
            {status === "Launched" ? " 🚀" : ""}
          </span>
          {projectLinks && projectLinks.length > 0 && (
            <>
              <p>Useful Links:</p>
              {projectLinks.map((link) => {
                return (
                  <div key={link.urlValue} className="flex items-center gap-2">
                    <a
                      className="text-light-blue-500 hover:underline"
                      target="#"
                      href={link.urlValue}
                    >
                      {link.urlName}
                    </a>
                    <IoIosLink />
                  </div>
                );
              })}
            </>
          )}
        </div>
        <p className="text-xs text-ash">
          Created: {new Date(dateCreated).toLocaleDateString()}
        </p>
        {/* <div className="flex items-center justify-between">
        <h2>
          Created On:{" "}
          {clientProject.dateCreated &&
            new Date(clientProject.dateCreated).toLocaleDateString()}
        </h2>
        <ModalCoverLetter
          selectedRequirementIds={selectedRequirementIds}
          isOpen={openCoverLetter}
          onClose={() => setOpenCoverLetter((prev) => !prev)}
          coverLetter={coverLetterRef}
          onApply={() => handleApply(clientProject.id)}
        />
      </div> */}
      </div>
    </div>
  );
}

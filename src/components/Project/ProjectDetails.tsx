import { ClientProjectResponse } from "@/src/interfaces/projects/client-specific-projects/GetClientProjectModel";
import React from "react";

export default function ProjectDetails({
  dateCreated,
  status,
}: ClientProjectResponse) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <p className="text-sm text-gray-500">
        Created on{" "}
        {dateCreated ? new Date(dateCreated).toLocaleDateString() : "N/A"}
      </p>
      <div className="flex gap-4">
        {/* {githubUrl && (
        <a href={githubUrl} target="_blank" className="flex items-center gap-2 text-blue-600">
          <FaGithub /> GitHub Repo
        </a>
      )}
      {externalUrl && (
        <a href={externalUrl} target="_blank" className="flex items-center gap-2 text-blue-600">
          <FiExternalLink /> External Link
        </a>
      )} */}
      </div>
    </div>
  );
}

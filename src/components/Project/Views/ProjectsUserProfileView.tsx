import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { GetUserProjectModel } from "@/src/interfaces/projects/user-specific-projects/GetUserProjectModel";
import { useGithubRepo } from "src/context/GithubReposContext";
import MyButton from "../../MyButton";
import { useUpdateProjectMutation } from "src/api/ProjectsApi";
import { useNavigate } from "react-router-dom";
import ProfileAvatar from "../../ProfileAvatar";

export function ProjectsUserProfileView({
  setOpen,
  userProject,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userProject: GetUserProjectModel;
}) {
  // const { repos, setRepos } = useGithubRepo();

  const [update] = useUpdateProjectMutation();
  const navigate = useNavigate();

  const handleProjectUpdate = async (projectId: number) => {
    try {
      const response = await update({
        id: projectId,
        status: "Launched",
      }).unwrap();

      alert("Project launched successfully:");
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setOpen(false)} // Close modal when clicking outside
    >
      <motion.div
        className="bg-coal border relative border-concrete  shadow-lg w-1/2"
        initial={{ opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <DialogBody>
          <div className="flex flex-col gap-4">
            <div>{userProject.name}</div>
            {/* <div>Total applications: {userProject.applications}</div> */}
            {/* {userProject.dateCreated} */}
            {/* <div>{userProject.description}</div>
            {"    "}
            <div>
              {userProject.githubRepo} LOL
              {new Date(
                repos.find((repo) => repo.url === userProject.githubRepo)
                  ?.updated_At ?? ""
              ).toLocaleString()}
            </div> */}
            {/* <div>
              {
                repos.find((repo) => repo.url === userProject.githubRepo)
                  ?.html_url
              }
            </div> */}
            {/* <div>
              {
                repos.find((repo) => repo.url === userProject.githubRepo)
                  ?.language
              }
            </div> */}
            {/* <div>
              {
                repos.find((repo) => repo.url === userProject.githubRepo)
                  ?.stargazers_count
              }
            </div> */}
            {/* <div>
              {new Date(
                repos.find((repo) => repo.url === userProject.githubRepo)
                  ?.created_at ?? ""
              ).toLocaleString()}
            </div> */}
            <div>
              {(userProject.applications ?? 0) > 0 ? (
                <h1>Team members:</h1>
              ) : (
                <h1>
                  No members yet, all good things require time, be patient 🙃
                </h1>
              )}
              <div className="relative flex mt-6 w-1/3">
                {userProject.projectApplications
                  .filter(
                    (projectApplication) =>
                      projectApplication.applicationStatus === "Approved"
                  )
                  .map((projectApplication, index) => (
                    <div
                      key={projectApplication.applicant.id}
                      className="absolute"
                      style={{
                        left: `${index * 25}px`,
                        zIndex: `${
                          userProject.projectApplications.length + index
                        }`,
                      }}
                    >
                      {projectApplication.applicant.imageUrl ? (
                        <Tooltip
                          content={projectApplication.applicant.userName}
                          placement="bottom"
                        >
                          <img
                            className="size-12 hover:border hover:border-ash rounded-full shadow-md"
                            src={projectApplication.applicant.imageUrl}
                            alt=""
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip
                          content={projectApplication.applicant.userName}
                          placement="bottom"
                        >
                          <ProfileAvatar
                            tooltipContent={
                              projectApplication.applicant.userName
                            }
                            className="size-12 text-2xl hover:border hover:border-ash"
                            userName={projectApplication.applicant.userName}
                          />
                        </Tooltip>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            {/* <button className="w-max  p-2  shadow-lg border shadow-white/50">
              Subscribe
            </button> */}
            {/* {userProject.projectApplications.map((application) => (
                  <div key={application.id}>{application.}</div>
                ))} */}
            {/* <div>{userProject.status}</div> */}
            <div className="flex justify-end">
              <Button
                className={`rounded-none normal-case text-base font-normal bg-gradient-to-r ${
                  userProject.status === "Launched"
                    ? "from-light-blue-900 to-blue-800"
                    : "from-raisin to-purple-700"
                }  py-2 px-4`}
                onClick={() => {
                  if (userProject.status !== "Launched") {
                    handleProjectUpdate(userProject.id);
                  } else {
                    navigate(`${userProject.id}/manage`);
                  }
                }}
              >
                {userProject.status === "Launched"
                  ? "Manage Project ✍🏻"
                  : "Launch 🚀"}
              </Button>
            </div>
          </div>
        </DialogBody>
      </motion.div>
    </motion.div>
  );
}

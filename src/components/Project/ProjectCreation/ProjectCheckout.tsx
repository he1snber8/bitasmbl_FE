import { useGetProfileQuery } from "src/api/UsersApi";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreateProjectModel,
  ProjectLink,
  ProjectRequirement,
} from "src/interfaces/projects/projectTypes";
import { Category } from "src/interfaces/categoryTypes";
import { useState } from "react";
import {
  useCreateProjectMutation,
  useUploadProjectImagesMutation,
} from "src/api/ProjectsApi";
import ModalProjectCreation from "../../ModalProjectCreation";
import { Button } from "@material-tailwind/react";
import { BsFiletypePdf } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import coinAnimation from "../../animations/wired-flat-290-coin-hover-pinch.json";
import Lottie from "lottie-react";
import { MdCheck } from "react-icons/md";
import { spawn } from "child_process";
import { useNavigate } from "react-router-dom";
import { GithubRepo } from "@/src/interfaces/users/githubUserTypes";
import { LiaCheckSolid } from "react-icons/lia";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }, // Delay each child animation
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectDetails({
  projectName,
  projectDescription,
  projectLinks,
  projectRequirements,
  projectCategories,
  projectFiles,
  handleBack,
  githubRepo,
}: {
  handleBack: () => void;
  projectName: string;
  projectDescription: string;
  projectLinks: ProjectLink[];
  projectRequirements: ProjectRequirement[];
  projectCategories: Category[];
  projectFiles: File[];
  githubRepo: GithubRepo | null;
}) {
  const [display, setDisplay] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [failMessage, setFailMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const { data: profile } = useGetProfileQuery();
  const [createProject, { isLoading: projectLoading, error, isSuccess }] =
    useCreateProjectMutation();
  // console.log(projectFiles);

  // console.log(projectRequirements);

  const [uploadProjectImages, { isLoading: imagesLoading }] =
    useUploadProjectImagesMutation();

  const creationCost = projectRequirements.reduce(
    (acc, pr) => acc + pr.maxApplicationLimit * (pr.isTestEnabled ? 2 : 1),
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const projectPayload: CreateProjectModel = {
      name: projectName.trim(),
      description: projectDescription,
      projectRequirements: projectRequirements.map(
        ({ requirementId, name, maxApplicationLimit, isTestEnabled }) => ({
          requirementId,
          name,
          maxApplicationLimit,
          isTestEnabled,
        })
      ),
      creationCost,
      projectLinks,
      categoryIds: projectCategories.map(({ id }) => id),
    };

    try {
      const { projectId } = await createProject(projectPayload).unwrap();
      await uploadProjectImages({ projectId, files: projectFiles }).unwrap();

      setFailMessage(null); // Clear any previous errors
      setSuccessMessage("Project created successfully!");
      setDisplay(true);
    } catch (error: any) {
      setSuccessMessage(null); // Clear success message in case of failure
      setFailMessage(error.data?.message || "Project creation failed.");
      setDisplay(true);
    }
  };

  console.log(githubRepo);
  return (
    <div className="mt-10">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <motion.div
          className="flex items-center gap-4"
          variants={containerVariants}
        >
          <motion.h1 className="text-xl text-ash" variants={itemVariants}>
            Please view the chosen configuration for <span>{projectName}</span>
          </motion.h1>
          {githubRepo && (
            <motion.div
              animate="show"
              transition={{ duration: 0.3 }}
              whileHover={{
                boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.5)",
              }}
              className="flex shadow-lg border w-max  md:gap-2  border-concrete cursor-pointer hover:border-ash p-1 md:p-2"
            >
              <img
                className="size-6 shadow-lg rounded-full"
                src="/github-mark-white.png"
                alt=""
              />
              <a
                className="font-light flex items-center gap-2"
                href={githubRepo.html_url}
                target="#"
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className="hidden md:inline-block">{githubRepo.name}</h1>
                <LiaCheckSolid />
              </a>
            </motion.div>
          )}
        </motion.div>
        <motion.div
          className="text-sm flex items-center gap-2 mt-2"
          variants={itemVariants}
        >
          <p className="text-ash">By {profile?.userName}</p>
          <img className="size-8 rounded-full" src={profile?.imageUrl} alt="" />
        </motion.div>

        <motion.div
          className="h-full py-8 flex flex-col gap-4"
          variants={containerVariants}
        >
          <motion.h1 variants={itemVariants}>Description:</motion.h1>

          <motion.p
            className="border  bg-[#18161b] p-4 text-sm border-purple-500 break-words whitespace-normal"
            variants={itemVariants}
          >
            {projectDescription}
          </motion.p>

          {projectLinks?.map((link, index) => (
            <motion.div key={index} className="" variants={itemVariants}>
              {link.urlName}
            </motion.div>
          ))}

          <motion.h1 variants={itemVariants}>Requirements:</motion.h1>
          <motion.div
            className="flex items-center gap-2"
            variants={itemVariants}
          >
            {projectRequirements?.map((requirement, index) => (
              <motion.div
                whileHover={{
                  backgroundColor: "rgb(126, 24, 145, 0.4)",
                  color: "white",
                }}
                className="border text-sm bg-[#18161b] border-purple-500 p-2 w-max"
                key={index}
              >
                {requirement.name} {requirement.maxApplicationLimit}
              </motion.div>
            ))}
          </motion.div>

          <motion.h1 variants={itemVariants}>Categories:</motion.h1>
          <motion.div
            className="flex items-center gap-2"
            variants={itemVariants}
          >
            {projectCategories?.map((category, index) => (
              <span
                className="border text-sm bg-[#18161b] border-purple-500 p-2 w-max"
                key={index}
              >
                {category.name}
              </span>
            ))}
          </motion.div>

          <motion.h1 variants={itemVariants}>Files:</motion.h1>
          <div className="flex flex-col md:flex-row">
            <div className="flex w-2/3 flex-wrap gap-2">
              {projectFiles.map((projectFile) => {
                const fileUrl = URL.createObjectURL(projectFile);
                const fileType = projectFile.type;
                console.log(fileType);
                return fileType.startsWith("image/") ? (
                  <div className="border border-purple-500 bg-purple-500/30 content-center">
                    <img
                      className="max-w-full h-auto object-contain size-48"
                      src={fileUrl}
                      alt=""
                      key={projectFile.name}
                    />
                  </div>
                ) : fileType === "application/pdf" ? (
                  <div className="p-8 border border-purple-500 m-2">
                    <BsFiletypePdf
                      fill="#9c27b0"
                      className="h-full "
                      size={32}
                    />
                  </div>
                ) : (
                  <div className="p-8 border m-2 border-purple-500">
                    <CiFileOn fill="#9c27b0" className="h-full" size={32} />
                  </div>
                );
              })}
            </div>
            <motion.div
              variants={itemVariants}
              className="md:w-1/3 flex flex-col gap-4"
            >
              <motion.ul variants={itemVariants}>
                {projectRequirements.map((pr) => {
                  return (
                    <motion.li className="mt-4 text-sm" variants={itemVariants}>
                      {pr.name} ({" "}
                      <span className="text-red-400">
                        {pr.maxApplicationLimit}
                      </span>
                      {pr.isTestEnabled ? (
                        <span>
                          {" "}
                          x <span className="text-purple-500"> 2</span>
                        </span>
                      ) : (
                        ""
                      )}{" "}
                      )
                      {pr.isTestEnabled ? (
                        <span className="ml-2 border bg-[#1B0127] border-purple-500 hover:text-white  cursor-pointer text-center w-max rounded-none  text-sm p-1 normal-case">
                          Test enabled
                          <MdCheck className="inline" fill="white" size={20} />
                        </span>
                      ) : (
                        ""
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>
              <div className="bg-red-400 h-[1px]" />
              <h1 className="flex items-center gap-2 ">
                Your Balance:{" "}
                <span className="text-yellow-700 flex items-center gap-1">
                  {profile?.balance}
                  <Lottie
                    className="size-5 h-6"
                    animationData={coinAnimation}
                  />
                </span>
              </h1>

              <motion.h1 variants={itemVariants}>
                Total coints to be deducted:{" "}
                <span className="text-red-400 content-center ">
                  -{creationCost}{" "}
                </span>
              </motion.h1>
            </motion.div>
          </div>
        </motion.div>
        <div className="flex justify-end gap-2 mt-4">
          <div>
            <Button
              onClick={() => navigate("/home")}
              className="content-center text-white bg-transparent  cursor-pointer text-center w-max rounded-none text-sm font-light normal-case"
              fullWidth
            >
              Cancel
            </Button>
          </div>
          <div>
            <Button
              onClick={() => handleBack()}
              className="content-center text-white bg-transparent  cursor-pointer text-center w-max rounded-none text-sm font-light normal-case"
              fullWidth
            >
              Back
            </Button>
          </div>
          <div>
            <Button
              onClick={(e) => {
                handleSubmit(e);
              }}
              className="content-center border bg-[#1B0127] border-purple-500 hover:text-white  cursor-pointer text-center w-max rounded-none text-sm font-light normal-case"
              loading={imagesLoading}
              fullWidth
            >
              Create
            </Button>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {display && (
          <ModalProjectCreation
            onOpen={display}
            setOpen={setDisplay}
            success={successMessage}
            fail={failMessage}
            isLoading={imagesLoading}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

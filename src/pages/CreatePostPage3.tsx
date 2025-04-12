import React, { useState } from "react";
import NameInput from "../components/Project/ProjectCreation/NameInput";
import { motion } from "framer-motion";
import DescriptionArea from "../components/Project/ProjectCreation/DescriptionArea";
import CategorySelection from "../components/Project/ProjectCreation/CategorySelection";
import RequirementsSelection from "../components/Project/ProjectCreation/RequirementsSelection";
import SelectedRequirements from "../components/Project/ProjectCreation/SelectedRequirements";
import { ProjectRequirement } from "../interfaces/projects/projectTypes";
import { useAlterRequirements } from "../hooks/useAlterRequirements";
import UsefulLinks from "../components/Project/ProjectCreation/UsefulLinks";
import { useAlterCategories } from "../hooks/useAlterCategories";
import { useLinkInputs } from "../hooks/useLinkInputs";
import ProjectImagesUpload from "../components/Project/ProjectCreation/ProjectImagesUpload";
import ProjectCheckout from "../components/Project/ProjectCreation/ProjectCheckout";
import GithubRepoConnect from "../components/Project/ProjectCreation/GithubRepoConnect";
import { GithubRepo } from "../interfaces/users/githubUserTypes";

export default function CreatePostPage3() {
  const [step, setStep] = useState(0);
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);

  const {
    addRequirement,
    setSelectedRequirements,
    selectedRequirements,
    handleDecrement,
    handleIncrement,
  } = useAlterRequirements();

  const { selectedCategories, addCategory } = useAlterCategories();

  const { linkInputs, addInput, deleteInput, updateUrlName, updateUrlValue } =
    useLinkInputs();

  const handleNext = () => {
    if (step < inputs.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const inputs = [
    <NameInput
      key="name"
      projectName={projectName}
      setProjectName={setProjectName}
      handleNext={handleNext}
    />,
    <DescriptionArea
      projectDescription={projectDescription}
      setProjectDescription={setProjectDescription}
      key="Description"
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <GithubRepoConnect
      setSelectedRepo={setSelectedRepo}
      selectedRepo={selectedRepo}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <ProjectImagesUpload
      uploadedFiles={uploadedFiles}
      setUploadedFiles={setUploadedFiles}
      handleBack={handleBack}
      handleNext={handleNext}
    />,

    <CategorySelection
      selectedCategories={selectedCategories}
      addCategory={addCategory}
      key="Categories"
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <RequirementsSelection
      addRequirement={addRequirement}
      selectedRequirements={selectedRequirements}
      key="Requirements"
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <SelectedRequirements
      selectedRequirements={selectedRequirements}
      setSelectedRequirements={setSelectedRequirements}
      key="SelectedRequirements"
      handleBack={handleBack}
      handleNext={handleNext}
      handleDecrement={handleDecrement}
      handleIncrement={handleIncrement}
    />,
    <UsefulLinks
      linkInputs={linkInputs}
      addInput={addInput}
      deleteInput={deleteInput}
      updateUrlName={updateUrlName}
      updateUrlValue={updateUrlValue}
      handleBack={handleBack}
      handleNext={handleNext}
      key="UsefulLinks"
    />,
    <ProjectCheckout
      projectLinks={linkInputs}
      projectRequirements={selectedRequirements}
      projectCategories={selectedCategories}
      projectName={projectName}
      projectDescription={projectDescription}
      projectFiles={uploadedFiles}
      githubRepo={selectedRepo}
      handleBack={handleBack}
    />,
  ]; // ✅ Ensure each component has a unique key

  return (
    // <div>
    <div
      className={`${
        step === inputs.length - 1 ? "" : "absolute inset-0 overflow-y-auto"
      } flex items-center justify-center h-full`}
    >
      <motion.div
        className="flex relative w-5/6 md:w-4/6 flex-col gap-6 max-h-screen justify-between "
        key={step} // ✅ Use index for key since it's an array
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: step === 0 ? 1.2 : 0.6 }}
      >
        {inputs[step]}
      </motion.div>
    </div>
    // </div>
  );
}

import React, { useState } from "react";
import OnboardingCheckout from "../components/User/Onboarding/OnboardingCheckout";
import EducationInput from "../components/User/Onboarding/EducationInput";
import IntroStep from "../components/User/Onboarding/IntroStep";
import TechSkillsSelection from "../components/User/Onboarding/TechSkillsSelection";
import LinkedInPage from "../components/LinkedinTest";
import ProjectImagesUpload from "../components/Project/ProjectCreation/ProjectImagesUpload";
import ResumeUploadStep from "../ResumeUpload";
import PDFTextExtractor from "../PdfExtractor";
import Registration from "../components/User/Onboarding/Registration";
import { SocialLink } from "../interfaces/userTypes";

export default function UserOnboardingProcess() {
  const [step, setStep] = useState(0);

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  // State for each onboarding step
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // const [education, setEducation] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");

  const [thirdPartyLinks, setThirdPartyLinks] = useState<[] | SocialLink[]>([]);

  const onboardingSteps = [
    <IntroStep key="intro" userName={username} handleNext={handleNext} />,

    <Registration
      setUserName={setUsername}
      handleBack={handleBack}
      handleNext={handleNext}
    />,

    <ResumeUploadStep
      setUploadedFiles={setUploadedFiles}
      uploadedFiles={uploadedFiles}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <PDFTextExtractor
      setTitle={setBio}
      handleNext={handleNext}
      file={uploadedFiles[0]}
      setSkills={setSkills}
      setThirdPartyLinks={setThirdPartyLinks}
    />,

    <OnboardingCheckout
      key="review"
      handleBack={handleBack}
      userName={username}
      bio={bio}
      skills={skills}
      thirdPartyLinks={thirdPartyLinks}
      // handleSubmit={submitUserProfile}
    />,
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-coal p-4">
      <div className="w-full max-w-3xl">{onboardingSteps[step]}</div>
    </div>
  );
}

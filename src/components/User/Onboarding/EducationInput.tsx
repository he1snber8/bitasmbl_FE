export default function EducationInput({
  education,
  setEducation,
  handleNext,
  handleBack,
}: {
  education: string;
  setEducation: React.Dispatch<React.SetStateAction<string>>;
  handleNext: () => void;
  handleBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 items-center mx-auto">
      <div className="flex flex-col w-full">
        <h1 className="text-xl">Education</h1>
        <h3 className="text-sm text-ash">Your highest level of education</h3>
        <textarea
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          placeholder="e.g., BSc in Computer Science at MIT"
          className="bg-[#18161b] border border-concrete rounded-md p-2 mt-2 w-full text-white focus:outline-none"
        />
      </div>

      <div className="flex justify-between w-full">
        <button onClick={handleBack} className="text-sm text-ash">
          Back
        </button>
        <button
          onClick={handleNext}
          className="text-sm text-white hover:text-indigo-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

const skillOptions = [
  "React",
  "Vue",
  "Next.js",
  "Node.js",
  "Python",
  "C#",
  "Go",
];

export default function TechSkillsSelection({
  selectedSkills,
  setSelectedSkills,
  handleNext,
  handleBack,
}: {
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
  handleNext: () => void;
  handleBack: () => void;
}) {
  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="flex flex-col gap-6 items-center mx-auto w-full">
      <h1 className="text-xl">Tech Skills</h1>
      <h3 className="text-sm text-ash">Select your preferred tech stacks</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        {skillOptions.map((skill) => (
          <button
            key={skill}
            onClick={() => toggleSkill(skill)}
            className={`px-4 py-2 rounded-full text-sm border ${
              selectedSkills.includes(skill)
                ? "bg-indigo-600 text-white"
                : "border-concrete text-white"
            }`}
          >
            {skill}
          </button>
        ))}
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

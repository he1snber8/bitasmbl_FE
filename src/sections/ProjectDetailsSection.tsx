export function ProjectDetailsSection({
  projectName,
  setProjectName,
  descriptionRef,
}: any) {
  return (
    <div>
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <h1 className="text-xl mb-2">
            Name <span className="text-concrete text-sm">required</span>
          </h1>
          <h3 className="text-sm text-ash">A unique name for your project</h3>
        </div>
        <input
          onChange={(e) => setProjectName(e.target.value)}
          type="text"
          placeholder="Example project name here"
          className="border border-concrete grow bg-transparent rounded-none px-2 focus:!border-raisin placeholder:text-concrete text-white focus:outline-none"
        />
      </div>
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <h1 className="text-xl mb-8">
            Description <span className="text-concrete text-sm">required</span>
          </h1>
          <h3 className="text-sm mr-16 text-ash">
            Describe your idea in a way that inspires and excites potential team
            members.
          </h3>
        </div>
        <textarea
          ref={descriptionRef}
          placeholder="Describe your project here"
          className="border border-concrete grow min-h-44 bg-transparent rounded-none px-2 py-3 focus:!border-raisin placeholder:text-concrete text-white focus:outline-none"
        />
      </div>
    </div>
  );
}

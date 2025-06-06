// import {
//   useGetProjectCategoriesQuery,
//   useGetProjectRequirementsQuery,
//   useGetProjectsQuery,
// } from "../api/ProjectsApi";
// import SearchBar from "../components/SearchBar";
// import ProjectViewCard from "../components/Project/Views/ProjectClientView";
// import React, { useEffect } from "react";
// import CheckBox from "../components/CheckBox";
// import { Checkbox, ListItem, ListItemPrefix } from "@material-tailwind/react";
// import * as io from "socket.io-client";
// import { ChevronDownIcon } from "@heroicons/react/24/solid";
// import { AnimatePresence, motion } from "framer-motion";
// import { Category, Requirement } from "../interfaces/homeFilterTypes";
// import { IoIosRefresh } from "react-icons/io";
// import { SimplePagination } from "../components/Pagination";

// export default function HomePage() {
//   // const socket = io.connect("http://localhost:3001");

//   const [active, setActive] = React.useState<number>(1);

//   const {
//     data: projects,

//     isLoading: projectsLoading,
//   } = useGetProjectsQuery({ page: active, pageSize: 4 });

//   useEffect(() => {});

//   const { data: categories } = useGetProjectCategoriesQuery();

//   const { data: requirements } = useGetProjectRequirementsQuery();

//   const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = React.useState(false);
//   const [isRequirementssMenuOpen, setIsRequirementsMenuOpen] =
//     React.useState(false);

//   const [selectedCategories, setSelectedCategories] = React.useState<number[]>(
//     []
//   );

//   const [selectedRequirements, setSelectedRequirements] = React.useState<
//     number[]
//   >([]);

//   const updateCategoryFilter = (categoryId: number) => {
//     console.log(categoryId, "categoryId");
//     setSelectedCategories((prev) =>
//       prev.includes(categoryId)
//         ? prev.filter((id) => id !== categoryId)
//         : [...prev, categoryId]
//     );
//   };

//   const updateRequirementFilter = (requirementId: number) => {
//     setSelectedRequirements((prev) =>
//       prev.includes(requirementId)
//         ? prev.filter((id) => id !== requirementId)
//         : [...prev, requirementId]
//     );
//   };

//   const filteredProjects = projects?.filter((project) => {
//     if (selectedCategories.length === 0 && selectedRequirements.length === 0) {
//       return true;
//     }

//     const matchesCategory =
//       selectedCategories.length === 0
//         ? true
//         : selectedCategories.every((selectedId) =>
//             project.categories?.some((c) => c.id === selectedId)
//           );

//     const matchesRequirement =
//       selectedRequirements.length === 0
//         ? true
//         : selectedRequirements.every((selectedId) =>
//             project.requirements?.some((r) => r.requirementId === selectedId)
//           );

//     return matchesCategory && matchesRequirement;
//   });

//   return (
//     <>
//       <div className="flex mt-4  md:flex-row flex-col gap-6 ">
//         <div className="md:w-1/4 ">
//           <SearchBar className="p-2 " />
//           <div
//             onClick={() => setIsCategoriesMenuOpen((prev) => !prev)}
//             className="flex items-center px-2 gap-2 mt-4 justify-between"
//           >
//             <div className="cursor-pointer flex items-center gap-2">
//               <p className="font-thin">Filter by Category</p>
//               <ChevronDownIcon
//                 strokeWidth={2.5}
//                 className={`block h-3 w-3 transition-transform  ${
//                   isCategoriesMenuOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </div>
//             {selectedCategories.length > 0 && (
//               <motion.div
//                 whileHover={{ backgroundColor: "rgba(202,198,191,0.3)" }}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => {
//                   setSelectedCategories([]);
//                 }}
//                 className="bg-ash/10 cursor-pointer flex items-center rounded-md p-1 px-2 gap-2"
//               >
//                 <IoIosRefresh
//                   fill="#cac6bf"
//                   className="cursor-pointer"
//                   size={12}
//                 />
//                 <p className="text-xs text-ash">Clear</p>
//               </motion.div>
//             )}
//           </div>
//           <AnimatePresence>
//             {isCategoriesMenuOpen && (
//               <motion.ul
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: -10, opacity: 0 }}
//                 className=" md:flex flex-col max-h-64 bg-[#191919]/90  rounded-xl border-ash/20  overflow-y-scroll mt-3"
//               >
//                 {categories?.map((category: Category) => {
//                   return (
//                     <li className="  flex items-center" key={category.id}>
//                       <Checkbox
//                         className="rounded-none "
//                         checked={selectedCategories.includes(category.id)}
//                         onChange={() => updateCategoryFilter(category.id)}
//                         defaultChecked={false}
//                         size={12}
//                         color="purple"
//                         label={category.name}
//                         labelProps={{
//                           className: "text-sm  text-ash",
//                         }}
//                       />
//                     </li>
//                   );
//                 })}
//               </motion.ul>
//             )}
//           </AnimatePresence>
//           <div
//             onClick={() => setIsRequirementsMenuOpen((prev) => !prev)}
//             className=" flex items-center  gap-2 mt-4 justify-between"
//           >
//             <div className="cursor-pointer px-2 flex items-center gap-2">
//               <p className="font-thin">Filter by Requirement</p>
//               <ChevronDownIcon
//                 strokeWidth={2.5}
//                 className={`block h-3 w-3 transition-transform  ${
//                   isRequirementssMenuOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </div>
//             {selectedRequirements.length > 0 && (
//               <motion.div
//                 whileHover={{ backgroundColor: "rgba(202,198,191,0.3)" }}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => {
//                   setSelectedRequirements([]);
//                 }}
//                 className="bg-ash/10 cursor-pointer flex items-center rounded-md p-1 px-2 gap-2"
//               >
//                 <IoIosRefresh
//                   fill="#cac6bf"
//                   className="cursor-pointer"
//                   size={12}
//                 />
//                 <p className="text-xs text-ash">Clear</p>
//               </motion.div>
//             )}
//           </div>
//           <AnimatePresence>
//             {isRequirementssMenuOpen && (
//               <motion.ul
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 exit={{ y: -10, opacity: 0 }}
//                 className="md:flex flex-col max-h-64  bg-[#191919]/90  rounded-xl border-ash/20 scroll-n overflow-y-scroll mt-3"
//               >
//                 {requirements?.map((requirement: Requirement) => {
//                   return (
//                     <ListItemPrefix className="flex">
//                       <Checkbox
//                         className="rounded-none text-red-500"
//                         checked={selectedRequirements.includes(requirement.id)}
//                         onChange={() => updateRequirementFilter(requirement.id)}
//                         defaultChecked={false}
//                         color="purple"
//                         label={requirement.name}
//                         labelProps={{ className: "text-ash text-sm" }}
//                       />
//                     </ListItemPrefix>
//                   );
//                 })}
//               </motion.ul>
//             )}
//           </AnimatePresence>
//         </div>
//         {/* <div className=" "> */}
//         {/* <div className="min-h-64 border  border-ash">
//             <h1>You can view projects here</h1>
//           </div> */}

//         {!filteredProjects?.length && !projectsLoading ? (
//           <div className="w-[70%] h-3/4 flex items-center justify-center text-center p-4">
//             No matching projects found
//           </div>
//         ) : (
//           <div className="md:w-3/4 grid md:grid-rows-4 gap-4 ">
//             {filteredProjects?.map((project) => (
//               <div key={project.id}>
//                 <ProjectViewCard
//                   projectsLoading={projectsLoading}
//                   project={project}
//                 />

//                 {/* <div className="w-full h-[1px] bg-gradient-to-l from-purple-700/80 to-purple-900/70" /> */}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className=" flex  justify-center p-8">
//         <SimplePagination active={active} setActive={setActive} pages={9} />
//       </div>
//     </>
//   );
// }

import React from "react";

export default function HomePage() {
  return <div>HOME PAGE HIA</div>;
}

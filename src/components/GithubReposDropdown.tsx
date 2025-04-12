import React, { useEffect, useState } from "react";
import { GithubRepo } from "../interfaces/users/githubUserTypes";
import { AnimatePresence, motion } from "framer-motion";
import checkmarkAnimation from "./animations/check-mark-green.json";
import Lottie from "lottie-react";
import {
  useGetGithubReposQuery,
  useGetGithubUserCommitsQuery,
} from "../api/UsersApi";
import { useGithubRepo } from "../context/GithubReposContext";

export default function GithubReposDropdown({
  setSelectedRepo,
  selectedRepo,
}: // repos,
// setSelectedRepo,
{
  selectedRepo: GithubRepo | null;
  setSelectedRepo: React.Dispatch<React.SetStateAction<GithubRepo | null>>;
}) {
  const [repoSelection, setRepoSelection] = useState([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [repoSelected, setRepoSelected] = useState<boolean>(false);
  // const [repos, setRepos] = useState<GithubRepo[] | null>(null);

  const { repos, setRepos } = useGithubRepo();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  const { data: fetchedRepos } = useGetGithubReposQuery({
    accessToken: accessToken,
    username: "he1snber8",
  });

  const { data } = useGetGithubUserCommitsQuery({
    accessToken: accessToken,
    username: "he1snber8",
    repo: selectedRepo?.name || "",
    branch: "",
  });

  console.log(selectedRepo?.name);

  useEffect(() => {
    if (fetchedRepos) {
      setRepos(fetchedRepos);
    }
  }, [fetchedRepos]);

  return (
    <motion.div
      onClick={() => setRepoSelected((prev) => !prev)}
      className={` md:w-1/2 relative bg-[#18161b]  h-12 flex items-center border  border-concrete  cursor-pointer`}
    >
      <div className="mx-auto flex items-center">
        <h3 className="text-sm">
          {selectedRepo
            ? `${selectedRepo.name} selected`
            : "Connect with Github"}{" "}
        </h3>

        <AnimatePresence>
          {repoSelected && (
            <motion.ul
              className="bg-coal  absolute left-0 top-full w-full  border border-concrete  z-50"
              initial={{ opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
            >
              {repos &&
                repos.map((repo) => {
                  return (
                    <motion.li
                      onClick={() => setSelectedRepo(repo)}
                      whileTap={{ backgroundColor: "#3C3D37" }}
                      whileHover={{
                        backgroundColor: "#1E201E",
                        color: "white",
                      }}
                      className="bg-opacity-50  cursor-pointer p-4"
                    >
                      {repo.name}
                    </motion.li>
                  );
                })}
            </motion.ul>
          )}
        </AnimatePresence>

        {selectedRepo ? (
          <div className="size-8 absolute right-6">
            <Lottie
              className=""
              loop={false}
              animationData={checkmarkAnimation}
            ></Lottie>
          </div>
        ) : (
          <img className="size-6 ml-3" src="/github-mark-white.png" alt="" />
        )}
      </div>
    </motion.div>
  );
}

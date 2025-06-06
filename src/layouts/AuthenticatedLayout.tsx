import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  useAuthorizeGithubUserMutation,
  useAuthorizeLinkedinUserMutation,
  // useGetGithubRepoFilesQuery,
  useGetGithubReposQuery,
} from "../api/UsersApi";
import { useGetAccessTokenMutation } from "../api/GithubAuthApi";
import { access } from "fs";
import { NavBar2 } from "../components/NavBar2";

interface AuthenticatedLayoutProps {
  isUserPage?: boolean;
}

export default function AuthenticatedLayout({
  isUserPage,
}: AuthenticatedLayoutProps) {
  const query = new URLSearchParams(window.location.search);
  const code = query.get("code");

  const [authorizeGithubUser, { data, isLoading, isError, error }] =
    useAuthorizeGithubUserMutation();

  // Pull code from URL once
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const codeFromUrl = urlParams.get("code");
  //   // setCode(codeFromUrl);
  // }, []);

  // useEffect(() => {
  //   if (code) {
  //     authorizeGithubUser({ code, isRegistration: true })
  //       .unwrap()
  //       .then((response) => {
  //         console.log("GitHub Auth Response:", response);
  //       })
  //       .catch((err) => {
  //         console.error("GitHub Auth Error:", err);
  //       });
  //   }
  // }, [code, authorizeGithubUser]);

  // useEffect(() => {
  //   if (data?.accessToken) {
  //     localStorage.setItem("accessToken", data.accessToken);
  //   }
  // }, [data?.accessToken]);

  return (
    <div className=" h-screen flex flex-col">
      <NavBar2 />

      <main className="flex-1 ">
        <Outlet />
      </main>
    </div>
  );
}

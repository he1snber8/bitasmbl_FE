import { Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { useEffect } from "react";
import {
  useAuthorizeGithubUserMutation,
  useGetGithubReposQuery,
} from "../api/UsersApi";
import { useGetAccessTokenMutation } from "../api/GithubAuthApi";
import { access } from "fs";

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

  // useGetGithubReposQuery(code ? { accessToken: code, username: "your-username" } : { accessToken: "", username: "" });

  useEffect(() => {
    if (code) {
      authorizeGithubUser(code)
        .unwrap()
        .then((response) => {
          console.log("GitHub Auth Response:", response);
        })
        .catch((err) => {
          console.error("GitHub Auth Error:", err);
        });
    }
  }, [code, authorizeGithubUser]);

  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }
  }, [data?.accessToken]);

  return (
    <>
      <NavBar isAuthenticated={true} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

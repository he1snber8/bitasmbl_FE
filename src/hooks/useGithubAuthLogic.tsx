// import { useEffect, useState } from "react";
// import { useGithubUserContext } from "../app/hooks";
// import {
//   useGetGithubAccessTokenQuery,
//   useGetGithubUserDataQuery,
// } from "../api/GithubApi";
// import { useNavigate } from "react-router-dom";
// import {
//   useLogInMutation,
//   useRegisterMutation,
// } from "../api/Commands/UsersApi";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// export const useGithubAuthLogic = () => {
//   // 🔹 Trigger functions (to be called from parent)
//   // const registerGithub = () => handleGithubAuth("register");
//   // const loginGithub = () => handleGithubAuth("login");
//   const { userData: githubUser, setGithubUserData } = useGithubUserContext();

//   const navigate = useNavigate();
//   const [logIn] = useLogInMutation();
//   const [register] = useRegisterMutation();

//   const accessToken = localStorage.getItem("accessToken");
//   // // Fetch GitHub user data
//   const {
//     data: githubUserData,
//     error: githubError,
//     isLoading: githubLoading,
//   } = useGetGithubUserDataQuery({ token: accessToken }, { skip: !accessToken });

//   useEffect(() => {
//     if (githubUserData) {
//       // setProvider("google");
//       const { message, githubUser } = githubUserData;

//       if (githubUser) {
//         console.log(message);
//       }
//     }
//   }, [githubUserData, setGithubUserData]);

//   useEffect(() => {
//     if (githubUser) {
//       localStorage.setItem("githubUser", JSON.stringify(githubUser));
//       console.log("github user:", githubUser);
//     }

//     return () => {
//       localStorage.removeItem("githubUser");
//     };
//   }, [githubUser]);

//   const handleGithubAuth = async (authType: "register" | "login") => {
//     if (!githubUser) {
//       window.alert("GitHub authentication failed.");
//       return;
//     }

//     try {
//       // Check with backend if user exists
//       const apiCall =
//         authType === "register"
//           ? register({
//               email: githubUser?.email ?? "", // Ensure email is not empty if possible
//               userName: githubUser?.login ?? "",
//               registrationType: "github",
//             })
//           : logIn({ username: githubUser?.login, loginType: "github" });

//       const response = await apiCall;

//       if ("data" in response) {
//         window.alert(response.data.message);
//         console.log(response.data.message);
//         // setIsAuthenticated(true);
//         // ✅ Redirect ONLY on successful login
//       } else if (response.error && "data" in response.error) {
//         const errorData = response.error as FetchBaseQueryError;
//         const errorMessage =
//           (errorData.data as { message?: string })?.message ||
//           "An error occurred";

//         window.alert(errorMessage);
//         console.log(errorMessage);
//       } else {
//         window.alert("Unexpected error");
//         console.log("Unexpected response:", response);
//       }
//     } catch (error) {
//       console.error("Authentication error:", error);
//       window.alert("Authentication error");
//     }
//   };

//   const loginGithub = () => {
//     window.location.assign("http://localhost:8080/login");
//     handleGithubAuth("login");
//   };

//   return {
//     loginGithub,
//     // registerGithub,
//     // githubUser,
//     // tokenError,
//     // tokenLoading,
//     // githubError,
//     // githubLoading,
//   };
// };

import React from "react";

export default function useGithubAuthLogic() {
  return <div></div>;
}

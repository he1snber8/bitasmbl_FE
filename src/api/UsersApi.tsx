import {
  LoginRequest,
  LoginResponse,
  RegisterResponse,
  RegisterUserModel,
  User,
  UserModel,
  UserProfile,
  UserUpdateModel,
} from "@/src/interfaces/userTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PasswordRecoveryRequest,
  PasswordRecoveryResponse,
  ResetPasswordRequest,
} from "../interfaces/userTypes";
import { GoogleUserResponse } from "../interfaces/googleTypes";
import {
  GetGithubUserResponse,
  GithubRepo,
} from "../interfaces/users/githubUserTypes";
import { GithubCommit, GithubFileContent } from "../interfaces/github/commits";
import { CreateTransaction } from "../interfaces/transaction";

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: fetchBaseQuery({
    // baseUrl: "https://bitasmbl.onrender.com/",
    baseUrl: "http://localhost:5057/users",
    // baseUrl: "http://192.168.100.3:5057",
    // baseUrl: "https://bitasmbl.onrender.com/users",
    credentials: "include",
  }),
  tagTypes: ["User", "UserProjects"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "", // Relative path for the GET request
    }),
    logOut: builder.mutation({
      invalidatesTags: ["User"],
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),
    authorizeGithubUser: builder.mutation<
      GetGithubUserResponse,
      { code: string; isRegistration?: boolean }
    >({
      invalidatesTags: ["User"],
      query: ({ code, isRegistration }) =>
        `auth/github?code=${code}&isRegistration=${isRegistration}`,
    }),

    authorizeLinkedinUser: builder.mutation<
      void,
      { code: string; redirectUri: string }
    >({
      query: ({ code, redirectUri }) =>
        `auth/linkedinyo?code=${code}&redirectUri=${redirectUri}`,
      // invalidatesTags: ["User"],
      // query: ({ code, redirectUri }) => ({
      //   url: `auth/linkedin?code=${code}&redirectUri=${redirectUri}`,
      //   method: "POST",
      //   body: {}, // if you don't need anything in the body, send empty
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }),
    }),

    authorizeGoogleUser: builder.mutation<GoogleUserResponse, string>({
      invalidatesTags: ["User"],
      query: (accessToken) => `auth/google?accessToken=${accessToken}`,
    }),

    getProfile: builder.query<UserProfile, void>({
      query: () => "profile", // Relative path for the GET request
      providesTags: ["User", "UserProjects"],
    }),

    getPublicProfile: builder.query<UserProfile, string>({
      query: (id) => `/${id}`, // Relative path for the GET request
    }),

    logIn: builder.mutation<LoginResponse, LoginRequest>({
      invalidatesTags: ["User"], // 👈 This will refetch getProfile a
      query: (loginRequest) => ({
        url: "login",
        method: "POST",
        body: loginRequest,
      }),
    }),

    updateUser: builder.mutation<void, UserUpdateModel>({
      invalidatesTags: ["User"], // 👈 This will refetch getProfile a
      query: (userUpdateModel) => ({
        url: "update",
        method: "PUT",
        body: userUpdateModel,
      }),
    }),

    register: builder.mutation<RegisterResponse, RegisterUserModel>({
      query: (registerUserModel) => ({
        url: "register",
        method: "POST",
        body: registerUserModel,
      }),
    }),
    passwordRecoveryRequest: builder.mutation<
      PasswordRecoveryResponse,
      PasswordRecoveryRequest
    >({
      query: (email) => ({
        url: "password-recovery-request",
        method: "POST",
        body: email,
        headers: {
          "Content-Type": "application/json", // Ensure proper content type
        },
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordRequest>({
      query: (data) => ({
        url: "password-reset", // Backend endpoint
        method: "POST",
        body: data,
      }),
    }),
    getGithubRepos: builder.query<
      GithubRepo[],
      { accessToken: string; username: string }
    >({
      query: ({ accessToken, username }) => ({
        url: `github/repos?accessToken=${accessToken}&username=${username}`,
      }),
    }),
    // getGithubRepoFiles: builder.query<
    //   GithubFileContent[], // Assuming content is an array of strings
    //   { accessToken: string; username: string; repoName: string }
    // >({
    //   query: ({ accessToken, username, repoName }) => ({
    //     url: `github/repo/file/contents?accessToken=${accessToken}&username=${username}&repoName=${repoName}`,
    //   }),
    // }),
    decodeGithubFileContent: builder.mutation<
      GithubFileContent[], // ✅ Response type
      {
        accessToken: string;
        username: string;
        repoName: string;
        // filenames: string[];
      }
    >({
      query: ({ accessToken, username, repoName }) => ({
        url: `github/repo/file/contents/decode?accessToken=${accessToken}&username=${username}&repoName=${repoName}`,
        method: "POST",
        // body: filenames, // ✅ Send as array of strings
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getGithubUserCommits: builder.query<
      GithubCommit[],
      { accessToken: string; username: string; repo: string; branch: string }
    >({
      query: ({ accessToken, username, repo, branch }) => ({
        url: `github/repo/commits?accessToken=${accessToken}&username=${username}&repo=${repo}&branch=${branch}`,
      }),
    }),
    fillUpUserBalance: builder.mutation<void, CreateTransaction>({
      query: (transaction) => ({
        url: "balance/fill", // Backend endpoint
        method: "POST",
        body: transaction,
      }),
    }),
  }),
});

export const {
  useLogInMutation,
  useRegisterMutation,
  usePasswordRecoveryRequestMutation,
  useResetPasswordMutation,
  useGetUsersQuery,
  useGetPublicProfileQuery,
  useGetGithubReposQuery,
  useDecodeGithubFileContentMutation,
  // useGetGithubRepoFilesQuery,
  useGetGithubUserCommitsQuery,
  useAuthorizeGithubUserMutation,
  useAuthorizeGoogleUserMutation,
  useAuthorizeLinkedinUserMutation,
  useFillUpUserBalanceMutation,
  useLogOutMutation,
  useUpdateUserMutation,
  useGetProfileQuery,
} = usersApi;

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
import { GithubCommit } from "../interfaces/github/commits";
import { CreateTransaction } from "../interfaces/transaction";
import { getEnvironmentData } from "worker_threads";

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
    authorizeGithubUser: builder.mutation<GetGithubUserResponse, string>({
      invalidatesTags: ["User"],
      query: (code) => `auth/github?code=${code}`,
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
  useGetGithubUserCommitsQuery,
  useAuthorizeGithubUserMutation,
  useAuthorizeGoogleUserMutation,
  useFillUpUserBalanceMutation,
  useLogOutMutation,
  useUpdateUserMutation,
  useGetProfileQuery,
} = usersApi;

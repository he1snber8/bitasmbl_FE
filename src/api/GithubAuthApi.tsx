import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubAuthApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://github.com/login/oauth" }),
  endpoints: (builder) => ({
    getAccessToken: builder.mutation<string, string>({
      query: (code) => ({
        url: "access_token",
        method: "GET",
        params: {
          client_id: "Iv23lidUetpHsRCSlAaY",
          client_secret: "e55778f0631826dbf7151868cafe09570c904c75",
          code,
        },
        headers: {
          Accept: "application/json",
        },
      }),
    }),
  }),
});

export const { useGetAccessTokenMutation } = githubAuthApi;

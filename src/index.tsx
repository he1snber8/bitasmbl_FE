import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import { setupListeners } from "@reduxjs/toolkit/query";
import { configureStore } from "@reduxjs/toolkit";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleUserProvider } from "./context/GoogleUserContext";
import { GoogleAuthProvider } from "./hooks/useGoogleOauth";
import { GithubUserProvider } from "./context/GithubUserContext";
import { usersApi } from "./api/UsersApi";
import { projectsApi } from "./api/ProjectsApi";
import { StandardUserProvider } from "./context/StandardUserContext";
import { uploadApi } from "./api/ImageUploadApi";
import { AuthProvider } from "./context/ProviderContext";
import { githubAuthApi } from "./api/GithubAuthApi";
import { GithubRepoProvider } from "./context/GithubReposContext";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [githubAuthApi.reducerPath]: githubAuthApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware()
      .concat(uploadApi.middleware)
      .concat(githubAuthApi.middleware)
      .concat(usersApi.middleware)
      .concat(projectsApi.middleware),
});

setupListeners(store.dispatch);

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="481639826655-09j3toh6k4lhls4v0i29qvlc138pn996.apps.googleusercontent.com">
      <AuthProvider>
        <GithubRepoProvider>
          <GithubUserProvider>
            <GoogleUserProvider>
              <GoogleAuthProvider>
                <StandardUserProvider>
                  <App />
                </StandardUserProvider>
              </GoogleAuthProvider>
            </GoogleUserProvider>
          </GithubUserProvider>
        </GithubRepoProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </Provider>
);

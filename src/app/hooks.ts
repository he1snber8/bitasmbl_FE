import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "./store";
import { useContext } from "react";
import { GithubUserContext } from "../context/GithubUserContext";
import { GoogleUserContext } from "../context/GoogleUserContext";
// import { GoogleUserContext } from "../context/GoogleContext";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGithubUserContext = () => {
  const context = useContext(GithubUserContext);

  if (!context) {
    throw new Error(
      "useGithubUserContext must be used within a GithubUserProvider"
    );
  }

  return context;
};

export const useGoogleUserContext = () => {
  const context = useContext(GoogleUserContext);

  if (!context) {
    throw new Error(
      "useGoogleUserContext must be used within a GoogleUserProvider"
    );
  }

  return context;
};

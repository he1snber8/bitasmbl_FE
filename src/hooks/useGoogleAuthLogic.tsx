import { useEffect } from "react";
import {
  useAuthorizeGoogleUserMutation,
  useLogInMutation,
  useRegisterMutation,
} from "../api/UsersApi";
import { useGoogleUserContext } from "../app/hooks";
import { useAuthProviderContext } from "../context/ProviderContext";
import { useGoogleAuth } from "./useGoogleOauth";

import { useGetProfileQuery } from "../api/UsersApi";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthResponse } from "../interfaces/googleTypes";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const useGoogleAuthLogic = () => {
  const { userData: googleUser, setGoogleUserData } = useGoogleUserContext();
  const { googleAuth, setGoogleAuth } = useGoogleAuth();
  const navigate = useNavigate();

  const [authorizeGoogleUser, { data, isLoading, error }] =
    useAuthorizeGoogleUserMutation();

  useEffect(() => {
    if (googleAuth?.access_token) {
      authorizeGoogleUser(googleAuth.access_token);
    }
  }, [googleAuth?.access_token, authorizeGoogleUser]);

  // Google Register Hook
  const authorizeGoogle = useGoogleLogin({
    onSuccess: (res) => {
      setGoogleAuth(res as GoogleOAuthResponse);
    },
    onError: (error) => console.error("Registration Failed:", error),
  });

  return {
    googleUser,
    setGoogleUserData,
    authorizeGoogle,
  };
};

export default useGoogleAuthLogic;

import { useEffect, useState } from "react";
import { useLogInMutation, useRegisterMutation } from "../api/UsersApi";
import { RegisterResponse } from "../interfaces/userTypes";
import { useNavigate } from "react-router-dom";
import { useStandardUserContext } from "../context/StandardUserContext";
import { useAuthProviderContext } from "../context/ProviderContext";

export const useStandardAuthLogic = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [userName, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [logIn] = useLogInMutation();
  const [register] = useRegisterMutation();

  const { setStandardUser } = useStandardUserContext();
  const { setProvider } = useAuthProviderContext();

  const navigate = useNavigate();

  const loginStandard = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await logIn({ email, password });
      console.log("Login Response:", response);

      if ("data" in response) {
        const { message } = response.data;
        setProvider("standard");
        if (message) {
          // setStandardUser(userModel);
          console.log(message);
          navigate("/home");
        } else {
          alert("Login failed. Please check your credentials.");
        }
      } else if ("error" in response) {
        alert(
          "Login failed: " + (response.error as any).data?.message ||
            "An unknown error occurred."
        );
      }
    } catch (err) {
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const registerStandard = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    username: string,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await register({ userName: username, email, password });
      if ("data" in response) {
        const { message } = response.data as RegisterResponse;
        window.alert(message);
      } else if ("error" in response) {
        const error = response.error as { data: { message: string } };
        if (error?.data?.message) {
          console.log(`Registration failed: ${error.data.message}`);
          window.alert(error.data.message); // Show error message to the user
        } else {
          window.alert("Registration failed. Please try again."); // Generic error message
        }
      }
    } catch (err) {
      window.alert(
        "An unexpected error occurred during registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    loginStandard,
    registerStandard,
  };
};

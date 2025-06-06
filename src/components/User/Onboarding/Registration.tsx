import { useStandardAuthLogic } from "src/auths/StandardAuth";
import useGoogleAuthLogic from "src/hooks/useGoogleAuthLogic";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Registration({
  handleBack,
  handleNext,
  setUserName,
}: {
  handleBack: () => void;
  handleNext: () => void;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, registerStandard } = useStandardAuthLogic();

  const { authorizeGoogle } = useGoogleAuthLogic();

  const handleGoogleAuth = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      authorizeGoogle();
      handleNext(); // move to next onboarding step on success
    } catch (error) {
      window.alert("Google authentication failed. Please try again.");
    }
  };

  const handleRegistration = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      await registerStandard(e, userName, email, password);
      setUserName(userName); // Set the username in the parent component
      handleNext(); // move to next onboarding step on success
    } catch (error) {
      window.alert("Registration failed. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center h-full px-4"
    >
      <h1 className="text-white font-outfit text-lg md:text-xl">
        Create an account
      </h1>
      <p className="mt-1 text-ash text-sm">Welcome! Register below</p>

      <div className="flex flex-col gap-6 items-center mx-auto w-full max-w-md mt-6">
        <div className="flex flex-col w-full">
          <h2 className="text-sm text-ash">Email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@gmail.com"
            className="bg-[#18161b] border border-concrete rounded-md p-2 mt-1 w-full text-white focus:outline-none"
          />
        </div>

        <div className="flex flex-col w-full">
          <h2 className="text-sm text-ash">Username</h2>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johnDoe"
            className="bg-[#18161b] border border-concrete rounded-md p-2 mt-1 w-full text-white focus:outline-none"
          />
        </div>

        <div className="flex flex-col w-full">
          <h2 className="text-sm text-ash">Password</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="bg-[#18161b] border border-concrete rounded-md p-2 mt-1 w-full text-white focus:outline-none"
          />
        </div>

        <div className="w-full">
          <button
            onClick={(e) => handleRegistration(e)}
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-raisin to-purple-700 text-white text-sm font-saira rounded-none hover:opacity-90 transition"
          >
            {loading ? "Please wait..." : "Create an account"}
          </button>
        </div>

        <p className="text-xs text-ash">or register with:</p>

        <div className="flex gap-2 w-full">
          <button
            onClick={() =>
              window.location.assign(
                "https://github.com/login/oauth/authorize?client_id=Iv23lidUetpHsRCSlAaY"
              )
            }
            className="flex items-center justify-center gap-2 w-full p-2 bg-gradient-to-r from-coal to-gray-900 text-white rounded-none"
          >
            <img src="github-mark-white.png" alt="GitHub" className="size-6" />
            GitHub
          </button>

          <button
            onClick={handleGoogleAuth}
            className="flex items-center justify-center gap-2 w-full p-2 bg-gradient-to-r from-coal to-gray-900 text-white rounded-none"
          >
            <img src="google.png" alt="Google" className="size-6" />
            Google
          </button>
        </div>

        <div className="flex justify-between w-full pt-4">
          <button
            onClick={handleBack}
            className="text-sm text-ash hover:text-white transition"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="text-sm text-white hover:text-indigo-400 transition"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}

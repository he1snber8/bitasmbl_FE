import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../../api/UsersApi";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";

const PasswordResetForm: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [resetPassword, { isLoading, isError, isSuccess, error }] =
    useResetPasswordMutation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(useLocation().search);

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // const errorMessage =
  //   isError &&
  //   error &&
  //   "data" in error &&
  //   error.data &&
  //   (error.data as any).message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (!token || !email) {
      return;
    }

    try {
      await resetPassword({
        email,
        token,
        newPassword,
        confirmPassword,
      }).unwrap();

      alert("Password reset successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Failed to reset password:", err);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-10 bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex flex-col gap-4 justify-between h-auto p-6 shadow-lg w-5/6 md:w-1/3 "
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex flex-col">
          <h2 className="text-lg text-white font-semibold">Reset Password</h2>
          <p className="text-sm text-ash">
            Enter a new password below to reset your account.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <motion.div
            whileHover={{ borderColor: "#9c27b0" }}
            className="bg-[#18161b] relative rounded-none text-sm md:text-base"
          >
            <input
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setErrorMessage("");
              }}
              type={showPassword ? "text" : "password"}
              maxLength={64}
              className="peer bg-[#18161b] resize-none rounded-none text-ash font-lg font-saira  w-full  border border-concrete border-t-transparent bg-transparent px-3 py-2.5  text-sm  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-concrete placeholder-shown:border-t-concrete focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-sm font-normal leading-tight text-ash transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5  before:border-t before:border-l before:border-concrete before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:border-t after:border-r after:border-concrete after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-concrete peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent  peer-focus:leading-tight peer-focus:text-ash peer-focus:text-xs peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              New Password
            </label>
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-concrete hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <PiEyeThin size={20} />
              ) : (
                <PiEyeSlashThin size={20} />
              )}
            </button>
          </motion.div>

          <motion.div
            whileHover={{ borderColor: "#9c27b0" }}
            className="bg-[#18161b] relative rounded-none text-sm md:text-base"
          >
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrorMessage("");
              }}
              type={showConfirmPassword ? "text" : "password"}
              maxLength={64}
              className="peer bg-[#18161b] resize-none rounded-none text-ash font-lg font-saira  w-full  border border-concrete border-t-transparent bg-transparent px-3 py-2.5  text-sm  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-concrete placeholder-shown:border-t-concrete focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=""
            />

            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-sm font-normal leading-tight text-ash transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5  before:border-t before:border-l before:border-concrete before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:border-t after:border-r after:border-concrete after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-concrete peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent  peer-focus:leading-tight peer-focus:text-ash peer-focus:text-xs peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Confirm Password
            </label>
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-concrete hover:text-white"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <PiEyeThin size={20} />
              ) : (
                <PiEyeSlashThin size={20} />
              )}
            </button>
          </motion.div>

          <Button
            type="submit"
            className="bg-gradient-to-r  from-raisin to-purple-700 flex justify-center items-center rounded-none font-saira"
            loading={isLoading}
            fullWidth
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>

          {/* Error Message Container (Keeps Space Reserved) */}
          <div className="min-h-[20px]">
            {(errorMessage || isSuccess) && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: [-5, 5, -5, 5, 0] }} // Keeping shake effect
                transition={{ type: "spring", stiffness: 200 }}
                className={`text-sm text-center ${
                  errorMessage ? "text-red-500" : "text-green-500"
                }`}
              >
                {errorMessage || "Password reset successful!"}
              </motion.p>
            )}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PasswordResetForm;

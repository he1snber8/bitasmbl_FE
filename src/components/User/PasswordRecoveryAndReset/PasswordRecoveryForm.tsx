import React, { useState } from "react";
import { usePasswordRecoveryRequestMutation } from "../../../api/UsersApi";
import { motion } from "framer-motion";
import { InputField } from "../../InputField";
import { Button } from "@material-tailwind/react";
import MyButton from "../../MyButton";
import { useNavigate } from "react-router-dom";

const PasswordRecoveryForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [requestPasswordReset, { data, isLoading, isError, isSuccess, error }] =
    usePasswordRecoveryRequestMutation();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await requestPasswordReset({ email }).unwrap();
      // alert("Password reset email sent successfully.");
    } catch (err) {
      console.error("Failed to send password reset email:", err);
    }
  };

  // Extract error message from the `error` object
  const errorMessage =
    isError &&
    error &&
    "data" in error &&
    error.data &&
    (error.data as any).message;

  return (
    <motion.div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // onClick={onClose} // Close modal when clicking outside
    >
      <motion.div
        className=" flex flex-col gap-3 justify-between h-96 p-6 shadow-lg md:w-1/2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className=" flex flex-col  h-96 p-6 ">
          <MyButton
            left
            className="self-start py-6 md:text-base text-xs cursor-pointer"
            onClick={() => navigate("/")}
          >
            Back
          </MyButton>
          <div className="mb-4">
            <h2>Forgot Password?</h2>
            <p className="text-sm text-ash">
              Enter the email below to receive reset instructions, thats it!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <motion.div
              whileHover={{ borderColor: "#9c27b0" }}
              className="bg-[#18161b] relative rounded-none text-sm md:text-base"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                maxLength={64}
                className="peer bg-[#18161b] resize-none rounded-none text-ash font-lg font-saira  w-full  border border-concrete border-t-transparent bg-transparent px-3 py-2.5  text-sm  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-concrete placeholder-shown:border-t-concrete focus:border-2 focus:border-purple-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=""
              />
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-sm font-normal leading-tight text-ash transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5  before:border-t before:border-l before:border-concrete before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:border-t after:border-r after:border-concrete after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-concrete peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent  peer-focus:leading-tight peer-focus:text-ash peer-focus:text-xs peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-purple-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-purple-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Email
              </label>
            </motion.div>
            <Button
              type="submit"
              className="my-4 bg-gradient-to-r  from-raisin to-purple-700  flex justify-center items-center rounded-none font-saira"
              loading={isLoading}
              fullWidth
            >
              Reset
            </Button>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [-15, 5, -15, 5, 10, 5, 8, 5] }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-red-500 text-sm mt-2 text-center"
              >
                {errorMessage || "Invalid email. Please try again."}
              </motion.p>
            )}

            {isSuccess && data && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [-15, 5, -15, 5, 10, 5, 8, 5] }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-green-500 text-sm mt-2 text-center"
              >
                {data.message || "Password reset sent on email successfully."}
              </motion.p>
              // <p className="bg-green-400 text-white p-2 mt-4">{data.message}</p>
            )}
          </form>
        </div>

        {/* Display error message */}
        {/* {isError && (
          <p className="bg-red-500 text-white p-2 mt-4">{errorMessage}</p>
        )} */}

        {/* Display success message */}
        {isSuccess && data && (
          <p className="bg-green-400 text-white p-2 mt-4">{data.message}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PasswordRecoveryForm;

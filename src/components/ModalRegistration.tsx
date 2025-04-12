import {
  Button,
  Dialog,
  DialogBody,
  Checkbox,
  DialogHeader,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { InputField } from "./InputField";
import { useStandardAuthLogic } from "../auths/StandardAuth";
import { useNavigate } from "react-router-dom";
import { useGithubUserContext } from "../app/hooks";
import useGoogleAuthLogic from "../hooks/useGoogleAuthLogic";
import PasswordResetForm from "./User/PasswordRecoveryAndReset/PasswordResetForm";
import PasswordRecoveryForm from "./User/PasswordRecoveryAndReset/PasswordRecoveryForm";
// import { useGithubAuthLogic } from "../hooks/useGithubAuthLogic";

export default function ModalRegistration({
  isRegistration,
  onClose,
  onOpen,
  suppliedEmail,
  alreadyRegisteredClicked,
}: {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  onOpen: boolean;
  isRegistration: boolean;
  suppliedEmail?: string;
  alreadyRegisteredClicked?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");

  const navigate = useNavigate();

  const { loading, loginStandard, registerStandard } = useStandardAuthLogic();

  const { userData: githubUser, setGithubUserData } = useGithubUserContext();
  const { authorizeGoogle } = useGoogleAuthLogic();

  const handleAlreadyRegisteredClick = () => {
    onClose(true);
    window.setTimeout(() => {
      alreadyRegisteredClicked && alreadyRegisteredClicked(true);
    }, 700);
  };

  return (
    <Dialog
      open={onOpen}
      handler={onClose}
      size="sm"
      className="bg-secondary border-[1px] border-coal rounded-none"
    >
      <DialogHeader className="flex justify-between">
        <div className="size-5" />
        <div className="text-center ">
          <h1 className="text-white font-outfit text-lg md:text-xl ">
            {isRegistration ? "Create an account!" : "Sign in"}
          </h1>
          <p className="mt-1 text-ash text-sm mx-auto">
            {isRegistration
              ? "Welcome! register below"
              : "Please enter details below to log in"}
          </p>
        </div>
        <IconButton
          onClick={() => onClose(true)}
          variant="text"
          color="white"
          className="rounded-none outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={4}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </DialogHeader>
      <DialogBody>
        <form className="mb-2  max-w-fi  mx-auto ">
          <div className="mb-1 flex flex-col gap-2">
            <InputField
              isTextArea={false}
              value={suppliedEmail ? suppliedEmail : email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@gmail.com"
              label="Email"
              className="w-full lab"
            />
            {isRegistration && (
              <>
                <InputField
                  isTextArea={false}
                  value={userName}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="johnDoe"
                  label="Username"
                  className="w-full"
                />
              </>
            )}

            <InputField
              isTextArea={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              label="Password"
              className="w-full"
            />
          </div>
          <div>
            {isRegistration ? (
              <Checkbox
                className="rounded-none"
                label={
                  <h2 className="inline text-xs md:text-sm  items-center font-normal text-ash">
                    I agree the
                    <a
                      href="/"
                      className="font-medium transition-colors hover:text-gray-100"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </h2>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
            ) : (
              // <ResetPasswordForm />
              // <PasswordRecoveryForm />
              <p className="text-sm ">
                Forgotten password?{" "}
                <span
                  onClick={() => navigate("/password-recovery")}
                  className="text-ash cursor-pointer hover: hover:text-purple-400"
                >
                  click here to reset
                </span>
              </p>
            )}
          </div>
          {
            <Button
              onClick={(e) => {
                e.preventDefault();
                isRegistration
                  ? registerStandard(e, userName, email, password)
                  : loginStandard(e, email, password);
              }}
              className="my-4 bg-gradient-to-r  from-raisin to-purple-700  flex justify-center items-center rounded-none font-saira"
              loading={loading}
              fullWidth
            >
              {isRegistration ? "Create an account" : "Log in"}
            </Button>
          }
          {isRegistration && (
            <h2 className="my-4 text-xs md:text-sm font-outfit font-normal text-white">
              {" Already have an account?  "}
              <span
                onClick={() => handleAlreadyRegisteredClick()}
                className="underline cursor-pointer"
              >
                Sign in
              </span>
            </h2>
          )}
          <p className="text-xs text-ash">
            {isRegistration ? "or register with:" : "or sign in with:"}
          </p>
          <div className="mt-4 flex justify-between">
            <Button
              onClick={() => {
                window.location.assign(
                  "https://github.com/login/oauth/authorize?client_id=Iv23lidUetpHsRCSlAaY"
                );
              }}
              className="flex cursor-pointer gap-x-2 justify-center w-full mr-1 p-2  rounded-none bg-gradient-to-r  from-coal to-gray-900"
            >
              <img className="size-6 " src="github-mark-white.png" alt="" />
              <h2 className="content-center text-white">Github</h2>
            </Button>
            <Button
              onClick={() => {
                authorizeGoogle();
              }}
              className="flex cursor-pointer  justify-center gap-x-2 rounded-none w-full p-2 bg-gradient-to-r  from-coal to-gray-900"
            >
              <img className="size-6" src="google.png" alt="" />
              <h2 className="content-center text-white">Google</h2>
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}

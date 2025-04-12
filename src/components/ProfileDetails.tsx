import React, { useRef, useState } from "react";
import { IoIosLink } from "react-icons/io";
import { InputField } from "./InputField";
import { AnimatePresence, motion } from "framer-motion";
import { Button, Typography } from "@material-tailwind/react";
import { useUpdateUserMutation } from "../api/UsersApi";
import { FaSlack, FaYoutube } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { PiInstagramLogo, PiInstagramLogoDuotone } from "react-icons/pi";
import { GrGoogle } from "react-icons/gr";
import checkmarkAnimation from "./animations/check-mark-white.json";
import Lottie from "lottie-react";
import { UserProfile } from "../interfaces/userTypes";

export interface SocialLink {
  socialUrl: string;
}

export default function ProfileDetails({
  onClose,
  user,
}: {
  onClose: () => void;
  user: UserProfile | undefined;
}) {
  const [updateUser] = useUpdateUserMutation();

  const [saveClicked, setSaveClicked] = useState<boolean>(false);
  const [iconHovered, setIconHovered] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleSaveClick = () => {
    setSaveClicked((prev) => !prev);
    setTimeout(() => {
      onClose();
    }, 1500);
    updateUser({
      userSocials: socialUrls,
      username: username,
      bio: bio,
    });
  };

  const [socialUrls, setSocialUrls] = useState<SocialLink[]>([
    { socialUrl: user?.userSocials?.[0]?.socialUrl || "" },
    { socialUrl: user?.userSocials?.[1]?.socialUrl || "" },
    { socialUrl: user?.userSocials?.[2]?.socialUrl || "" },
  ]); //3 urls

  const handleSocialUrlChange = (index: number, value: string) => {
    setSocialUrls((prevUrls) =>
      prevUrls.map((item, i) =>
        i === index ? { ...item, socialUrl: value } : item
      )
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -1 }}
      animate={{ opacity: 1, y: 5 }}
      exit={{ opacity: 0, y: -1 }} // Smooth fade-out with downward motion
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2"
    >
      <InputField
        isTextArea={false}
        type="text"
        className="w-full"
        onChange={(e) => setUsername(e.target.value)}
        placeholder={user?.userName || ""}
        label="Username"
        value={username}
      />

      {/* <h1>About me</h1> */}
      <div className="">
        <InputField
          isTextArea
          type="text"
          placeholder={user?.bio || "Tell us about yourself"}
          label="About me"
          className="min-h-24 max-h-96 w-full"
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
      </div>

      <h1>Add socials</h1>
      <div className="flex flex-col gap-4">
        {socialUrls.map((url, index) => (
          <div className="flex items-center gap-2">
            <div className="grow">
              <InputField
                key={index}
                label=""
                type="text"
                placeholder="Link to your social account"
                className="w-full"
                value={url.socialUrl}
                onChange={(e) => handleSocialUrlChange(index, e.target.value)}
              />
            </div>
            <div>
              {url.socialUrl.includes("slack") ? (
                <FaSlack fill="#cac6bf" size={18} />
              ) : url.socialUrl.includes("google") ? (
                <GrGoogle size={18} />
              ) : url.socialUrl.includes("insta") ? (
                <PiInstagramLogoDuotone size={18} />
              ) : url.socialUrl.includes("linkedin") ? (
                <motion.div
                  onHoverStart={() => setIconHovered(true)}
                  onHoverEnd={() => setIconHovered(false)}
                >
                  <RiLinkedinFill size={18} />
                </motion.div>
              ) : (
                // </div>
                <IoIosLink size={18} />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          onClick={handleSaveClick}
          className="flex items-center gap-2 rounded-none text-center normal-case text-base font-normal  bg-gradient-to-r from-green-900 to-green-500 py-2 px-4  "
        >
          Save
          {saveClicked && (
            <div className=" my-auto size-6">
              <Lottie loop={false} animationData={checkmarkAnimation} />
            </div>
          )}
        </Button>

        <Button
          onClick={onClose}
          className="  rounded-none text-center normal-case text-base font-normal  bg-gradient-to-r from-coal to-gray-900 py-2 px-4  "
        >
          Cancel
        </Button>
      </div>
    </motion.div>
  );
}

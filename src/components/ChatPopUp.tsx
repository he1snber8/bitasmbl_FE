import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as io from "socket.io-client";
import { useGetProfileQuery } from "../api/UsersApi";
import {
  useGetProjectsQuery,
  useGetUserProjectQuery,
} from "../api/ProjectsApi";
import { IoIosMore } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "@material-tailwind/react";

const socket = io.connect("http://localhost:3001");

interface ChatMessage {
  sender: ChatUser;
  message: string;
  isCurrentUser: boolean;
}

interface ChatUser {
  username: string;
  imageUrl: string;
}

export default function ChatPopUp({
  roomId,
  onClose,
}: {
  roomId: number;
  onClose: () => void;
}) {
  // const [room, setRoom] = useState("123");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [viewProjectMembers, setViewProjectMembers] = useState<boolean>(false);

  const { data: profile } = useGetProfileQuery();
  const { data: userProject } = useGetUserProjectQuery(roomId);
  const { data: projects } = useGetProjectsQuery();

  console.log(projects);
  console.log("ROOM ID:", roomId);
  console.log(
    "found project",
    projects?.find((proj) => proj.id === roomId)?.name
  );

  // Send a chat message
  const sendMessage = () => {
    if (message.trim() === "") return;

    if (!profile || !profile.userName) return;

    const sentMessage: ChatMessage = {
      sender: {
        username: profile.userName,
        imageUrl: profile.imageUrl || "Image",
      },
      message,
      isCurrentUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, sentMessage]);

    socket.emit("send_message", {
      sender: { username: profile.userName, imageUrl: profile.imageUrl },
      message,
      chatRoom: roomId,
    });
    setMessage("");
  };

  useEffect(() => {
    const handleRoomJoin = () => {
      socket.emit("join_chat_room", roomId);
    };
    handleRoomJoin();
  }, [roomId]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on(
      "receive_message",
      (data: { sender: ChatUser; message: string }) => {
        const receivedMessage: ChatMessage = {
          sender: data.sender || "",
          message: data.message,
          isCurrentUser: data.sender.username === profile?.userName,
        };
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      }
    );

    return () => {
      socket.off("receive_message");
    };
  }, [profile]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 z-50 h-96 overflow-y-scroll bg-[#151515] rounded-t-md right-16 flex flex-col"
    >
      <div className="relative flex-grow  overflow-y-auto">
        <div className="sticky flex justify-between py-2 px-4 bg-gradient-to-l  bg-[#7434c2] z-50 top-0 left-0 w-full  border- border-concrete">
          <h1 className="text-white  my-auto">
            {profile?.projects
              ? profile?.projects?.find((proj) => proj.id === roomId)?.name
              : projects?.find((proj) => proj.id === roomId)?.name}
          </h1>
          <div className="flex items-center gap-1">
            <motion.div
              whileHover={{ backgroundColor: "#424242" }}
              className="p-2"
            >
              <IoIosMore
                onClick={() => setViewProjectMembers((prev) => !prev)}
                size={24}
              />
            </motion.div>
            <motion.div
              whileHover={{ backgroundColor: "#424242" }}
              className="p-2"
            >
              <IoMdClose size={24} onClick={() => onClose()} />
            </motion.div>
          </div>
          {viewProjectMembers && (
            <div className="absolute bg-coal p-2 border border-concrete">
              {userProject?.projectApplications.map((projectApplication) => {
                return <div>{projectApplication.applicant.userName}</div>;
              })}
            </div>
          )}
        </div>

        <div className=" h-full flex flex-col-reverse">
          <ul className="text-gray-300  flex flex-col content-end text-sm  space-y-4  mx-4">
            {messages.map((msg, index) => (
              <div
                className={`flex items-center  ${
                  msg.isCurrentUser ? "flex-row-reverse" : ""
                } gap-2`}
              >
                <Tooltip
                  className="bg-[#171717] text-wheat rounded-none"
                  content={msg.sender.username}
                  placement="top"
                >
                  {(
                    msg.isCurrentUser ? profile?.imageUrl : msg.sender?.imageUrl
                  ) ? (
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={
                        msg.isCurrentUser
                          ? profile?.imageUrl
                          : msg.sender?.imageUrl
                      }
                      alt="user profile"
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-grape/50">
                      <p className="text-purple-100 text-lg font-medium">
                        {msg.isCurrentUser
                          ? profile?.userName?.charAt(0).toUpperCase() ?? ""
                          : msg.sender?.username?.charAt(0).toUpperCase() ?? ""}
                      </p>
                    </div>
                  )}
                </Tooltip>
                <li
                  key={index}
                  className={`p-2 max-w-[250px] text-xs break-words overflow-hidden ${
                    msg.isCurrentUser
                      ? "bg-raisin border-purple-0 text-white"
                      : "bg-[#2c2e2c] border-concrete"
                  }`}
                >
                  {msg.message}
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center border-t  border-concrete gap-2 mt-2  p-4">
        <input
          placeholder="Type a message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="h-full px-2 py-1 bg-coal placeholder:text-sm text-white border border-gray-600 outline-none"
        />
        <button
          onClick={sendMessage}
          className="border border-concrete px-2 text-white h-full text-sm"
        >
          Send
        </button>
      </div>
    </motion.div>
  );
}

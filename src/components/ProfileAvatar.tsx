import { Tooltip } from "@material-tailwind/react";

interface ProfileAvatarProps {
  userName?: string;
  className?: string;
  tooltipContent?: string;
  onClick?: () => void;
}

export default function ProfileAvatar({
  userName = "",
  className = "",
  tooltipContent,
  onClick,
}: ProfileAvatarProps) {
  return (
    <Tooltip content={tooltipContent} placement="bottom">
      <div
        onClick={onClick}
        className={`${className} my-auto cursor-pointer rounded-full flex bg-grape`}
      >
        <p className="items-center size-max m-auto text-purple-100">
          {userName.charAt(0).toUpperCase() ?? ""}
        </p>
      </div>
    </Tooltip>
  );
}

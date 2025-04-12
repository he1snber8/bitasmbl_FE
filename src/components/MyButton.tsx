import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";
import classNames from "classnames";
import { IconType } from "react-icons";

export default function MyButton({
  children,
  className,
  rocket,
  onClick,
  borderColor,
  left,
}: {
  children: React.ReactNode;
  className?: string;
  absolute?: boolean;
  borderColor?: string;
  horizontal?: boolean;
  rocket?: boolean;
  left?: boolean;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={` ${className}`}
      animate={{
        borderColor: hovered ? borderColor : "",
      }}
    >
      <motion.button className="flex items-center gap-2" whileTap={{ y: 2 }}>
        <motion.div
          className="flex items-center gap-4"
          animate={{
            x: hovered ? (left ? 0 : 0) : left ? 0 : 16, // Move text and arrow together when hovered
          }}
        >
          <motion.div>{children}</motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10, y: 0 }}
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? -5 : 0, // Move left when diagonal or horizontal
              // Reset when not hovered
            }}
          >
            {rocket ? "🚀" : <MdArrowBack fill="white" />}
          </motion.div>
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

"use client";
import React from "react";
import { motion } from "motion/react";

export function CoolTextTransition({ text }: { text: string }) {
  const colors = [
    // "rgb(230, 210, 255)", // light lavender
    // "rgb(200, 160, 255)", // soft lilac
    // "rgb(180, 130, 255)", // pastel violet
    // "rgb(160, 90, 255)", // lighter purple
    "rgb(140, 60, 240)", // medium purple
    "rgb(120, 40, 220)", // royal purple
    // "rgb(100, 30, 200)", // deep purple
    "rgb(80, 20, 180)", // darker violet
    // "rgb(60, 10, 150)", // midnight purple
    // "rgb(40, 0, 120)", // very dark purple
  ];

  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{ y: 0 }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.01, 1],
            filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          className="inline-block whitespace-pre font-sans tracking-tight"
        >
          {char}
        </motion.span>
      ))}
    </>
  );
}

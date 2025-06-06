import { motion } from "framer-motion";
import { Step } from "react-joyride";

interface TooltipProps {
  continuous?: boolean;
  index?: number;
  step?: Step;
  backProps: React.HTMLAttributes<any>;
  closeProps: React.HTMLAttributes<any>;
  primaryProps: React.HTMLAttributes<any>;
  tooltipProps: React.HTMLAttributes<any>;
  // others possible
}

export const AnimatedTooltip: React.FC<TooltipProps> = ({
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}) => {
  return (
    <motion.div
      {...(tooltipProps as TooltipProps)}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: 1,
        y: [0, -5, 0, 5, 0],
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: "#171717",
        color: "white",
        padding: 16,
        borderRadius: 8,
        maxWidth: 320,
      }}
    >
      <div>{step?.content}</div>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <button {...backProps}>Back</button>
        <button {...primaryProps}>Next</button>
        <button {...closeProps}>Skip</button>
      </div>
    </motion.div>
  );
};

import { Input, Textarea } from "@material-tailwind/react";
import { motion } from "framer-motion";

type InputFieldProps = {
  label: string;
  type: string;
  value?: string;
  isTextArea?: boolean;
  placeholder: string;
  className?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export function InputField({
  label,
  type,
  value,
  placeholder,
  isTextArea,
  className,
  onChange,
}: InputFieldProps) {
  return (
    <div>
      <h2 className="md:text-lg text-base">{label}</h2>
      {isTextArea ? (
        <div>
          <motion.textarea
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            whileHover={{
              backgroundColor: "rgb(126, 24, 145, 0.1)",
              borderColor: "#9c27b0",
            }}
            className={`${className} border  border-concrete bg-transparent rounded-none p-1  hover:placeholder:text-ash/70 placeholder:text-concrete text-ash focus:outline-none`}
          />
        </div>
      ) : (
        <motion.input
          whileHover={{
            backgroundColor: "rgb(126, 24, 145, 0.1)",
            borderColor: "#7b1fa2",
          }}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} border text-sm md:text-base border-concrete bg-transparent rounded-none p-1 hover:placeholder:text-ash/70 placeholder:text-concrete text-ash focus:outline-none`}
        />
      )}
    </div>
  );
}

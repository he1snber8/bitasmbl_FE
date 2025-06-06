import React from "react";
import { IconButton, ButtonGroup } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function PAGINATION2({
  active,
  setActive,
}: {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const getItemProps = (index: number) => ({
    className: `
      ${
        active === index
          ? "opacity-90 text-white "
          : "text-concrete hover:bg-[#171717]"
      }
      bg-transparent border-[#171717]
    `,
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  return (
    <ButtonGroup className="text-ash border-[#171717] border mx-auto">
      <IconButton
        onClick={prev}
        className="text-gray-300 bg-transparent  hover:bg-[#171717] "
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>

      {[1, 2, 3, 4, 5].map((i) => (
        <IconButton key={i} {...getItemProps(i)}>
          {i}
        </IconButton>
      ))}

      <IconButton
        onClick={next}
        className="text-gray-300 bg-transparent hover:bg-[#171717]  "
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </ButtonGroup>
  );
}

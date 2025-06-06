import React from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Typography } from "@material-tailwind/react";

export function SimplePagination({
  pages,
  setActive,
  active,
}: {
  pages: number;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}) {
  const next = () => {
    if (active === 10) return;

    setActive(active + 1);
  };

  console.log("PAGESS,", pages);

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton size="sm" onClick={prev} disabled={active === 1}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-ash">{active}</strong> of{" "}
        <strong className="text-ash">{pages}</strong>
      </Typography>
      <IconButton
        size="sm"
        onClick={next}
        className=""
        disabled={active === pages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

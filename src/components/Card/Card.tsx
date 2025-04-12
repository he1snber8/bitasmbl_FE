import { cn } from "src/utils/uiutil";

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-6 rounded-xl border border-transparent bg-[rgba(34,34,34,0.9)] shadow-[0_0_12px_rgba(80,80,80,0.4)] hover:shadow-[0_0_20px_rgba(80,80,80,0.6)] transition-shadow duration-300",
        "before:content-[''] before:absolute before:inset-0 before:rounded-xl before:border before:border-[rgba(80,80,80,0.5)] before:blur-sm before:pointer-events-none",
        className
      )}
    >
      {children}
    </div>
  );
};

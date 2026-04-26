import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-white/30">
          Management
        </p>
        <h1 className="mt-0.5 text-2xl font-bold text-white">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-white/40">{description}</p>
        )}
      </div>
      {action && (
        <Button
          onClick={action.onClick}
          className="mt-3 flex items-center gap-2 bg-[#e0ff4f] font-semibold text-black hover:bg-[#d4f040] sm:mt-0"
        >
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
}
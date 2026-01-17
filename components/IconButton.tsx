import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  loading?: boolean;
}

export function IconButton({
  label,
  icon: Icon,
  onClick,
  type = "button",
  disabled = false,
  variant = "default",
  loading = false,
}: IconButtonProps) {
  return (
    <Button
      type={type}
      className="w-full cursor-pointer rounded-xl py-4 text-xs sm:w-auto sm:py-5 sm:text-sm"
      variant={variant}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <Icon className="mr-2 h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
      {label}
    </Button>
  );
}

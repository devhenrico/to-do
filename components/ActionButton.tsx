import { Button } from "@/components/ui/button";

interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  loading?: boolean;
}

export function ActionButton({
  label,
  onClick,
  type = "button",
  disabled = false,
  variant = "default",
  loading = false,
}: ActionButtonProps) {
  return (
    <Button
      type={type}
      className="cursor-pointer rounded-xl text-xs sm:text-sm"
      variant={variant}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Salvando..." : label}
    </Button>
  );
}

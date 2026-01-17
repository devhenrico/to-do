import { Eye, EyeOff } from "lucide-react";

interface PasswordVisibilityToggleProps {
  showPassword: boolean;
  onToggle: () => void;
}

export function PasswordVisibilityToggle({
  showPassword,
  onToggle,
}: PasswordVisibilityToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4" />
      ) : (
        <Eye className="h-4 w-4" />
      )}
    </button>
  );
}

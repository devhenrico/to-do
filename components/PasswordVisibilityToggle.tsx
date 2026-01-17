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
      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-colors"
    >
      {showPassword ? (
        <EyeOff className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
      ) : (
        <Eye className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5" />
      )}
    </button>
  );
}

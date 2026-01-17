import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface FormInputProps {
  id?: string;
  label?: string;
  type?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  icon?: LucideIcon;
  suffix?: React.ReactNode;
  minLength?: number;
}

export function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  icon: Icon,
  suffix,
  minLength,
}: FormInputProps) {
  const hasIcon = !!Icon;
  const hasSuffix = !!suffix;

  return (
    <div className="space-y-1 sm:space-y-1.5">
      {label && (
        <Label htmlFor={id} className="text-xs font-medium sm:text-sm">
          {label}
        </Label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="text-muted-foreground absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 sm:h-4.5 sm:w-4.5" />
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={`rounded-xl py-4 text-xs sm:py-5 sm:text-sm ${
            hasIcon ? "pl-9 sm:pl-10" : ""
          } ${hasSuffix ? "pr-10 sm:pr-12" : ""}`}
          required={required}
          minLength={minLength}
        />
        {suffix && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 sm:right-4">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}

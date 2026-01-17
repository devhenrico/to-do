import { useState } from "react";
import { Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordVisibilityToggle } from "@/components/PasswordVisibilityToggle";

interface PasswordInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  label?: string;
  minLength?: number;
}

export function PasswordInput({
  id = "password",
  value,
  onChange,
  placeholder = "••••••••",
  required = true,
  label = "Senha",
  minLength = 6,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10 rounded-xl"
          required={required}
          minLength={minLength}
        />
        <PasswordVisibilityToggle
          showPassword={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
      </div>
    </div>
  );
}

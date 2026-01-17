import { useState } from "react";
import { Lock } from "lucide-react";
import { FormInput } from "@/components/FormInput";
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
    <FormInput
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      icon={Lock}
      minLength={minLength}
      suffix={
        <PasswordVisibilityToggle
          showPassword={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
        />
      }
    />
  );
}

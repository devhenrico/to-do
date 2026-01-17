import { useState } from "react";
import { EmailInput } from "@/components/Auth/EmailInput";
import { PasswordInput } from "@/components/Auth/PasswordInput";
import { AuthFormFooter } from "@/components/Auth/AuthFormFooter";
import { toast } from "@/components/ui/sonner";
import { SubmitButton } from "@/components/SubmitButton";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit(email, password);
      toast.success("Login realizado com sucesso!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Credenciais inválidas";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <EmailInput value={email} onChange={setEmail} />
        <PasswordInput value={password} onChange={setPassword} />
      </div>
      <div className="flex flex-col space-y-4 mt-6">
        <SubmitButton
          label="Entrar"
          loadingLabel="Entrando..."
          loading={loading}
        />
        <AuthFormFooter
          text="Não tem uma conta?"
          linkText="Registre-se"
          href="/register"
        />
      </div>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { AuthCard } from "@/components/Auth/AuthCard";
import { LoginForm } from "@/components/Auth/LoginForm";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirecionar se já estiver autenticado
  if (isAuthenticated) {
    router.push("/tasks");
    return null;
  }

  const handleLoginSubmit = async (email: string, password: string) => {
    await login(email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-3 py-8 sm:px-4">
      <AuthCard
        title="Login"
        description="Entre com suas credenciais para acessar suas tarefas"
      >
        <LoginForm onSubmit={handleLoginSubmit} />
      </AuthCard>
    </div>
  );
}

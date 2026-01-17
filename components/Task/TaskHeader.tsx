import { LogOut, Logs } from "lucide-react";
import { User } from "@/lib/auth";
import { IconButton } from "@/components/IconButton";

interface TaskHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export function TaskHeader({ user, onLogout }: TaskHeaderProps) {
  return (
    <header className="sticky top-4 z-50 mx-auto max-w-6xl px-3 sm:px-4">
      <div className="flex flex-col gap-3 rounded-2xl border bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <Logs className="h-6 w-6 sm:h-8 sm:w-8" />
          <h1 className="text-lg font-bold sm:text-2xl">
            Gerenciador de Tarefas
          </h1>
        </div>
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
          <span className="text-muted-foreground text-xs font-medium sm:text-sm">
            Olá, {user?.name || "usuário"}
          </span>
          <IconButton
            label="Sair"
            icon={LogOut}
            onClick={onLogout}
            variant="outline"
          />
        </div>
      </div>
    </header>
  );
}

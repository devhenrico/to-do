import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCircle2, Circle } from "lucide-react";
import { Task } from "@/lib/tasks";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (task: Task) => void;
}

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}: TaskCardProps) {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case "completed":
        return "Concluída";
      case "in_progress":
        return "Em progresso";
      case "cancelled":
        return "Cancelada";
      default:
        return "Pendente";
    }
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <CardTitle className="mb-1 truncate text-base sm:mb-2 sm:text-lg">
              {task.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-xs sm:text-sm">
              {task.description || "Sem descrição"}
            </CardDescription>
          </div>
          <button
            onClick={() => onToggleStatus(task)}
            className="ml-0 cursor-pointer sm:ml-2"
          >
            {task.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <span className="text-muted-foreground">Pomodoros:</span>
            <span className="font-medium">
              {task.completedPomodori} / {task.totalPomodori}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <span className="text-muted-foreground">Duração:</span>
            <span className="font-medium">{task.pomodoroValue} min</span>
          </div>
          {task.taskDate && (
            <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <span className="text-muted-foreground">Data da Tarefa:</span>
              <span className="font-medium">
                {new Date(task.taskDate).toLocaleDateString("pt-BR")}
              </span>
            </div>
          )}
          {task.dueDate && (
            <div className="flex flex-col gap-1 text-xs sm:flex-row sm:items-center sm:justify-between sm:text-sm">
              <span className="text-muted-foreground">Vencimento:</span>
              <span className="font-medium">
                {new Date(task.dueDate).toLocaleDateString("pt-BR")}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span
              className={`w-fit rounded-full px-2 py-1 text-xs ${getStatusColor(
                task.status,
              )}`}
            >
              {getStatusLabel(task.status)}
            </span>
            <div className="flex gap-2">
              <Button
                className="h-8 w-8 cursor-pointer sm:h-9 sm:w-9"
                variant="ghost"
                size="icon"
                onClick={() => onEdit(task)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                className="h-8 w-8 cursor-pointer sm:h-9 sm:w-9"
                variant="ghost"
                size="icon"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="text-destructive h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

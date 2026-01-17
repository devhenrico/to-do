import { Card, CardContent } from "@/components/ui/card";
import { Plus, ClipboardList } from "lucide-react";
import { Task } from "@/lib/tasks";
import { TaskCard } from "@/components/Task/TaskCard";
import { IconButton } from "@/components/IconButton";

interface TaskMainProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (task: Task) => void;
  onCreateTask: () => void;
}

export function TaskMain({
  tasks,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
  onCreateTask,
}: TaskMainProps) {
  return (
    <main className="mx-auto max-w-6xl px-3 py-16 sm:px-4 sm:py-20">
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold sm:text-xl">Atividades</h2>
        <IconButton label="Nova Tarefa" icon={Plus} onClick={onCreateTask} />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      ) : tasks.length === 0 ? (
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="px-4 py-8 text-center sm:py-12">
            <ClipboardList className="text-muted-foreground mx-auto mb-3 h-12 w-12 sm:mb-4 sm:h-14 sm:w-14" />
            <p className="text-muted-foreground text-sm sm:text-base">
              Nenhuma tarefa encontrada
            </p>
            <div className="mt-4 flex justify-center">
              <IconButton
                label="Criar primeira tarefa"
                icon={Plus}
                onClick={onCreateTask}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
            />
          ))}
        </div>
      )}
    </main>
  );
}

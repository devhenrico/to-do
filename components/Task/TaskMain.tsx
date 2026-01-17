import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Task } from "@/lib/tasks";
import { TaskCard } from "@/components/Task/TaskCard";

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
    <main className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Atividades</h2>
        <Button className="cursor-pointer rounded-xl" onClick={onCreateTask}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Tarefa
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : tasks.length === 0 ? (
        <Card className="rounded-2xl">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
            <Button
              onClick={onCreateTask}
              className="mt-4 cursor-pointer rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar primeira tarefa
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

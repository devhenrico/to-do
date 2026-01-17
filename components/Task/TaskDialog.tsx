"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormInput } from "@/components/FormInput";
import { ActionButton } from "@/components/ActionButton";
import { taskService, Task, CreateTaskData } from "@/lib/tasks";
import { toast } from "@/components/ui/sonner";
import { USE_OFFLINE_MODE } from "@/lib/config";

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
}

export function TaskDialog({ open, onClose, task }: TaskDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateTaskData>({
    title: "",
    description: "",
    totalPomodori: 4,
    pomodoroValue: 25,
    completedPomodori: 0,
    status: "pending",
    taskDate: "",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        totalPomodori: task.totalPomodori,
        pomodoroValue: task.pomodoroValue,
        completedPomodori: task.completedPomodori,
        status: task.status || "pending",
        taskDate: task.taskDate || "",
        dueDate: task.dueDate || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        totalPomodori: 4,
        pomodoroValue: 25,
        completedPomodori: 0,
        status: "pending",
        taskDate: "",
        dueDate: "",
      });
    }
  }, [task, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (USE_OFFLINE_MODE) {
        // Modo offline: Usar localStorage
        const storedTasks = localStorage.getItem("tasks");
        const tasks: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

        if (task) {
          // Atualizar tarefa existente
          const index = tasks.findIndex((t) => t.id === task.id);
          if (index !== -1) {
            tasks[index] = { ...task, ...formData };
            localStorage.setItem("tasks", JSON.stringify(tasks));
            toast.success("Tarefa atualizada com sucesso");
          }
        } else {
          // Criar nova tarefa
          const newTask: Task = {
            id: Math.max(0, ...tasks.map((t) => t.id)) + 1,
            ...formData,
            completedPomodori: formData.completedPomodori || 0,
            createdAt: new Date().toISOString(),
          };
          tasks.push(newTask);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          toast.success("Tarefa criada com sucesso");
        }

        // Disparar evento para atualizar lista na página
        window.dispatchEvent(new Event("tasks-updated"));
      } else {
        // Modo com backend: Usar API
        if (task) {
          await taskService.update(task.id, formData);
          toast.success("Tarefa atualizada com sucesso");
        } else {
          await taskService.create(formData);
          toast.success("Tarefa criada com sucesso");
        }
        // Disparar evento para atualizar lista na página
        window.dispatchEvent(new Event("tasks-updated"));
      }

      onClose();
    } catch (error: unknown) {
      let message = "Erro ao salvar tarefa";
      if (error instanceof Error) {
        message = error.message;
      } else if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        message = String(error.response.data.message);
      }
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="mx-auto max-h-[90vh] max-w-sm overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {task ? "Editar Tarefa" : "Nova Tarefa"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm">
            {task
              ? "Atualize os dados da tarefa"
              : "Preencha os dados para criar uma nova tarefa"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-3 py-3 sm:gap-4 sm:py-4">
            <FormInput
              id="title"
              label="Título *"
              type="text"
              value={formData.title}
              onChange={(value) =>
                setFormData({ ...formData, title: value })
              }
              required
            />
            <div className="grid gap-1.5 sm:gap-2">
              <Label htmlFor="description" className="text-xs sm:text-sm">
                Descrição
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="resize-none rounded-xl text-xs sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <FormInput
                id="totalPomodori"
                label="Total de Pomodoros *"
                type="number"
                value={String(formData.totalPomodori)}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    totalPomodori: parseInt(value) || 1,
                  })
                }
                required
              />
              <FormInput
                id="pomodoroValue"
                label="Duração (min) *"
                type="number"
                value={String(formData.pomodoroValue)}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    pomodoroValue: parseInt(value) || 1,
                  })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <FormInput
                id="taskDate"
                label="Data da Tarefa"
                type="date"
                value={formData.taskDate}
                onChange={(value) =>
                  setFormData({ ...formData, taskDate: value })
                }
              />
              <FormInput
                id="dueDate"
                label="Data de Vencimento"
                type="date"
                value={formData.dueDate}
                onChange={(value) =>
                  setFormData({ ...formData, dueDate: value })
                }
              />
            </div>
            <div className="grid gap-1.5 sm:gap-2">
              <Label htmlFor="status" className="text-xs sm:text-sm">
                Status
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full rounded-xl border px-3 py-2 text-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:h-10 sm:text-sm"
              >
                <option value="pending">Pendente</option>
                <option value="in_progress">Em Progresso</option>
                <option value="completed">Concluída</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
            {task && (
              <FormInput
                id="completedPomodori"
                label="Pomodoros Completos"
                type="number"
                value={String(formData.completedPomodori)}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    completedPomodori: parseInt(value) || 0,
                  })
                }
              />
            )}
          </div>
          <DialogFooter className="mt-4 flex flex-col-reverse gap-2 sm:mt-6 sm:flex-row sm:gap-3">
            <ActionButton
              label="Cancelar"
              type="button"
              variant="outline"
              onClick={onClose}
            />
            <ActionButton
              label={task ? "Atualizar" : "Criar"}
              type="submit"
              disabled={loading}
              loading={loading}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

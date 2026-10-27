import useLocalStorageState from "use-local-storage-state";
import { type Task, TASKS_KEY } from "../models/task";

export default function useTasks() {
  const [tasks] = useLocalStorageState<Task[]>(TASKS_KEY, {
    defaultValue: [] 
  });

  const safeTasks = tasks || [];

  return {
    tasks: safeTasks,
    tasksCount: safeTasks.length,
    concludedTasksCount: safeTasks.filter((task) => task.concluded).length,
  };
}
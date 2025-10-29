import type { Task } from "../types/todoApi";
import { Flame, Trash } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  label: string;
  icon: string;
}

interface TaskListProps {
  tasks: Task[];
  categories: Category[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({
  tasks,
  categories,
  onToggle,
  onDelete,
}: TaskListProps) {
  return (
    <ul className="mx-auto max-w-2xl font-sans">
      {tasks.map((task, index) => {
        const cat = categories.find((c) => c._id === task.categoryId) ?? {
          label: "Non classée",
          icon: "❓",
        };
        return (
          <li
            key={task._id || `task-${index}`}
            className={` ${
              task.isDone
                ? "bg-orange-200 line-through  font-sans"
                : ""
            }font-sans bg-white border-2 border-orange-300/50 hover:border-orange-300 rounded-2xl p-4 mb-2`}
          >
            <input
              type="checkbox"
              onChange={() => onToggle(task._id)}
              className="mr-2 accent-orange-500 focus:ring-orange-500"
              checked={task.isDone}
            />
            <section className="flex flex-row items-center justify-between w-full">
              <p className="mr-2">{task.title}</p>

              <button
                onClick={() => onDelete(task._id)}
                className="bg-transparent rounded-sm p-2 border-none hover:bg-orange-200/50 text-orange-500"
              >
                <Trash size={20} />
              </button>
            </section>

            <div className="text-left w-fit mr-2 text-[0.7rem] border-2 border-orange-300 rounded-xl p-1 px-1 bg-orange-100 mb-1">
              <span className="mr-1">{cat.icon}</span>
              <span>{cat.label}</span>
            </div>
            <div className="w-fit text-left mr-2 text-[0.7rem] border-2 border-orange-300 rounded-xl p-1 px-1 bg-orange-100">
              <p>
                {task.deadline
                  ? new Date(task.deadline).toLocaleDateString("fr-FR")
                  : <Flame className="text-orange-500" size={13}/>}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

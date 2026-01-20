import type { Task } from "../types/todoApi";
import { Archive, Calendar, Clock, Flag, Trash } from "lucide-react";
import Countdown from "./Countdown";
import MessageConfirmation from "./message";
import { useState } from "react";

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
  onArchive: (id: string) => void;
}

export default function TaskList({
  tasks,
  categories,
  onToggle,
  onDelete,
  onArchive,
}: TaskListProps) {
  const [openMessage, setOpenMessage] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const openConfirmation = (id: string) => {
    setSelectedTask(id);
    setOpenMessage(true);
  };
  const closeConfirmation = () => {
    setOpenMessage(false);
    setSelectedTask(null);
  };
  const handleDelete = () => {
    if (selectedTask) {
      onDelete(selectedTask);
      closeConfirmation();
    }
  };

  return (
    <>
      {openMessage && (
        <MessageConfirmation
          onDelete={handleDelete}
          onCancel={closeConfirmation}
        />
      )}
      <ul className="mx-auto max-w-3xl font-sans">
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
                  ? "bg-orange-50 line-through p-4 rounded-2xl mb-2 font-sans mx-2 sm:mx-0 "
                  : task.status === "archived"
                  ? "bg-orange-50 p-4 rounded-2xl mb-2 font-sans mx-2 sm:mx-0"
                  : "mx-2 sm:mx-0 font-sans bg-white border-2 border-orange-300/50 hover:border-orange-300 rounded-2xl p-4 mb-2"
              } `}
            >
              <section className="flex flex-row items-center justify-between w-full">
                <input
                  type="checkbox"
                  onChange={() => onToggle(task._id)}
                  className="mr-2 accent-orange-500 focus:ring-orange-500"
                  checked={task.isDone}
                />
                <p className=" sm:mb-0 break-words whitespace-normal max-w-[calc(100%-3rem)] sm:max-w-md w-full">
                  {task.title}
                </p>

                {task.isArchived ? (
                  <button
                    onClick={() => openConfirmation(task._id)}
                    className="bg-transparent rounded-sm p-2 border-none hover:bg-orange-200/50 text-orange-500"
                    title="Supprimer la tâche"
                  >
                    <Trash size={20} />
                  </button>
                ) : (
                  <button
                    onClick={() => onArchive(task._id)}
                    className="bg-transparent rounded-sm p-2 border-none hover:bg-orange-200/50 text-orange-500"
                    title="Archiver la tâche"
                  >
                    <Archive size={20} />
                  </button>
                )}
                {task.priority === "high" ? (
                  <span className="ml-2 text-red-600 font-bold" title="Priorité Haute ">
                    <Flag size={16} className="text-red-800"/>
                  </span>
                ) : task.priority === "medium" ? (
                  <span className="ml-2 text-yellow-600 font-bold" title="Priorité moyenne">
                    <Flag size={16} className="text-yellow-800"/>
                  </span>
                ) : task.priority === "low" ? (
                  <span className="ml-2 text-green-600 font-bold" title="Priorité Basse">
                    <Flag size={16} className="text-green-800"/>
                  </span>
                ) : null}
              </section>
              <section className="flex flex-col sm:flex-row mt-2 ">
                <div className="flex gap-1 text-left w-fit mr-2 text-[0.875rem] border-2 border-orange-300 rounded-xl p-1 px-2 bg-orange-100 mb-1">
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </div>
                {task.deadline ? (
                  <>
                    <div className="flex items-center w-fit text-left mr-2 text-[0.875rem] border-2 border-blue-300 rounded-xl p-1 px-2 bg-blue-50 mb-1">
                      <Calendar size={14} className="mr-1 text-blue-600" />
                      {new Date(task.deadline).toLocaleDateString("fr-FR")}
                    </div>
                    <Countdown deadline={task.deadline} />
                  </>
                ) : null}
                {task.status === "overdue" && (
                  <div className="flex items-center w-fit gap-1 text-[0.875rem] font-semibold text-red-600 border-2 border-red-600 rounded-2xl py-1 px-2 bg-red-100 font-sans mb-1">
                    <Clock size={14} /> En retard
                  </div>
                )}
              </section>
            </li>
          );
        })}
      </ul>
    </>
  );
}

import { X } from "lucide-react";
import Button from "./ui/Button";


export default function MessageConfirmation({
  onDelete,
  onCancel,
}: {
  onDelete: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col mx-2 mb-2 sm:mx-0 justify-center bg-orange-300 border-l-4 border-orange-500 text-orange-700 p-4 backdrop:blur-lg rounded-lg shadow-md ">
      <button
        className="text-right text-orange-700 border-none bg-transparent hover:scale-125 self-end transition-transform ease-in"
        aria-label="Close Message"
        onClick={onCancel}
      >
        <X size={18} />
      </button>
      <p className="my-2 font-semibold text-center">
        Etes-vous sûr de vouloir supprimer cette tâche ?
      </p>
      <p className="text-sm text-center max-w-sm mx-auto">
        Vous perdrez toutes les données associées à cette tâche.
      </p>
      <div className="flex justify-center gap-4 pt-2">
        <Button
          aria-label="Supprimer la tâche"
          onClick={() => {
            onDelete();
          }}
        >
          Supprimer
        </Button>
        <Button
          variant="ghost"
          aria-label="Annuler la suppression"
          onClick={() => {onCancel();}}
        >
          Annuler
        </Button>
      </div>
    </div>
  );
}

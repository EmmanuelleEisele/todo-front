import { Clock } from "lucide-react";
import{ useEffect, useState } from "react";
// Composant pour afficher un compte à rebours jusqu'à la deadline
export default function Countdown({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    function updateCountdown() {
      const now = new Date();
      const end = new Date(deadline);
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft("");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      if (days > 0) {
        setTimeLeft(`${days}j ${hours.toString().padStart(2, '0')}h`);
      } else {
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}m`);
      }
    }
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [deadline]);

  return timeLeft ? (
    <div className="text-[0.875rem] font-semibold text-red-600 border-2 border-red-600 rounded-2xl py-1 px-2 bg-red-100 font-sans mb-1"><Clock size={14} /> {timeLeft}</div>
  ) : null;
}

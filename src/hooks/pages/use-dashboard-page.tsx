import { useEffect, useState } from "react";

export default function useDashboardPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedHour = currentDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return {
    formattedHour,
    formattedDate,
  };
}

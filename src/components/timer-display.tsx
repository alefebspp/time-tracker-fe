import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  label: string;
};

export default function TimerDisplay({ value, label }: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 300); // duração do pulse
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="w-1/3 flex flex-col items-center gap-4 lg:gap-6">
      <div className="w-full relative h-20 lg:h-36 flex justify-center items-center bg-[#E9E9E9] text-app-gray-dark rounded-lg shadow-md transition-all duration-300">
        <span
          className={cn("text-4xl font-semibold", {
            "animate-soft-ping": animate,
          })}
        >
          {value}
        </span>
      </div>
      <p className="text-app-gray-standard text-lg">{label}</p>
    </div>
  );
}

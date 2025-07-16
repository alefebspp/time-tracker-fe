import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { differenceInSeconds } from "date-fns";
import { LogIn, LogOut } from "lucide-react";
import { Record } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  date: string;
  records: Record[];
};

export default function RecordHistory({ date, records }: Props) {
  const totalTime = calculateTotalTime(records);

  function calculateTotalTime(records: Record[]): string {
    let totalSeconds = 0;
    let startTime: Date | null = null;

    for (const record of records) {
      if (record.type === "start") {
        startTime = toZonedTime(record.createdAt, "UTC");
      } else if (record.type === "end" && startTime) {
        const endTime = toZonedTime(record.createdAt, "UTC");
        totalSeconds += differenceInSeconds(endTime, startTime);
        startTime = null;
      }
    }

    if (startTime) {
      totalSeconds += differenceInSeconds(new Date(), startTime);
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <article className="w-full flex flex-col gap-6 border-b border-app-gray-border py-4">
      <h3 className="text-app-gray-dark text-3xl font-semibold">{date}</h3>
      <div className="flex flex-col gap-6">
        {records.map((r) => (
          <div key={r.id} className="flex items-center gap-2">
            <div
              className={cn(
                "w-14 h-12 rounded-md flex justify-center items-center bg-[#E9E9E9] text-app-gray-dark shadow-md",
                {
                  "bg-blue-500 text-white": r.type === "start",
                }
              )}
            >
              {r.type === "start" ? <LogIn /> : <LogOut />}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-app-gray-dark text-lg">
                {formatInTimeZone(r.createdAt, "UTC", "HH:mm")}
              </span>
              <span className="text-app-gray-light text-lg">
                {r.type === "start" ? "Entrada" : "Saída"}
              </span>
            </div>
          </div>
        ))}
      </div>
      <span className="font-semibold text-app-gray-dark">{totalTime}</span>
    </article>
  );
}

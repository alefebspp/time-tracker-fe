import RecordsTable from "@/components/records-table";
import Timer from "@/components/timer";
import useTimer from "@/components/timer/use-timer";
import useDashboardPage from "@/hooks/pages/use-dashboard-page";

export default function DashboardPage() {
  const { formattedHour, formattedDate } = useDashboardPage();
  const timerProps = useTimer();

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-4 mb-8">
        <h1 className="text-app-gray-dark text-6xl font-semibold">
          {formattedHour}
        </h1>
        <p className="text-lg text-app-gray-light">{formattedDate}</p>
      </div>
      <Timer {...timerProps} />
      <RecordsTable className="pb-4 lg:pb-16" />
    </div>
  );
}

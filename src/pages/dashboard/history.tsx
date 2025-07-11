import useHistoryPage from "@/hooks/pages/use-history-page";

import RecordHistory from "@/components/record-history";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const { records, hasMore, loadMoreRecords, isLoading } = useHistoryPage();

  return (
    <section className="w-full flex flex-col gap-4">
      <h2 className="text-app-gray-dark text-center lg:text-left font-semibold text-2xl">
        Histórico
      </h2>
      <p className="text-lg text-center lg:text-left text-app-gray-light">
        Veja registros do dia atual e de dias anteriores
      </p>

      <div className="flex flex-col border-t border-app-gray-border">
        {records.map((r) => (
          <RecordHistory key={r.date} {...r} />
        ))}
      </div>
      {hasMore && (
        <Button
          className="lg:w-1/3 mx-auto"
          isLoading={isLoading}
          onClick={loadMoreRecords}
        >
          Ver mais
        </Button>
      )}
    </section>
  );
}

import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { format as tzFormat, toZonedTime } from "date-fns-tz";

import { getAllRecords } from "@/services/records";
import { Record } from "@/types";

export default function useRecordsTable() {
  const now = format(new Date(), "yyyy-MM-dd");
  const timeZone = "America/Sao_Paulo";

  const { data: records, isLoading } = useQuery({
    queryFn: async () => getAllRecords(`?startDate=${now}&endDate=${now}`),
    queryKey: ["today-records"],
    refetchOnWindowFocus: false,
  });

  const toReturnRecords = records?.data || [];
  const recordTypeMap = {
    start: "Início",
    end: "Saída",
  };

  function returnZonedFormattedTime(record: Record) {
    return tzFormat(toZonedTime(new Date(record.createdAt), "UTC"), "HH:mm", {
      timeZone,
    });
  }

  return {
    records: toReturnRecords,
    isLoading,
    recordTypeMap,
    returnZonedFormattedTime,
  };
}

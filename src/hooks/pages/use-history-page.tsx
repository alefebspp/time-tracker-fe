import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getAllRecords } from "@/services/records";
import { Record as RecordType } from "@/types";
import { formatInTimeZone } from "date-fns-tz";

export default function useHistoryPage() {
  const [records, setRecords] = useState<
    {
      date: string;
      records: RecordType[];
    }[]
  >([]);
  const [offset, setOffset] = useState(0);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const { data, ...response } = await getAllRecords(`offset=${offset}`);

      const formattedRecords = groupRecordsByDate(data);

      setRecords((prev) => [...prev, ...formattedRecords]);

      return {
        data: formattedRecords,
        ...response,
      };
    },
    queryKey: ["records", offset],
    refetchOnWindowFocus: false,
  });

  function groupRecordsByDate(records: RecordType[]) {
    const groups: Record<string, RecordType[]> = {};

    records.forEach((record) => {
      const date = formatInTimeZone(record.createdAt, "UTC", "dd/MM/yyyy");

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(record);
    });

    return Object.entries(groups).map(([date, records]) => ({
      date,
      records,
    }));
  }

  function loadMoreRecords() {
    setOffset((prev) => prev + 10);
  }

  return {
    records,
    isLoading,
    hasMore: data?.hasMore,
    loadMoreRecords,
  };
}

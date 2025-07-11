import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toZonedTime } from "date-fns-tz";

import { createRecord, getAllRecords } from "@/services/records";
import { TimerProps } from ".";
import { returnErrorMessage } from "@/utils";

export default function useTimer(): TimerProps {
  const [elapsed, setElapsed] = useState(0);
  const [actionInProgress, setActionInProgress] = useState<
    "start" | "end" | null
  >(null);

  const queryClient = useQueryClient();

  const { data: records, isLoading } = useQuery({
    queryFn: async () => getAllRecords(`?startDate=${now}&endDate=${now}`),
    queryKey: ["today-records"],
    refetchOnWindowFocus: false,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createRecord,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["today-records"] });
    },
  });

  const toReturnRecords = records?.data || [];

  const startRecord = toReturnRecords.find(({ type }) => type === "start");
  const endRecord = toReturnRecords.find(({ type }) => type === "end");
  const now = format(new Date(), "yyyy-MM-dd");

  const time = useMemo(() => {
    const alreadyRegisteredRecords =
      startRecord?.createdAt && endRecord?.createdAt;

    if (alreadyRegisteredRecords) {
      const startedAt = toZonedTime(startRecord.createdAt, "UTC");
      const endedAt = toZonedTime(endRecord.createdAt, "UTC");
      const diffSeconds = Math.floor(
        (endedAt.getTime() - startedAt.getTime()) / 1000
      );

      return {
        hours: Math.floor(diffSeconds / 3600),
        minutes: Math.floor((diffSeconds % 3600) / 60),
        seconds: diffSeconds % 60,
      };
    }

    return {
      hours: Math.floor(elapsed / 3600),
      minutes: Math.floor((elapsed % 3600) / 60),
      seconds: elapsed % 60,
    };
  }, [elapsed, startRecord?.createdAt, endRecord?.createdAt]);

  async function handleRecord(type: "start" | "end") {
    try {
      setActionInProgress(type);
      await mutateAsync({ type, createdAt: new Date().toISOString() });
    } catch (error) {
      const message = returnErrorMessage(error);
      toast.error(message);
    } finally {
      setActionInProgress(null);
    }
  }

  const startSession = async () => handleRecord("start");
  const endSession = async () => handleRecord("end");

  useEffect(() => {
    if (!startRecord?.createdAt || endRecord) {
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const startedAt = toZonedTime(startRecord.createdAt, "UTC");

      const seconds = Math.floor((now.getTime() - startedAt.getTime()) / 1000);
      setElapsed(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [startRecord?.createdAt, endRecord]);

  return {
    isLoading,
    startRecord,
    endRecord,
    startSession,
    endSession,
    isMutating: isPending,
    actionInProgress,
    time,
  };
}

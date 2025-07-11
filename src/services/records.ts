import api from "@/lib/axios";
import { Record } from "@/types";

export type GetAllRecordsResponse = {
  data: Record[];
  total: number;
  nextOffset: number | null;
  hasMore: boolean;
};

export async function getAllRecords(params?: string) {
  let url = "/record";

  if (params) {
    const searchParams = new URLSearchParams(params);
    const queryString = searchParams.toString();

    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const response = await api.get<GetAllRecordsResponse>(url);

  return response.data;
}

export async function createRecord(body: {
  type: "start" | "end";
  createdAt: string;
}) {
  const response = await api.post<{
    message: string;
  }>("/record", body);

  return response;
}

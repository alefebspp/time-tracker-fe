import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useRecordsTable from "./use-records-table";

export default function RecordsTable() {
  const { records, recordTypeMap, returnZonedFormattedTime } =
    useRecordsTable();

  if (records.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="text-app-gray-dark text-center lg:text-left font-semibold text-2xl">
        Registros de hoje
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/2 text-app-gray-dark px-4 py-3">
              Horário
            </TableHead>
            <TableHead className="w-1/2 text-app-gray-dark px-4 py-3">
              Tipo
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{returnZonedFormattedTime(r)}</TableCell>
              <TableCell>{recordTypeMap[r.type]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

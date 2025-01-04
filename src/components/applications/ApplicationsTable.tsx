import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { updateApplicationStatus } from "@/api/applicationsApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUpdate from "@/hooks/useUpdate";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { getApplicationsForJob } from "@/api/jobsApi";
import { applicationsType } from "@/utils/database.types";
import useFetch from "@/hooks/useFetch";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  jobId: string;
}

export function ApplicationsTable<TData, TValue>({
  columns,
  data: initialData,
  jobId,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(initialData);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const {
    data: applications,
    loading: loadingApplications,
    fetchData: fetchApplications,
    error,
  } = useFetch<applicationsType>(getApplicationsForJob);
  const {
    fn: updateApplicationStatusFn,
    loading: loadingUpdateApplicationStatus,
  } = useUpdate(updateApplicationStatus);
  useEffect(() => {
    if (applications) setData(applications as TData[]);
  }, [applications]);
  function handleDownloadTable(href: string) {
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.click();
  }
  async function handleUpdateStatus(
    applicationId: string,
    status: string
  ): Promise<void> {
    await updateApplicationStatusFn(
      "Status updated successfully",
      "Error updating status",
      applicationId,
      status
    );
    await fetchApplications(jobId);
  }

  return (
    <div className=" bg-white dark:bg-black w-full rounded-md border  border-neutral-700 dark:border-neutral-200">
      <Table className="">
        <TableHeader className="border-b-2 border-neutral-700 dark:border-neutral-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-2xl text-black dark:text-white "
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="text-xl  capitalize"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="" key={cell.id}>
                    {(() => {
                      switch (cell.column.id) {
                        case "resume":
                          return (
                            <Download
                              size={18}
                              onClick={() =>
                                handleDownloadTable(cell.getValue() as string)
                              }
                              className="h-8 w-8 p-2  cursor-pointer dark:bg-white dark:text-black bg-black text-white rounded-full"
                            />
                          );
                        case "status":
                          return (
                            <Select
                              value={cell.getValue() as string}
                              onValueChange={(value) =>
                                handleUpdateStatus(row.getValue("id"), value)
                              }
                            >
                              <SelectTrigger className="w-[180px] capitalize">
                                <SelectValue
                                  placeholder={cell.getValue() as string}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="applied">
                                    Applied
                                  </SelectItem>
                                  <SelectItem value="interviewing">
                                    Interviewing
                                  </SelectItem>
                                  <SelectItem value="hired">Hired</SelectItem>
                                  <SelectItem value="rejected">
                                    Rejected
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          );

                        default:
                          return flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          );
                      }
                    })()}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

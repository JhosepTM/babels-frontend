import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useReload } from "@/stores/useReload";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  fetchFn: (pageNumber: number, pageSize: number) => Promise<TData[]>;
  size?: number;
  inputPlaceholder?: string;
  searchKey?: string;
}

export function AdvancedDataTable<TData, TValue>({
  columns,
  fetchFn,
  inputPlaceholder,
  searchKey,
}: DataTableProps<TData, TValue>) {
  const { reload } = useReload();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(10);
  const [pagedData, setPagedData] = useState<TData[]>([]);
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["data", pageNumber, pageSize],
    queryFn: () => fetchFn(pageNumber, pageSize),
  });

  useEffect(() => {
    console.log("reload");
    setPageNumber(0);
    refetch();
  }, [reload, refetch]);

  const table = useReactTable({
    data: pagedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  useEffect(() => {
    if (data) {
      setPagedData(data);
    }
  }, [data]);

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder={inputPlaceholder ?? "Search..."}
          value={
            (table.getColumn(searchKey ?? "")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchKey ?? "")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
          disabled={pageNumber === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={pagedData.length < pageSize}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

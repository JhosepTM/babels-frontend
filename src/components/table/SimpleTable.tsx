import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SimpleTableRowItem } from "@/interfaces/Table";

interface SimpleDataTableProps {
  caption?: string;
  columns: SimpleTableRowItem[];
  rows: SimpleTableRowItem[][];
}

const badgeColor = (type: string) => {
  if (type === "rounded") {
    return "h-2.5 w-2.5 shrink-0 rounded-sm";
  } else if (type === "line") {
    return "w-1 shrink-0 rounded";
  }
  return "";
};

export const SimpleTable = ({
  caption,
  columns,
  rows,
}: SimpleDataTableProps) => {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead className={column.className} key={index}>
              {column.value}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row[0].value}>
            {row.map((cell, index) => (
              <TableCell className={cell.className} key={index}>
                <div className={cell.color ? "flex space-x-3" : ""}>
                  {cell.color && (
                    <span
                      className={`${cell.color} ${badgeColor(
                        cell.badgeType || "line"
                      )}`}
                      aria-hidden={true}
                    />
                  )}
                  <span>{cell.value}</span>
                </div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

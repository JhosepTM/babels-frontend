import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Revenue } from "@/types/Revenue";
import { ColumnDef } from "@tanstack/react-table";
import { CirclePlus } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdvancedDataTable } from "@/components/table/AdvancedDataTable";
import { RevenueForm } from "../components/RevenueForm";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RevenueDetail } from "@/components/RevenueDetail";
import { format } from "date-fns";
import { fetchRevenue } from "@/utils/Fetcher";
import { useReload } from "@/stores/useReload";

export const RevenuePage = () => {
  const { reload, toggle } = useReload();
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string | null>(null);
  const [dialogDescription, setDialogDescription] = useState<string | null>(
    null
  );
  const [children, setChildren] = useState<React.ReactNode | null>(null);

  const columns: ColumnDef<Revenue>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="inline-block 2xl:max-w-64 xl:max-w-56 md:max-w-28 overflow-hidden text-ellipsis text-nowrap">
          {row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ row }) => {
        format(row.original.date, "dd/MM/yyyy");
      },
    },
    { accessorKey: "title", header: "Titulo" },
    { accessorKey: "category", header: "Categoría" },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Monto</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-BO", {
          style: "currency",
          currency: "BOB",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    { accessorKey: "client", header: "Cliente" },
    { accessorKey: "responsible", header: "Responsable" },
    { accessorKey: "department", header: "Departmento" },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir Menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copiar ID de Ingreso
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setChildren(<RevenueDetail revenue={row.original} />);
                  setDialogTitle("Detalle de Ingreso");
                  setDialogDescription(null);
                  setOpenDialog(true);
                }}
              >
                Ver Detalle
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setChildren(
                    <ScrollArea className="h-[75vh] pr-2">
                      <RevenueForm
                        openAction={setOpenDialog}
                        revenue={row.original}
                        sendSuccessAction={handleReload}
                      />
                    </ScrollArea>
                  );
                  setDialogTitle("Editar Ingreso");
                  setDialogDescription(null);
                  setOpenDialog(true);
                }}
              >
                Editar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleReload = () => {
    toggle(!reload);
  };

  return (
    <div className="flex justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">Ingresos</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>
              <Button
                onClick={() => {
                  setChildren(
                    <ScrollArea className="h-[75vh] pr-2">
                      <RevenueForm
                        openAction={setOpenDialog}
                        sendSuccessAction={handleReload}
                      />
                    </ScrollArea>
                  );
                  setDialogTitle("Nuevo Ingreso");
                  setDialogDescription(
                    "Complete los campos para agregar un nuevo ingreso."
                  );
                }}
              >
                <CirclePlus className="mr-2 h-5 w-5" /> Añadir Ingreso
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
                {dialogDescription && (
                  <DialogDescription>{dialogDescription}</DialogDescription>
                )}
              </DialogHeader>
              <div>{children}</div>
            </DialogContent>
          </Dialog>
        </div>
        <AdvancedDataTable<Revenue, any>
          columns={columns}
          fetchFn={fetchRevenue}
          inputPlaceholder="Buscar por titulo..."
          searchKey="title"
        />
      </Card>
    </div>
  );
};

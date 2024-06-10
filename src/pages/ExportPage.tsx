import { Card } from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { es } from "date-fns/locale";
import { format, set } from "date-fns";
import { fetchData } from "@/utils/Fetcher";
import { useQuery } from "@tanstack/react-query";
import { IntervalData } from "@/types/Interval";
import { useEffect, useState } from "react";

import "jspdf-autotable";
import { jsPDF } from "jspdf";
import { formatter } from "@/utils/General";

const formSchema = z.object({
  rangeDate: z
    .object(
      {
        from: z.date().optional(),
        to: z.date().optional(),
      },
      { required_error: "Range date is required" }
    )
    .refine((date) => {
      return !!date.from;
    }, "Range date is required"),
  kpis: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  includeCharts: z.boolean().default(false).optional(),
});

const kpis = [
  { id: "OCC", value: 1, label: "OCC" },
  { id: "ADR", value: 2, label: "ADR" },
  { id: "RevPAR", value: 3, label: "RevPAR" },
  { id: "TRevPAR", value: 4, label: "TRevPAR" },
  { id: "GopPAR", value: 5, label: "GopPAR" },
];

export const ExportPage = () => {
  const [kpiSelected, setKpiSelected] = useState(["OCC", "RevPAR"]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rangeDate: {
        from: undefined,
        to: undefined,
      },
      kpis: kpiSelected,
      includeCharts: false,
    },
  });
  const [interval, setInterval] = useState<IntervalData | null>(null);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["data", interval],
    queryFn: () => fetchData(interval!),
    enabled: !!interval,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.rangeDate.from && values.rangeDate.to) {
      const newInterval: IntervalData = {
        label: "Custom Interval", //
        startDate: values.rangeDate.from,
        endDate: values.rangeDate.to,
      };
      setInterval(newInterval);
      setKpiSelected(values.kpis);
      refetch();
    }
  }

  useEffect(() => {
    if (data && interval) {
      const rooms = data?.data[0].rooms.map((room) => room.type) || [];
      const pdf = new jsPDF({
        format: "a4",
        orientation: "landscape",
      });
      const columnsRooms: String[] = [
        "Tipo de Habitación",
        "Ingreso por Ocupación",
        "Ingreso de Hab.",
        "Gasto Total",
      ];
      const rowsRooms = [
        ...data.total.rooms.map((item) => {
          return [
            item.type,
            formatter(item.data["Revenue of Reservations"]),
            formatter(item.data["Revenue of Rooms"]),
            formatter(item.data["Expense"]),
          ];
        }),
      ];
      const columns: String[] = [
        "Fecha",
        "Ingresos",
        "Ingresos de Reservas",
        "Ingresos de Habitaciones",
        "Gastos de Habitaciones",
        "Gastos",
        ...kpiSelected,
      ];

      const rows: String[][] = [
        ...data.data.map((item) => {
          return [
            format(new Date(item.date), "dd/MM/yyyy"),
            formatter(item["Revenue"]),
            formatter(item["Revenue of Reservations"]),
            formatter(item["Revenue of Rooms"]),
            formatter(item["Expense of Rooms"]),
            formatter(item["Expense"]),
            ...kpiSelected.map((kpi) => {
              return formatter(item[kpi]);
            }),
          ];
        })
      ];

      pdf.autoTable({
        head: [columnsRooms],
        body: rowsRooms,
        startY: 10,
      });

      let finalY = pdf.autoTable.previous.finalY;

      pdf.autoTable({
        head: [columns],
        body: rows,
        startY: finalY + 10,
      });

      pdf.save(
        `reporte-${format(interval.startDate, "ddMMyy", {
          locale: es,
        })}-${format(interval.endDate, "ddMMyy", { locale: es })}.pdf`
      );
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center m-10">
      <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg 2xl:p-16 xl:p-10 lg:p-10 md:p-10">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-semibold">Generar Reporte</h1>
        </div>
        <div className="flex justify-center 2xl:my-10">
          <div className="w-[25vw]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="rangeDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Intervalo de Fechas</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value.from && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "PPP", {
                                    locale: es,
                                  })}{" "}
                                  -{" "}
                                  {format(field.value.to, "PPP", {
                                    locale: es,
                                  })}
                                </>
                              ) : (
                                format(field.value.from, "PPP", {
                                  locale: es,
                                })
                              )
                            ) : (
                              <span>Selecciona un Rango</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={field.value.from}
                            selected={{
                              from: field.value.from!,
                              to: field.value.to,
                            }}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            onSelect={field.onChange}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Selecciona el intervalo de fechas para el reporte.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="kpis"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">KPIs</FormLabel>
                        <FormDescription>
                          Selecciona los KPIs que deseas incluir en el reporte.
                        </FormDescription>
                      </div>
                      {kpis.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="kpis"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeCharts"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-4">
                        <div className="space-y-1 leading-none">
                          <FormLabel>Incluir Graficos en el reporte</FormLabel>
                          <FormDescription>
                            Selecciona si deseas incluir graficos en el reporte.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
                <Button className="w-full" type={"submit"}>
                  Enviar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

import { IntervalData } from "@/types/Interval";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatter = (number: number | string): string => {
  const formatted = new Intl.NumberFormat("en-BO", {
    style: "currency",
    currency: "BOB",
  }).format(Number(number));

  return formatted;
};

export function percentageFormatter(value: number | string): string {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  return `${+(numericValue * 100).toFixed(4)}%`;
}

export function habFormatter(value: number | string): string {
  const numericValue = typeof value === "string" ? parseFloat(value) : value;
  return `${numericValue} hab`;
}

export const dateParser = (date: string): string => {
  return format(new Date(`${date}T00:00:00`), "PPP", {
    locale: es,
  });
};

interface ColorManagerProps {
  index?: number;
  bgIncluded?: boolean;
  type: "light" | "dark" | "magenta";
  shuffle?: boolean;
}

function shuffleArray(array: string[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const colorManager = ({
  index,
  bgIncluded,
  type = "dark",
  shuffle,
}: ColorManagerProps): string | string[] => {
  const colorsLight = [
    `${bgIncluded ? "bg-" : ""}sky-400`,
    `${bgIncluded ? "bg-" : ""}blue-400`,
    `${bgIncluded ? "bg-" : ""}teal-400`,
    `${bgIncluded ? "bg-" : ""}orange-400`,
    `${bgIncluded ? "bg-" : ""}green-400`,
    `${bgIncluded ? "bg-" : ""}yellow-400`,
    `${bgIncluded ? "bg-" : ""}red-400`,
    `${bgIncluded ? "bg-" : ""}cyan-400`,
    `${bgIncluded ? "bg-" : ""}fuchsia-400`,
  ];
  const colorsDark = [
    `${bgIncluded ? "bg-" : ""}slate-400`,
    `${bgIncluded ? "bg-" : ""}zinc-500`,
    `${bgIncluded ? "bg-" : ""}zinc-700`,
    `${bgIncluded ? "bg-" : ""}cyan-700`,
    `${bgIncluded ? "bg-" : ""}cyan-950`,
    `${bgIncluded ? "bg-" : ""}teal-700`,
    `${bgIncluded ? "bg-" : ""}red-600`,
    `${bgIncluded ? "bg-" : ""}`,
  ];
  const colorsMagenta = [
    `${bgIncluded ? "bg-" : ""}fuchsia-600`,
    `${bgIncluded ? "bg-" : ""}purple-700`,
    `${bgIncluded ? "bg-" : ""}pink-600`,
    `${bgIncluded ? "bg-" : ""}yellow-400`,
    `${bgIncluded ? "bg-" : ""}orange-500`,
  ];
  const colors = {
    light: colorsLight,
    dark: colorsDark,
    magenta: colorsMagenta,
  };
  if (index) {
    return colors[type][index];
  }
  if (shuffle) {
    return shuffleArray(colors[type]);
  }
  return colors[type];
};

export const badgeColor = (type: string) => {
  if (type === "rounded") {
    return "h-2.5 w-2.5 shrink-0 rounded-sm";
  } else if (type === "line") {
    return "w-1 shrink-0 rounded";
  }
  return "";
};

export const percentageChange = (
  data: any[],
  key: string
): { value: number; percentage: number } => {
  if (!data.length || !data[0].hasOwnProperty(key)) {
    return { value: 0, percentage: 0 };
  }
  const firstValue = data[0][key];
  const lastValue = data[data.length - 1][key];
  const value = +(lastValue - firstValue).toFixed(5);
  const percentage = +((Math.abs(value) / firstValue) * 100).toFixed(5);

  return { value, percentage };
};

export const addSign = (value: number): string => {
  return value > 0 ? `+${value}` : value.toString();
};

export const getIntervals = (): IntervalData[] => {
  return [
    {
      label: "5 Días",
      startDate: new Date(new Date().setDate(new Date().getDate() - 5)),
      endDate: new Date(),
    },
    {
      label: "1 Mes",
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date(),
    },
    {
      label: "6 Meses",
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 6)),
      endDate: new Date(),
    },
    {
      label: "YTD",
      startDate: new Date(new Date().getFullYear(), 0, 1),
      endDate: new Date(),
    },
    {
      label: "1 Año",
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
      endDate: new Date(),
    },
    {
      label: "3 Años",
      startDate: new Date(new Date().setFullYear(new Date().getFullYear() - 3)),
      endDate: new Date(),
    },
    {
      label: "MAX",
      startDate: new Date("2020-01-01"),
      endDate: new Date(),
    },
  ];
};

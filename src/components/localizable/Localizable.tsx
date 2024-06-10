import { LocalizedType } from "./types/LocalizableTypes";

/* 
  Add types or interfaces in LocalizableTypes before adding Localized strings here
*/
function formatString(s: string, ...params: any[]): string {
  let formatted = s;
  params.forEach((param, i) => {
    formatted = formatted.replace("%s", param);
  });
  return formatted;
}

const Localizable: LocalizedType = {
  formatString: formatString,
  CardsInfo: {
    occTitleOne: {
      en: "OCC % Differential",
      es: "OCC % Diferencial",
    },
    occTitleTwo: {
      en: "Max OCC",
      es: "OCC Máximo",
    },
    occTitleThree: {
      en: "Min OCC",
      es: "OCC Mínimo",
    },
    occTitleFour: {
      en: "AVG OCC",
      es: "OCC Promedio",
    },
    adrTitleOne: {
      en: "ADR % Differential",
      es: "ADR % Diferencial",
    },
    adrTitleTwo: {
      en: "Total Revenue",
      es: "Ingresos Totales",
    },
    adrTitleThree: {
      en: "Max Occupied Rooms",
      es: "Maximo # de Ocupacion",
    },
    adrTitleFour: {
      en: "Max Revenue",
      es: "Maximo Ingreso",
    },
    revParTitleOne: {
      en: "RevPAR % Differential",
      es: "RevPAR % Diferencial",
    },
    revParTitleTwo: {
      en: "TRevPAR % Differential",
      es: "TRevPAR % Diferencial",
    },
    revParTitleThree: {
      en: "Total Revenue",
      es: "Ingresos Totales",
    },
    revParTitleFour: {
      en: "Total Available Rooms",
      es: "Total Hab. Disponibles",
    },
    gopParTitleOne: {
      en: "GOPPAR % Differential",
      es: "GOPPAR % Diferencial",
    },
    gopParTitleTwo: {
      en: "Total Profit",
      es: "Ganancia Total",
    },
    gopParTitleThree: {
      en: "Max Revenue",
      es: "Maximo Ingreso",
    },
    gopParTitleFour: {
      en: "Max Expense",
      es: "Maximo Gasto",
    },
    reservationsTitleOne: {
      en: "Occupied % Differential",
      es: "% Diferencial Ocupaciones",
    },
    reservationsTitleTwo: {
      en: "Revenue % Differential",
      es: "% Diferencial Ingresos",
    },
    reservationsTitleThree: {
      en: "Max Occupied Rooms",
      es: "Maximo # de Ocupacion",
    },
    reservationsTitleFour: {
      en: "Min Occupied Rooms",
      es: "Minimo # de Ocupacion",
    },
    revenueTitleOne: {
      en: "Occupied % Differential",
      es: "% Diferencial Ocupaciones",
    },
    revenueTitleTwo: {
      en: "Revenue % Differential",
      es: "% Diferencial Ingresos",
    },
    revenueTitleThree: {
      en: "Max Revenue",
      es: "Maximo Ingreso",
    },
    revenueTitleFour: {
      en: "Min Revenue",
      es: "Minimo Ingreso",
    },
    differentialPercentage: {
      en: "%s from last date",
      es: "%s desde la última fecha",
    },
    dateInfo: {
      en: "On %s",
      es: "En %s",
    },
    averageTotal: {
      en: "Of %s data",
      es: "De %s datos",
    },
  },
  Columns: {
    date: { en: "Date", es: "Fecha" },
    roomType: { en: "Room Type", es: "Tipo de Habitación" },
    avgAvailable: { en: "Avg Available", es: "Promedio Disponible" },
    avgOccupied: { en: "Avg Occupied", es: "Promedio Ocupado" },
    avgUnoccupied: { en: "Avg Unoccupied", es: "Promedio Desocupado" },
    avgOCC: { en: "Avg OCC", es: "OCC Promedio" },
    occupiedR: { en: "Occupied - %s", es: "Ocupado - %s" },
    unoccupiedR: { en: "Unoccupied - %s", es: "Desocupado - %s" },
    availableR: { en: "Available - %s", es: "Disponible - %s" },
    revenueR: { en: "Revenue - %s", es: "Ingresos - %s" },
    expenseR: { en: "Expense - %s", es: "Gastos - %s" },
    occupied: { en: "Occupied", es: "Ocupados" },
    unoccupied: { en: "Unoccupied", es: "Desocupados" },
    available: { en: "Available", es: "Disponibles" },
    revenue: { en: "Revenue", es: "Ingresos" },
    expense: { en: "Expense", es: "Gastos" },
    totalRevenue: { en: "Total Revenue", es: "Ingresos Totales" },
    totalExpense: { en: "Total Expense", es: "Gastos Totales" },
  },
  OCCPage: {
    title: { en: "OCC - Occupancy Rate", es: "OCC - Porcentaje de Ocupación" },
    availableRoomsTitle: {
      en: "Available Rooms",
      es: "Habitaciones Disponibles",
    },
    occupiedRoomsTitle: {
      en: "Occupied Rooms",
      es: "Habitaciones Ocupadas",
    },
    unoccupiedRoomsTitle: {
      en: "Unoccupied Rooms",
      es: "Habitaciones Desocupadas",
    },
  },
};

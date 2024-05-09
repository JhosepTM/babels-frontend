export interface TableItemReservation {
  id: string;
  month: string;
  numberReservations: number;
  revenue: number;
}

export interface TableComparativeReservation {
  id: string;
  month: string;
  reservationsFirstYear: number;
  revenueFirstYear: number;
  reservationsSecondYear: number;
  revenueSecondYear: number;
}

export interface SimpleTableRowItem {
  value: string | number;
  color?: string;
  badgeType?: "rounded" | "line";
  className?: string;
}

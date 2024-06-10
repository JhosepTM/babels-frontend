interface LocalizedStrings {
  en: string;
  es: string;
}

interface CardsInfo {
  occTitleOne: LocalizedStrings;
  occTitleTwo: LocalizedStrings;
  occTitleThree: LocalizedStrings;
  occTitleFour: LocalizedStrings;
  adrTitleOne: LocalizedStrings;
  adrTitleTwo: LocalizedStrings;
  adrTitleThree: LocalizedStrings;
  adrTitleFour: LocalizedStrings;
  revParTitleOne: LocalizedStrings;
  revParTitleTwo: LocalizedStrings;
  revParTitleThree: LocalizedStrings;
  revParTitleFour: LocalizedStrings;
  gopParTitleOne: LocalizedStrings;
  gopParTitleTwo: LocalizedStrings;
  gopParTitleThree: LocalizedStrings;
  gopParTitleFour: LocalizedStrings;
  reservationsTitleOne: LocalizedStrings;
  reservationsTitleTwo: LocalizedStrings;
  reservationsTitleThree: LocalizedStrings;
  reservationsTitleFour: LocalizedStrings;
  revenueTitleOne: LocalizedStrings;
  revenueTitleTwo: LocalizedStrings;
  revenueTitleThree: LocalizedStrings;
  revenueTitleFour: LocalizedStrings;
  differentialPercentage: LocalizedStrings;
  dateInfo: LocalizedStrings;
  averageTotal: LocalizedStrings;
}

interface Columns {
  date: LocalizedStrings;
  roomType: LocalizedStrings;
  avgAvailable: LocalizedStrings;
  avgOccupied: LocalizedStrings;
  avgUnoccupied: LocalizedStrings;
  avgOCC: LocalizedStrings;
  occupiedR: LocalizedStrings;
  unoccupiedR: LocalizedStrings;
  availableR: LocalizedStrings;
  revenueR: LocalizedStrings;
  expenseR: LocalizedStrings;
  occupied: LocalizedStrings;
  unoccupied: LocalizedStrings;
  available: LocalizedStrings;
  revenue: LocalizedStrings;
  expense: LocalizedStrings;
  totalRevenue: LocalizedStrings;
  totalExpense: LocalizedStrings;
}

interface OCCPage {
  title: LocalizedStrings;
  availableRoomsTitle: LocalizedStrings;
  occupiedRoomsTitle: LocalizedStrings;
  unoccupiedRoomsTitle: LocalizedStrings;
}

interface ADRPage {
  title: LocalizedStrings;
  revenueReservationsTitle: LocalizedStrings;
  occupiedRoomsTitle: LocalizedStrings;
  revenuePerRoomsTitle: LocalizedStrings;
  occupiedPerRoomsTitle: LocalizedStrings;
}

interface RevPARPage {
  title: LocalizedStrings;
  revenueReservationsTitle: LocalizedStrings;
  totalRevenueReservationsTitle: LocalizedStrings;
  totalRevenueTitle: LocalizedStrings;
}

interface GopPARPage {
  title: LocalizedStrings;
  revenueExpenseTitle: LocalizedStrings;
  totalRevenueExpenseTitle: LocalizedStrings;
  totalRevenueTitle: LocalizedStrings;
  totalExpenseTitle: LocalizedStrings;
}

interface ReservationsPage {
  title: LocalizedStrings;
  roomsOccupiedTitle: LocalizedStrings;
  roomsOccupiedByTypeTitle: LocalizedStrings;
}

interface RevenuePage {
  title: LocalizedStrings;
  revenueTitle: LocalizedStrings;
  revenueByTypeTitle: LocalizedStrings;
}

export interface LocalizedType {
  formatString: (s: string, ...params: any[]) => string;
  CardsInfo: CardsInfo;
  Columns: Columns;
  OCCPage: OCCPage;
}

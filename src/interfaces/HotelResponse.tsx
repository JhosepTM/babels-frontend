interface RoomData {
  "Occupied Rooms": number;
  "Available Rooms"?: number;
  "Revenue of Reservations": number;
  "Revenue of Rooms": number;
  Expense: number;
}

interface Room {
  type: string;
  data: RoomData;
}

interface HotelData {
  date: string;
  "Occupied Rooms": number;
  "Available Rooms": number;
  Revenue: number;
  "Revenue of Reservations": number;
  "Revenue of Rooms": number;
  "Expense of Rooms": number;
  Expense: number;
  OCC: number;
  ADR: number;
  RevPAR: number;
  TRevPAR: number;
  GopPAR: number;
  rooms: Room[];
}

interface Averages {
  "Occupied Rooms": number;
  "Available Rooms": number;
  Revenue: number;
  "Revenue of Reservations": number;
  "Revenue of Rooms": number;
  "Expense of Rooms": number;
  Expense: number;
  OCC: number;
  ADR: number;
  RevPAR: number;
  TRevPAR: number;
  GopPAR: number;
}

interface Total {
  "Occupied Rooms": number;
  "Available Rooms": number;
  Revenue: number;
  "Revenue of Reservations": number;
  "Revenue of Rooms": number;
  "Expense of Rooms": number;
  Expense: number;
  OCC: number;
  ADR: number;
  RevPAR: number;
  TRevPAR: number;
  GopPAR: number;
  rooms: Room[];
}

export interface Response {
  data: HotelData[];
  averages: Averages;
  rooms_averages: Room[];
  total: Total;
}

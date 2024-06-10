export type Revenue = {
  id: string;
  date: Date;
  title: string;
  description: string;
  category: string;
  associatedRoom?: string;
  amount: number;
  payMethod: string;
  client: string;
  clientContact: string;
  responsible: string;
  department: string;
  lastUpdate?: Date;
};

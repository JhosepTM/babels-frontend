export type Expense = {
  id: string;
  date: Date;
  title: string;
  description: string;
  category: string;
  associatedRoom?: string;
  amount: number;
  payMethod: string;
  supplier: string;
  supplierContact: string;
  responsible: string;
  department: string;
  lastUpdate?: Date;
};

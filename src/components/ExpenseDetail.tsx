import { Expense } from "@/types/Expense";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const currencyFormatter = (number: number) => {
  const formatted = new Intl.NumberFormat("en-BO", {
    style: "currency",
    currency: "BOB",
  }).format(number);

  return formatted;
};

interface ExpenseDetailProps {
  expense: Expense;
}

export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  return (
    <div>
      <h3 className="font-semibold block">{expense.id}</h3>
      <div className="flex justify-between py-3">
        <h3 className="font-bold text-xl block">{expense.title}</h3>
        <span className="block">
          {format(expense.date, "PPP", { locale: es })}
        </span>
      </div>
      <span className="block">{expense.description}</span>
      <div className="flex justify-around py-2">
        <span className="font-semibold block">{expense.category}</span>
        <p className="block">
          <span className="font-semibold">
            {`${currencyFormatter(expense.amount)} `}
          </span>
          pagado con <span className="font-semibold">{expense.payMethod}</span>
        </p>
      </div>
      {expense.associatedRoom && (
        <p className="block">
          Asociado con la sala{" "}
          <span className="font-semibold">{expense.associatedRoom}</span>.
        </p>
      )}
      <p>
        De <span className="font-semibold">{expense.supplier}</span> con
        contacto{" "}
        <span className="font-semibold">{expense.supplierContact}</span>.
      </p>
      <p className="py-2">
        Registrado por{" "}
        <span className="font-semibold">{expense.responsible}</span> del
        departamento <span className="font-semibold">{expense.department}</span>
        .
      </p>
      {expense.lastUpdate && (
        <p className="text-sm text-right">
          Última actualización el{" "}
          {format(expense.lastUpdate, "PPP", { locale: es })}
        </p>
      )}
    </div>
  );
};

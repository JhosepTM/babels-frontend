import { Revenue } from "@/types/Revenue";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const currencyFormatter = (number: number) => {
  const formatted = new Intl.NumberFormat("en-BO", {
    style: "currency",
    currency: "BOB",
  }).format(number);

  return formatted;
};

interface RevenueDetailProps {
  revenue: Revenue;
}

export const RevenueDetail = ({ revenue }: RevenueDetailProps) => {
  return (
    <div>
      <h3 className="font-semibold block">{revenue.id}</h3>
      <div className="flex justify-between py-3">
        <h3 className="font-bold text-xl block">{revenue.title}</h3>
        <span className="block">
          {format(revenue.date, "PPP", { locale: es })}
        </span>
      </div>
      <span className="block">{revenue.description}</span>
      <div className="flex justify-around py-2">
        <span className="font-semibold block">{revenue.category}</span>
        <p className="block">
          <span className="font-semibold">
            {`${currencyFormatter(revenue.amount)} `}
          </span>
          pagado con <span className="font-semibold">{revenue.payMethod}</span>
        </p>
      </div>
      {revenue.associatedRoom && (
        <p className="block">
          Asociado con la sala{" "}
          <span className="font-semibold">{revenue.associatedRoom}</span>.
        </p>
      )}
      <p>
        De <span className="font-semibold">{revenue.client}</span> con contacto{" "}
        <span className="font-semibold">{revenue.clientContact}</span>.
      </p>
      <p className="py-2">
        Registrado por{" "}
        <span className="font-semibold">{revenue.responsible}</span> del
        departamento <span className="font-semibold">{revenue.department}</span>
        .
      </p>
      {revenue.lastUpdate && (
        <p className="text-sm text-right">
          Última actualización el{" "}
          {format(revenue.lastUpdate, "PPP", {
            locale: es,
          })}
        </p>
      )}
    </div>
  );
};

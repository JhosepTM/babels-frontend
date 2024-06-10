import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GraphicsMain } from "../components/GraphicsMain";

const GraphicsPanel = () => {
  return (
    <div className="flex justify-center items-center m-10">
      <div className="flex justify-center items-center">
        <Card className="2xl:w-[1640px] xl:w-[1150px] lg:w-[1000px] md:w-[800px] h-auto shadow-lg px-10 py-5">
          <CardHeader>
            <CardTitle>Panel de Visualización de Datos</CardTitle>
            <CardDescription>
              Visualización de datos y tablas de diferentes KPIs.
            </CardDescription>
          </CardHeader>
          <GraphicsMain />
        </Card>
      </div>
    </div>
  );
};

export default GraphicsPanel;

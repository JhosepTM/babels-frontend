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
      <Tabs defaultValue="graphics" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="graphics">Graphics</TabsTrigger>
          <TabsTrigger value="report">Generate Report</TabsTrigger>
        </TabsList>
        <div className="flex justify-center items-center">
          <TabsContent value="graphics">
            <Card className="2xl:w-[1335px] 2xl:h-[720px] xl:w-[1150px] xl:h-[690px] lg:w-[1000px] lg:h-[650px] md:w-[800px] md:h-[550px] shadow-lg">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardHeader>
              <GraphicsMain />
            </Card>
          </TabsContent>
          <TabsContent value="report">
            <Card className="2xl:w-[1335px] 2xl:h-[720px] xl:w-[1150px] xl:h-[690px] lg:w-[1000px] lg:h-[650px] md:w-[800px] md:h-[550px] shadow-lg">
              <h1 className="p-20">Report</h1>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default GraphicsPanel;

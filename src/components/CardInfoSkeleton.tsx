import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const CardInfoSkeleton = () => {
  return (
    <Card className="2xl:w-[18vw] xl:w-[19vw] lg:w-[18vw] md:w-[16vw] 2xl:h-[130px] xl:h-[120px] lg:h-[110px] shadow-slate-300">
      <div className="flex items-center justify-between 2xl:p-5 xl:p-5 lg:p-3 md:p-2 2xl:pb-0 xl:pb-0 md:pb-0">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <div className="px-5 flex flex-col gap-2 pt-2">
        <div className="flex flex-row-reverse">
          <Skeleton className="h-6 w-[200px]" />
        </div>
        <Skeleton className="h-4 w-[120px]" />
      </div>
    </Card>
  );
};

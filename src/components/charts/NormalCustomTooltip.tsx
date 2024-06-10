import { Separator } from "@/components/ui/separator";
import { colorManager } from "@/utils/General";

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

type Key = {
  key: string;
  value: string;
};

export const NormalCustomTooltip = (
  { active, payload }: TooltipProps,
  keyValues: Key[],
  showLegend: boolean,
  indexPayload?: string,
  formatter?: (number: number | string) => string
) => {
  if (active && payload) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
        {indexPayload && (
          <div>
            <span className="font-semibold text-sm block text-center">
              {payload[0].payload[indexPayload]}
            </span>
            <Separator />
          </div>
        )}
        {payload.map((item, index) => (
          <p key={index} className="text-sm">
            <div>
              <div className="flex flex-1 space-x-2.5 my-2">
                <div className={`flex w-1 flex-col bg-${item.color} rounded`} />
                <div className="flex flex-col items-start">
                  <div key={keyValues[index].key} className="my-1">
                    <p key={index} className="text-sm">
                      <span className="font-semibold">
                        {keyValues[index].value}
                      </span>
                      {": "}
                      <span className={`font-bold`}>
                        {formatter
                          ? formatter(item.payload[keyValues[index].key])
                          : item.payload[keyValues[index].key]}
                      </span>
                    </p>
                  </div>
                  {showLegend && (
                    <div className="flex items-center justify-center w-full">
                      <p>
                        <span className="font-semibold">{item.name}</span>
                        {": "}
                        <span className={`font-semibold text-${item.color}`}>
                          {formatter ? formatter(item.value) : item.value}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

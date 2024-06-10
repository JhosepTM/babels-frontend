import { Separator } from "@/components/ui/separator";
import { colorManager } from "@/utils/General";
import { ProgressCircle } from "@tremor/react";

interface TooltipProps {
  active?: boolean;
  payload?: any[];
}

type Key = {
  key: string;
  value: string;
}

const colors = colorManager({ type: "dark" });

export const ProgressCustomTooltip = (
  { active, payload }: TooltipProps,
  keyValues: Key[],
  indexPayload?: string,
  formatter?: (number: number | string) => string
) => {
  if (active && payload) {
    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
        {payload.map((item, index) => (
          <p key={index} className="text-sm">
            {indexPayload && (
              <div>
                <span className="font-semibold block text-center">
                  {item.payload[indexPayload]}
                </span>
                <Separator />
              </div>
            )}
            <div className="flex flex-col items-center mx-5 my-1">
              <div className="flex gap-10 ">
                <ProgressCircle
                  value={
                    (item.payload[keyValues[0].key] / item.payload[keyValues[1].key]) *
                    100
                  }
                  radius={35}
                  color={colors[0]}
                  children={
                    <ProgressCircle value={100} radius={25} color={colors[2]} />
                  }
                />
                <div>
                  {keyValues &&
                    keyValues.map((keyValue: Key, index: number) => (
                      <div key={index} className="my-2">
                        <span className="font-semibold">{keyValue.value}</span>
                        <p key={index} className="text-sm">
                          <span className={`font-bold text-${colors[index]}`}>
                            {item.payload[keyValue.key]}
                          </span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>
              <span>
                <span className="font-semibold">{item.name}: </span>
                <span className={`font-semibold text-${item.color}`}>
                  {formatter ? formatter(item.value) : item.value}
                </span>
              </span>
            </div>
          </p>
        ))}
      </div>
    );
  }

  return null;
};

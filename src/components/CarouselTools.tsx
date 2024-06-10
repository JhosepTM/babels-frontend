import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ToolItem } from "@/interfaces/ToolItem";

interface CarouselToolsProps {
  tools: ToolItem[];
}

export function CarouselTools({ tools }: CarouselToolsProps) {
  return (
    <div className="flex justify-center items-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-2xl"
      >
        <CarouselContent>
          {tools.map((tool) => (
            <CarouselItem key={tool.title} className="basis-1/6">
              <div className="pb-8 pt-8">
                <div
                  className="flex flex-col items-center justify-center border-solid border rounded-md border-gray-300 p-1 w-20 h-20 hover:bg-gray-100 transition duration-300 ease-in-out"
                  onClick={tool.onClick}
                >
                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger>{tool.img}</TooltipTrigger>
                      <TooltipContent>
                        <p>{tool.title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

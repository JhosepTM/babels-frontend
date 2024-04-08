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
  CarouselNext,
  CarouselPrevious,
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
            <CarouselItem
              key={tool.title}
              className="2xl:basis-1/5 xl:basis-1/5 sm:basis-1/3 md:basis-1/4 lg:basis-1/4"
            >
              <div className="pb-8 pt-8">
                <div
                  className="flex flex-col items-center justify-center border-solid border rounded-md border-gray-300 p-1 w-24 h-24 hover:bg-gray-100 transition duration-300 ease-in-out"
                  onClick={tool.onClick}
                >
                  <TooltipProvider delayDuration={50}>
                    <Tooltip>
                      <TooltipTrigger>
                        <tool.img className="object-cover h-16 w-16 hover:scale-110 transition-transform duration-100" />
                      </TooltipTrigger>
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
        <CarouselPrevious className="2xl:hidden xl:hidden" />
        <CarouselNext className="2xl:hidden xl:hidden" />
      </Carousel>
    </div>
  );
}

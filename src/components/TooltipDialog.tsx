import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TooltipDialogProps {
  tooltipTrigger: React.ReactNode;
  tooltipContent: React.ReactNode;
  tooltipContentCursor?: boolean;
  trigger?: "trigger" | "content";
  tooltipOverlay?: boolean;
  dialogContent?: React.ReactNode;
  dialogTitle?: string;
  dialogDescription?: string;
  dialogCloseText?: string;
}

interface TooltipDialogTriggerProps {
  triggerType: "trigger" | "content";
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export const TooltipDialogTrigger = ({
  triggerType,
  trigger,
  content,
}: TooltipDialogTriggerProps) => {
  return (
    <TooltipProvider delayDuration={50}>
      {triggerType === "trigger" ? (
        <Tooltip>
          <TooltipTrigger asChild>{trigger}</TooltipTrigger>
          <DialogTrigger asChild>{content}</DialogTrigger>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
          </TooltipTrigger>
          {content}
        </Tooltip>
      )}
    </TooltipProvider>
  );
};

export const TooltipDialog = ({
  tooltipTrigger,
  tooltipContent,
  tooltipContentCursor = true,
  trigger = "trigger",
  tooltipOverlay = false,
  dialogContent,
  dialogTitle,
  dialogDescription,
  dialogCloseText,
}: TooltipDialogProps) => {
  return (
    <Dialog>
      {
        <TooltipDialogTrigger
          triggerType={trigger}
          trigger={tooltipTrigger}
          content={
            <TooltipContent
              side={tooltipOverlay ? "right" : "left"}
              sideOffset={tooltipOverlay ? -35 : 0}
              align={tooltipOverlay ? "start" : "center"}
              alignOffset={tooltipOverlay ? -10 : 0}
              className={
                tooltipContentCursor
                  ? "hover:bg-slate-50 hover:cursor-pointer"
                  : "mr-2"
              }
            >
              {tooltipContent}
            </TooltipContent>
          }
        />
      }
      <DialogContent className="sm:max-w-[80vw]">
        {dialogTitle && dialogDescription && (
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
        )}
        <div>{dialogContent || tooltipTrigger}</div>
        {dialogCloseText && (
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                {dialogCloseText}
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

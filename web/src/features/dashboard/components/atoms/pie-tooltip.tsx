import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getStatusDescription } from "@/features/dashboard/constants/chart";
import { ChartDataItem } from "@/features/dashboard/types/chart";
import { formatString } from "@/features/field/libs/util";

export const PieTooltip: React.FC<{
  index: number;
  item: ChartDataItem;
}> = ({ index, item }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center  gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-row gap-2 items-center ">
              <div
                className="h-4 w-4 rounded-sm"
                style={{
                  backgroundColor: `hsl(var(--chart-${index + 1}))`,
                }}
              />
              <h4 className="font-medium">{formatString(item.browser)}</h4>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs text-muted-foreground">
              {getStatusDescription(item.browser)}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

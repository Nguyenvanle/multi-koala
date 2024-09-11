import { ArrowDownUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDownAZIcon,
  BookUserIcon,
  DollarSignIcon,
} from "@/features/courses/components/atoms/icon";

const SortIcons: Record<SortKey, JSX.Element> = {
  "A-Z": <ArrowDownAZIcon />,
  Price: <DollarSignIcon />,
  Recommend: <BookUserIcon />,
};

export const SelectSort: React.FC = () => (
  <Select>
    <SelectTrigger className="w-40 hover:border-primary">
      <SelectValue
        placeholder={
          <div className="flex flex-row gap-2">
            <ArrowDownUp className="w-4 h-4" />
            Sort
          </div>
        }
      />
    </SelectTrigger>
    <SelectContent>
      {(Object.keys(SortIcons) as SortKey[]).map((key) => (
        <SelectItem key={key} value={key}>
          <div className="flex items-center gap-2">
            {SortIcons[key]}
            {key}
          </div>
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

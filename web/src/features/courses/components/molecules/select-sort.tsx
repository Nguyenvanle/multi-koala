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
import { Dispatch, SetStateAction } from "react";

export type SortOption =
  | "price_asc"
  | "price_desc"
  | "rating_desc"
  | "uploadedAt_desc"
  | "courseName_asc"
  | "courseName_desc"; // Thêm tùy chọn mới cho sắp xếp theo tên khóa học

const SortIcons: Record<SortOption, JSX.Element> = {
  courseName_asc: <ArrowDownAZIcon />, // Sử dụng biểu tượng đã có cho tên khóa học tăng dần
  courseName_desc: <ArrowDownAZIcon />, // Sử dụng biểu tượng đã có cho tên khóa học giảm dần
  price_asc: <DollarSignIcon />,
  price_desc: <DollarSignIcon />,
  rating_desc: <BookUserIcon />,
  uploadedAt_desc: <ArrowDownAZIcon />,
};

const SortLabels: Record<SortOption, string> = {
  courseName_asc: "Course Name: A to Z", // Nhãn cho tên khóa học tăng dần
  courseName_desc: "Course Name: Z to A", // Nhãn cho tên khóa học giảm dần
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
  rating_desc: "Highest Rated",
  uploadedAt_desc: "Newest",
};

interface SelectSortProps {
  setSortOrder: Dispatch<SetStateAction<SortOption>>;
}

export const SelectSort: React.FC<SelectSortProps> = ({ setSortOrder }) => {
  const handleChange = (value: string) => {
    setSortOrder(value as SortOption); // Chuyển đổi giá trị thành SortOption
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-52 hover:border-primary">
        <SelectValue
          placeholder={
            <div className="flex flex-row gap-2">
              <ArrowDownAZIcon />
              Course Name: A to Z
            </div>
          }
        />
      </SelectTrigger>

      <SelectContent>
        {(Object.keys(SortIcons) as SortOption[]).map((option) => (
          <SelectItem key={option} value={option}>
            <div className="flex items-center gap-2">
              {SortIcons[option]}
              {SortLabels[option]}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
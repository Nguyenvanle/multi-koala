import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDown01Icon,
  ArrowDown10Icon,
  ArrowDownAZIcon,
  BookUserIcon,
  CalendarArrowDownIcon,
  DollarSignIcon,
  StarIcon,
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
  price_asc: <ArrowDown01Icon />,
  price_desc: <ArrowDown10Icon />,
  rating_desc: <StarIcon />,
  uploadedAt_desc: <CalendarArrowDownIcon />,
};

const SortLabels: Record<SortOption, string> = {
  courseName_asc: "Name: A-Z", // Nhãn cho tên khóa học tăng dần
  courseName_desc: "Name: Z-A", // Nhãn cho tên khóa học giảm dần
  price_asc: "Price: Low-High",
  price_desc: "Price: High-Low",
  rating_desc: "Highest Rated",
  uploadedAt_desc: "Newest",
};

interface SelectSortProps {
  setSortOrder: Dispatch<SetStateAction<SortOption>>;
}

export const SelectSort: React.FC<SelectSortProps> = ({ setSortOrder }) => {
  const defaultSortOrder: SortOption = "rating_desc"; // Thiết lập giá trị mặc định là sắp xếp theo đánh giá cao nhất

  const handleChange = (value: string) => {
    setSortOrder(value as SortOption); // Chuyển đổi giá trị thành SortOption
  };

  return (
    <Select defaultValue={defaultSortOrder} onValueChange={handleChange}>
      <SelectTrigger className="hover:border-accent sm:w-44 font-medium">
        <SelectValue placeholder="Select sort type" />
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

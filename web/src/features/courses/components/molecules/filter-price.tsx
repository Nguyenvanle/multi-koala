import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { SliderTwoSide } from "@/components/ui/slider-two-side";
import { useFilter } from "@/features/filter/hooks/useFilter";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";

interface PriceRange {
  min: number;
  max: number;
}

export const FilterPrice: React.FC = () => {
  const { filters, updateFilter } = useFilter();
  const [priceRange, setPriceRange] = useState<PriceRange>(
    (filters.priceRange as PriceRange) || { min: 0, max: 1000 }
  );

  useEffect(() => {
    setPriceRange((filters.priceRange as PriceRange) || { min: 0, max: 1000 });
  }, [filters.priceRange]);

  const handleSliderChange = (values: number[]) => {
    const newRange = { min: values[0], max: values[1] };
    setPriceRange(newRange);
    updateFilter("priceRange", newRange);
  };

  const handleInputChange = (type: "min" | "max", value: string) => {
    const numValue = value === "" ? undefined : parseInt(value, 10);
    // Cho phép người dùng xóa số 0 hoặc nhập giá trị không âm
    if (numValue === undefined || (numValue >= 0 && !isNaN(numValue))) {
      const newRange = { ...priceRange, [type]: numValue !== undefined ? numValue : 0 };
      if (newRange.min <= newRange.max) {
        setPriceRange(newRange);
        updateFilter("priceRange", newRange);
      }
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Label
        htmlFor="price-range"
        className="scroll-m-20 text-xl font-semibold tracking-tight pb-2"
      >
        Price Range
      </Label>

      <SliderTwoSide
        id="price-range"
        min={0}
        max={1000}
        step={10}
        value={[priceRange.min, priceRange.max]}
        onValueChange={handleSliderChange}
      />

      <div className="flex justify-between items-center">
        <div className="relative flex items-center">
          <Input
            type="number"
            value={priceRange.min === 0 ? "" : priceRange.min} // Hiển thị rỗng khi giá trị là 0
            onChange={(e) => handleInputChange("min", e.target.value)}
            className="w-24 pl-6"
            min={0} // Ngăn không cho nhập số âm
          />
          <DollarSign className="absolute left-2 text-gray-500 w-4 h-4" />
        </div>

        <span className="text-muted-foreground">-</span>

        <div className="relative flex items-center">
          <Input
            type="number"
            value={priceRange.max === 0 ? "" : priceRange.max} // Hiển thị rỗng khi giá trị là 0
            onChange={(e) => handleInputChange("max", e.target.value)}
            className="w-24 pl-6"
            min={0} // Ngăn không cho nhập số âm
          />
          <DollarSign className="absolute left-2 text-gray-500 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
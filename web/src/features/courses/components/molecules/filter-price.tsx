import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { SliderTwoSide } from "@/components/ui/slider-two-side";
import { useFilter } from "@/features/filter/hooks/useFilter";
import { Input } from "@/components/ui/input";

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
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      const newRange = { ...priceRange, [type]: numValue };
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
        <div className="flex items-center space-x-2">
          <span>$</span>
          <Input
            type="number"
            value={priceRange.min}
            onChange={(e) => handleInputChange("min", e.target.value)}
            className="w-20"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span>$</span>
          <Input
            type="number"
            value={priceRange.max}
            onChange={(e) => handleInputChange("max", e.target.value)}
            className="w-20"
          />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFilter } from "@/features/filter/hooks/useFilter";

export const FilterRating: React.FC = () => {
  const { filters, updateFilter } = useFilter();
  const rating = filters.rating?.toString() || "0";

  const handleRatingChange = (value: string) => {
    updateFilter("rating", value === "0" ? undefined : Number(value));
  };

  return (
    <div className="flex flex-col space-y-2">
      <Label
        htmlFor="rating-select"
        className="scroll-m-20 text-xl font-semibold tracking-tight pb-2"
      >
        Minimum Rating
      </Label>
      <Select value={rating} onValueChange={handleRatingChange}>
        <SelectTrigger id="rating-select">
          <SelectValue placeholder="Select minimum rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Any Rating</SelectItem>
          <SelectItem value="0.2">1 star and above</SelectItem>
          <SelectItem value="0.4">2 stars and above</SelectItem>
          <SelectItem value="0.6">3 stars and above</SelectItem>
          <SelectItem value="0.8">4 stars and above</SelectItem>
          <SelectItem value="1">5 stars only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

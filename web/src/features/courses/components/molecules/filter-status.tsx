import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useFilter } from "@/features/filter/hooks/useFilter";
import { Muted } from "@/components/ui/typography";

export const FilterStatus: React.FC = () => {
  const { filters, updateFilter } = useFilter();

  const handleToggle = (checked: boolean) => {
    updateFilter("status", checked);
  };

  return (
    <div className="flex flex-col items-start gap-2 ">
      <Label
        htmlFor="approved-courses"
        className="scroll-m-20 text-xl font-semibold tracking-tight pb-2"
      >
        Only Approved
      </Label>

      <Switch
        id="approved-courses"
        checked={filters.status}
        onCheckedChange={handleToggle}
      />

      <Muted>Show only approved courses</Muted>
    </div>
  );
};

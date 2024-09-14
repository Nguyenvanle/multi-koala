import { FilterContext } from "@/features/filter/context/provider";
import { useContext } from "react";

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }

  return context;
};

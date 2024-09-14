import { useFilter } from "@/features/filter/hooks/useFilter";

export const useFilterDialog = (onClose: () => void) => {
  const { resetFilters } = useFilter();

  const handleApply = () => {
    onClose();
  };

  const handleReset = () => {
    resetFilters();
  };

  return { handleApply, handleReset };
};

import { fieldService } from "@/features/field/services/field";
import { FieldsResultResType } from "@/features/field/types/field";
import useSWR from "swr";

// Định nghĩa fetcher function
const fetcher = async () => {
  const { result } = await fieldService.getAll();
  return result?.result; // Trả về dữ liệu mong muốn
};

export default function useField() {
  const { data, error } = useSWR("fields", fetcher);

  return {
    fields: data as FieldsResultResType | null,
    loading: !error && !data,
    error: error?.message || null,
  };
}
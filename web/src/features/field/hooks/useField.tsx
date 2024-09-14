import { fieldService } from "@/features/field/services/field";
import { FieldsResultResType } from "@/features/field/types/field";
import { useEffect, useState } from "react";

export default function useField() {
  const [fields, setFields] = useState<FieldsResultResType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const { result } = await fieldService.getAll();

        if (result) {
          setFields(result.result);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  return { fields, loading, error };
}

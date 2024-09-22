// src/features/field/pages/FieldPage.tsx
"use client";

import { GetServerSideProps } from "next";
import useSWR from "swr";
import { H4 } from "@/components/ui/typography";
import { CheckboxGroup } from "@/features/courses/components/atoms/checkbox-group";
import { FieldSkeleton } from "@/features/courses/components/atoms/field-skeleton";
import { fieldService } from "@/features/field/services/field"; // Đảm bảo import đúng service
import { FieldsResultResType } from "@/features/field/types/field";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { result } = await fieldService.getAll(); // Gọi API để lấy danh sách fields
    return {
      props: {
        initialData: result?.result || [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch fields:", error);
    return {
      props: {
        initialData: [],
      },
    };
  }
};

// Định nghĩa hàm fetcher cho SWR
const fetcher = async (): Promise<FieldsResultResType> => {
  const response = await fieldService.getAll(); // Gọi API để lấy danh sách fields
  if (!response.result?.result) {
    throw new Error("Failed to fetch fields");
  }
  return response.result.result;
};

export const FieldPage: React.FC<{ initialData: FieldsResultResType }> = ({
  initialData,
}) => {
  const { data: fields, error } = useSWR<FieldsResultResType>(
    "fields",
    fetcher,
    {
      fallbackData: initialData,
    }
  );

  if (error) return <div>Error: {error.message}</div>;
  if (!fields) return <FieldSkeleton />;
  if (fields.length === 0)
    return (
      <div className="flex flex-1 flex-col">
        <H4 className="pb-2">Course Fields</H4>
        <div>No fields found</div>
      </div>
    );

  return (
    <div className="flex flex-1 flex-col">
      <H4 className="pb-2">Course Fields</H4>
      <CheckboxGroup
        options={fields.map((field) => ({
          id: field.fieldName,
          label: field.fieldName,
        }))}
        filterType="fields"
      />
    </div>
  );
};

export default FieldPage;

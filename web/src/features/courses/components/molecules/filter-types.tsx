import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { H4 } from "@/components/ui/typography";
import { CheckboxGroup } from "@/features/courses/components/atoms/checkbox-group";
import { FieldSkeleton } from "@/features/courses/components/atoms/field-skeleton";
import { courseTypeService } from "@/features/course-type/services/course-type";
import { CourseTypesResultResType } from "@/features/course-type/types/course-type";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { result } = await courseTypeService.getAll();
    return {
      props: {
        initialData: result?.result || [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch course types:", error);
    return {
      props: {
        initialData: [],
      },
    };
  }
};

// Define the fetcher function for SWR
const fetcher = async (): Promise<CourseTypesResultResType> => {
  const response = await courseTypeService.getAll();
  if (!response.result?.result) {
    throw new Error("Failed to fetch course types");
  }
  return response.result.result;
};

export const FilterTypes: React.FC<{
  initialData: CourseTypesResultResType;
}> = ({ initialData }) => {
  const { data: courseTypes, error } = useSWR<CourseTypesResultResType>(
    "course-types",
    fetcher,
    {
      fallbackData: initialData,
    }
  );

  if (error) return <div>Error: {error.message}</div>;
  if (!courseTypes) return <FieldSkeleton />;
  if (courseTypes.length === 0)
    return (
      <div className="flex flex-1 flex-col">
        <H4 className="pb-2">Course Types</H4>
        <div>No types found</div>
      </div>
    );

  return (
    <div className="flex flex-1 flex-col">
      <H4 className="pb-2">Course Types</H4>
      <CheckboxGroup
        options={courseTypes.map((type) => ({
          id: type.typeName,
          label: type.typeName,
        }))}
        filterType="types"
      />
    </div>
  );
};

export default FilterTypes;
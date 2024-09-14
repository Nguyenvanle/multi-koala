import { H4 } from "@/components/ui/typography";
import { CheckboxGroup } from "@/features/courses/components/atoms/checkbox-group";
import { typeOptions } from "@/features/filter/enum";

export const FilterTypes: React.FC = () => (
  <div className="flex flex-1 flex-col">
    <H4 className="pb-2">Course Types</H4>
    <CheckboxGroup
      options={typeOptions.map((type) => ({ id: type, label: type }))}
      filterType="types"
    />
  </div>
);

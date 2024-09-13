import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchInputCourse({
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className="relative flex-grow md:max-w-96">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />

      <Input
        placeholder="Search courses..."
        value={value}
        onChange={onChange}
        className="pl-8 w"
      />
    </div>
  );
}

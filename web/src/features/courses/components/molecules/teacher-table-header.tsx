import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export const TeacherTableHeader: React.FC = () => (
  <TableHeader>
    <TableRow>
      <TableHead className="hidden w-[100px] sm:table-cell">
        <span className="sr-only">Image</span>
      </TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="hidden md:table-cell">Price</TableHead>
      <TableHead className="hidden md:table-cell">Total Sales</TableHead>
      <TableHead className="hidden md:table-cell">Created at</TableHead>
      <TableHead>
        <span className="sr-only">Actions</span>
      </TableHead>
    </TableRow>
  </TableHeader>
);

import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

export const TeacherTableHeader: React.FC = () => (
  <TableHeader>
    <TableRow className="text-foreground">
      <TableHead className="table-cell">ID</TableHead>
      <TableHead className="hidden w-[100px] lg:table-cell">Image</TableHead>
      <TableHead>Name</TableHead>
      <TableHead>Status</TableHead>
      <TableHead className="hidden md:table-cell">Price</TableHead>
      <TableHead className="hidden md:table-cell">Income</TableHead>
      <TableHead className="hidden md:table-cell">Total Sales</TableHead>
      <TableHead className="hidden lg:table-cell">Created at</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
);

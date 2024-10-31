import { columns } from "@/features/table/components/atoms/columns";
import { DataTable } from "@/features/table/components/atoms/data-table";
import { Payment, payments } from "@/features/table/constants/payment";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return payments;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

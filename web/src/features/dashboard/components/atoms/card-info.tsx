import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ICardInfo {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

export function CardInfo({ title, value, icon, description }: ICardInfo) {
  return (
    <Card>
      <CardHeader className="flex flex-row pb-0 items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

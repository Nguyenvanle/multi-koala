import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ICardInfo {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  href?: string;
}

export function CardInfo({ title, value, icon, description, href }: ICardInfo) {
  const render = () => (
    <Card className="hover:border-accent">
      <CardHeader className="flex flex-row pb-0 items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  if (href)
    return (
      <Link passHref href={href}>
        {render()}
      </Link>
    );

  return render();
}

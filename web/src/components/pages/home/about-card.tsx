import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface AboutCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function AboutCard({
  title,
  description,
  image,
  link,
}: AboutCardProps) {
  return (
    <Link href={link} className="flex flex-0">
      <Card className="flex flex-0 flex-col border rounded hover:shadow-md hover:shadow-accent overflow-hidden">
        <CardContent className="px-0">
          <AspectRatio ratio={16 / 9} className=" overflow-hidden">
            <Image
              src={image}
              alt={title}
              className="object-cover w-full h-auto transition-all hover:scale-105 "
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </AspectRatio>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          <CardTitle className="min-h-12 content-center hover:text-primary">
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}

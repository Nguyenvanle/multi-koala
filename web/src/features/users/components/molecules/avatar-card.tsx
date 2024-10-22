import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function UserAvatar({
  imageUrl,
  firstName,
}: {
  imageUrl: string | undefined;
  firstName: string | undefined;
}) {
  return (
    <div className="relative h-52 w-52 overflow-hidden bg-muted rounded-full">
      <Image
        src={imageUrl || "/images/smile.png"}
        alt={firstName || "avatar"}
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        quality={100}
      />
    </div>
  );
}

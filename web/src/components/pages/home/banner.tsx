import LinkButton from "@/components/ui/link-button";
import { H1, H2, H3, H4, Lead, Small } from "@/components/ui/typography";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex flex-row  space-x-4 bg-accent py-16 px-8">
      <div className="flex flex-1 flex-col space-y-4 justify-center">
        <H4 className="text-primary">Duokoala</H4>
        <H1>Course sharing platform for teachers</H1>
        <Lead>
          The ideal learning environment to connect students with teachers.
          Share knowledge with free and paid courses. Be a part of us today.
        </Lead>
        <LinkButton label="Get Started" href="/login" />
      </div>

      <div className="hidden md:flex flex-0 justify-center ">
        <div className="flex h-full w-80 relative mt-4">
          <AspectRatio ratio={1 / 1}>
            <Image
              src="/images/koala-flip.png"
              alt="Duokoala Logo"
              className="rounded-md object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              fill
            />
          </AspectRatio>
        </div>
      </div>
    </div>
  );
}

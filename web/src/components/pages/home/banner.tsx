import LinkButton from "@/components/ui/link-button";
import { H1, Lead } from "@/components/ui/typography";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex flex-row  space-x-4">
      <div className="flex flex-1 flex-col space-y-2 justify-between">
        <H1>Course sharing platform for English teachers</H1>
        <Lead>
          The ideal learning environment to connect students with teachers.
          Share English knowledge with free and paid courses. Be a part of us
          today.
        </Lead>
        <div className="flex flex-0 space-x-2">
          <LinkButton label="Get Started" href="/login" />
          <LinkButton
            label="About Duokoala"
            href="/#about"
            variant={"secondary"}
          />
        </div>
      </div>

      <div className="hidden sm:flex flex-0 justify-center ">
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

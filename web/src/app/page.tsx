import { Button } from "@/components/ui/button";
import LinkButton from "@/components/ui/link-button";
import { H1, H2, H4, Large, Lead, P } from "@/components/ui/typography";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-1 flex-col space-y-2">
        <H1>Course sharing platform for English teachers</H1>
        <Lead>
          The ideal learning environment to connect students with teachers.
          Share English knowledge with free and paid courses. Be a part of us
          today.
        </Lead>
        <div className="flex flex-1 space-x-2">
          <LinkButton label="Get Started" href="/login" />
          <LinkButton
            label="About Duokoala"
            href="/#about"
            variant={"secondary"}
          />
        </div>
      </div>
      <div className="hidden sm:flex flex-0 justify-center">
        <div className="w-[300px]">
          <AspectRatio ratio={9 / 16}>
            <Image
              src="/images/koala-flip.png"
              alt="Duokoala Logo"
              className="rounded-md object-cover"
              width={300}
              height={300}
              priority={true}
            />
          </AspectRatio>
        </div>
      </div>
    </>
  );
}

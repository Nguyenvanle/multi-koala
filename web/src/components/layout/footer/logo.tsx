import Image from "next/image";

export const Logo = () => (
  <div className="flex flex-col items-start">
    <div className="mr-2 overflow-hidden">
      <Image
        src="/images/Duokoala-Logo-512h.png"
        alt="Image"
        className="rounded-md object-cover w-auto"
        width={100}
        height={100}
        priority={true}
        quality={100}
      />
    </div>
  </div>
);

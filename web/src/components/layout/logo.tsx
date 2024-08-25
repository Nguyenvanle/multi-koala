import Image from "next/image";

export default function Logo() {
  return (
    <div className="w-[100px] mr-2">
      <Image
        src="/images/Duokoala-Logo-512h.png"
        alt="Image"
        className="rounded-md object-cover h-full"
        width={100}
        height={30}
        priority={true}
      />
    </div>
  );
}

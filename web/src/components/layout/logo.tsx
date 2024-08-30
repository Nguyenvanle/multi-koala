import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex flex-col h-9 w-28 mr-2 relative">
      <Image
        src="/images/Duokoala-Logo-512h.png"
        alt="Image"
        className="rounded-md object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        fill
      />
    </div>
  );
}

// features/courses/components/CourseImage.tsx

import Image from "next/image";

interface CourseImageProps {
  src: string;
  alt: string;
}

const CourseImage: React.FC<CourseImageProps> = ({ src, alt }) => (
  <div className="relative w-full h-48 overflow-hidden">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-center hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority
    />
  </div>
);

export default CourseImage;

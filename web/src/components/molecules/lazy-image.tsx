import { useEffect, useState } from "react";
import Image from "next/image";

interface LazyLoadImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const LazyLoadImage = ({ src, alt, width, height }: LazyLoadImageProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  const handleScroll = () => {
    const imageElement = document.getElementById(alt);
    if (imageElement) {
      const rect = imageElement.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check visibility on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id={alt}
      style={{ minHeight: height, position: "relative" }} // Giữ không gian cho hình ảnh
    >
      {isVisible && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={() => setHasLoaded(true)}
          className={`object-cover transition-opacity duration-300 ${
            hasLoaded ? "opacity-100" : "opacity-0"
          }`} // Hiệu ứng chuyển tiếp khi tải xong
        />
      )}
      {!isVisible && <div className="skeleton" style={{ minHeight: height }} />}{" "}
      {/* Thay thế bằng component skeleton nếu cần */}
    </div>
  );
};

export default LazyLoadImage;

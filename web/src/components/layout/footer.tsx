import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-accent text-foreground py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo */}
          <div className="flex flex-col items-start ">
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

          {/* Navigation Links */}
          <div className="flex flex-col">
            <h5 className="font-bold mb-2">Quick Links</h5>
            <Link href="/" className="mb-2 hover:text-gray-400">
              Home
            </Link>
            <Link href="/#about" className="mb-2 hover:text-gray-400">
              About
            </Link>
            <Link href="/#services" className="mb-2 hover:text-gray-400">
              Services
            </Link>
            <Link href="/#contact" className="mb-2 hover:text-gray-400">
              Contact
            </Link>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            <h5 className="font-bold mb-2">Contact Us</h5>
            <p className="text-sm">Email: koala@gmail.com</p>
            <p className="text-sm">Phone: +1 (555) 555-5555</p>
            <p className="text-sm">Address: Ninh Kieu, Can Tho, Viet Nam</p>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="mt-8 text-left">
          <p className="text-sm">
            © {new Date().getFullYear()} Koala Team. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

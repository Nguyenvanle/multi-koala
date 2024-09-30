import Header from "@/components/layout/header/header";
import { Users, BookOpen, DollarSign, Bell } from "lucide-react";

const sidebarItems = [
  { icon: Users, label: "Học viên" },
  { icon: BookOpen, label: "Khóa học" },
  { icon: DollarSign, label: "Tài chính" },
  { icon: Bell, label: "Thông báo" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="flex flex-grow">
        <div className="container w-fit bg-white shadow-md hidden sm:flex">
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <nav>
              {sidebarItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center p-2 hover:bg-gray-100 rounded"
                >
                  <item.icon className="mr-2" size={20} />
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="container px-4 flex flex-1 bg-secondary">
          {children}
        </div>
      </main>
    </div>
  );
}

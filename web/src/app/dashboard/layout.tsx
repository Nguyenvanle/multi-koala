import Header from "@/components/layout/header/header";
import Sidebar from "@/components/layout/sidebar/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <main className="md:pl-4 xl:pl-8 flex flex-1 flex-grow ">
        <Sidebar />
        <div className="p-4  xl:p-8 flex flex-1 bg-secondary">{children}</div>
      </main>
    </div>
  );
}
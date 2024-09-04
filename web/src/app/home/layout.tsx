import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-grow">{children}</main>
      <Footer />
    </>
  );
}

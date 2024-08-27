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
      <main className="flex flex-grow">
        <div className="container flex mx-auto px-4 lg:px-8 py-4 ">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

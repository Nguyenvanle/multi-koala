import About from "@/components/pages/home/about";
import Banner from "@/components/pages/home/banner";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4">
      <Banner />
      <About />
    </div>
  );
}

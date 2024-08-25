import About from "@/components/pages/home/about";
import Banner from "@/components/pages/home/banner";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4">
      <Banner />
      <Separator />
      <About />
    </div>
  );
}

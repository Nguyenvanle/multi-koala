import DesktopView from "@/components/pages/home/desktop-content";
import { Button } from "@/components/ui/button";

const Features: string[] = ["Feature 1", "Feature 2", "Feature 3"];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        Welcome to Our Website
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Features.map((feature, index) => (
          <div key={index} className="bg-accent p-6">
            <h2 className="text-xl font-semibold mb-4">{feature}</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
              error animi hic quae, doloribus veniam, ratione ipsam perferendis
              nulla beatae voluptatum? Error et ullam illum consequatur itaque
              mollitia modi tempore?
            </p>
            <Button>Learn More</Button>
          </div>
        ))}
      </div>

      <DesktopView />
    </div>
  );
}

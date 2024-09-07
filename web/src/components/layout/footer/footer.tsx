import { Copyright } from "@/components/layout/footer/copy-right";
import Legal from "@/components/layout/footer/legal";
import { Logo } from "@/components/layout/footer/logo";
import More from "@/components/layout/footer/more";
import { Resources } from "@/components/layout/footer/resources";
import Subscribe from "@/components/layout/footer/subscribe";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-accent text-foreground py-8 pt-4">
      <Separator className=" bg-primary mb-6" />
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <Logo />
          <Resources />
          <More />
          <Legal />
          <Subscribe />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}

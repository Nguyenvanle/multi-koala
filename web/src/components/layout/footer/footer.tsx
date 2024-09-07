import { Copyright } from "@/components/layout/footer/copy-right";
import Legal from "@/components/layout/footer/legal";
import { Logo } from "@/components/layout/footer/logo";
import More from "@/components/layout/footer/more";
import { Resources } from "@/components/layout/footer/resources";
import Subscribe from "@/components/layout/footer/subscribe";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-accent text-foreground py-8 pt-8">
      <div className="container space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <Logo />
          <Resources />
          <More />
          <Legal />
          <Subscribe />
        </div>
        <Separator className=" bg-primary mt-8" />
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Copyright />

          <div className="flex flex-row justify-end items-center">
            <Link href={"https://www.facebook.com"}>
              <Icons.facebook className="h-8 w-8 text-muted-foreground" />
            </Link>
            <Link href={"https://github.com"}>
              <Icons.gitHub className="h-[26px] w-[26px] text-muted-foreground m-1.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

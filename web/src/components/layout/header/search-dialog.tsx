import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import LinkButton from "@/components/ui/link-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `Course ${a.length - i}`
);

export default function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <LinkButton
          href=""
          label="Search..."
          variant={"outline"}
          className="flex justify-start flex-grow md:min-w-40 focus-visible:ring-0"
        />
      </DialogTrigger>
      <DialogContent className="flex flex-1 flex-grow p-0 overflow-hidden min-w-80">
        <DialogHeader className="flex flex-1 flex-grow ">
          <div className="flex flex-row">
            <div className="flex flex-0 items-center pl-3">
              <Search className=" w-5 h-5 text-muted-foreground z-10" />
            </div>
            <Input
              placeholder="Search for courses, articles, or topics..."
              className="flex flex-1 rounded-none my-1 border-b border-none pl-2"
            ></Input>
          </div>
          <DialogTitle className="tex-left hidden">Links</DialogTitle>
          <ScrollArea className="h-72 w-full ">
            <div className="px-4 text-left">
              {tags.map((tag) => (
                <div key={tag}>
                  <div className="text-sm">{tag}</div>
                  <Separator className="my-2" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
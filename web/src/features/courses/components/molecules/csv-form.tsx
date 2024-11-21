import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputFile } from "@/components/ui/upload-file";

export function DialogCSVCourse() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8">
          Upload .csv
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new course with csv file</DialogTitle>
          <DialogDescription>
            Upload a .csv file to add new courses to your account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <InputFile label={"Upload csv file"} />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

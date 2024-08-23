import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center container">
        <div className="flex flex-col items-center py-4 gap-4">
          <Button variant="default">default</Button>
          <Button variant="destructive">destructive</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="link">link</Button>
          <Button variant="outline">outline</Button>
          <Button variant="secondary">secondary</Button>
        </div>
      </div>
    </main>
  );
}

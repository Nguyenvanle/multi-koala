"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { H4 } from "@/components/ui/typography";
import { showToast } from "@/lib/utils";

export default function Subscribe() {
  return (
    <div className="flex flex-col">
      <H4>Subscribe to our newsletter</H4>
      <p className="mt-4">
        Stay up to date with the latest news and updates from our team.
      </p>
      <div className="flex flex-row items-center gap-2">
        <Input
          className="flex flex-1 focus-visible:ring-accent focus-visible:ring-offset-0 my-2"
          placeholder="you@mail.com"
        ></Input>
        <Button
          className="flex flex-0 "
          onClick={() => showToast("Success", "You have been subscribed")}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

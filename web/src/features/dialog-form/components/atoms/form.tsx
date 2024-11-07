"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn, showToast } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  lessonName: z.string(),
  lessonDescription: z.string(),
  videoDuration: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price must be a positive number").max(1000)
  ),
  demo: z.boolean().optional(),
});

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      showToast(
        "Form submitted",
        "Your form has been submitted successfully: " +
          JSON.stringify(values, null, 2),
        "default"
      );
    } catch (error) {
      console.error("Form submission error", error);
      showToast(
        "Form submission error",
        "There was an error submitting your form. Please try again.",
        "destructive"
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-3xl"
      >
        <FormField
          control={form.control}
          name="lessonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lesson Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="This is the name that represents your lesson."
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lessonDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Describe the content of your lesson."
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder="This is the minimum time it takes to complete your lesson."
                  type="number"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="demo"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
              <div className="space-y-0.5">
                <FormLabel>Demo</FormLabel>
                <FormDescription>
                  Can you present this lesson to students who have not yet
                  registered?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button type="submit">Submit</Button>
        </DialogClose>
      </form>
    </Form>
  );
}

import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import { FilterProvider } from "@/features/filter/context/provider";

const inter = Roboto_Flex({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Duokoala",
  description: "Course sharing platform for English teachers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={
          inter.className + " flex flex-col min-h-screen min-w-[320px]"
        }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FilterProvider>
            <Toaster />
            {children}
          </FilterProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

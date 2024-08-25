"use client";
import useMediaQuery from "@/hooks/useMediaQuery";

export default function DesktopView() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  return (
    <>
      {isDesktop ? (
        <div className="mt-12 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Desktop-Only Content</h2>
          <p>This section is only visible on desktop screens.</p>
        </div>
      ) : null}
    </>
  );
}

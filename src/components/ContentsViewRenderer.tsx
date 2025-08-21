"use client";
import { views } from "@/widgets/contents-views";

interface ContentsViewRendererProps {
  viewKey: string;
}

export function ContentsViewRenderer({ viewKey }: ContentsViewRendererProps) {
  const Comp = views[viewKey];
  
  if (Comp) {
    return <Comp />;
  }

  // Fallback for missing views
  return (
    <section className="flex-1 p-8 text-center text-gray-400">
      View not found: {viewKey}
    </section>
  );
}

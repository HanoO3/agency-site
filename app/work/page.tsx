import type { Metadata } from "next";
import Work from "@/components/sections/Work";

export const metadata: Metadata = {
  title: "Work & Portfolio — CARTCODE",
  description:
    "Curated digital platforms, high-performance web applications, and WordPress solutions engineered by CARTCODE.",
};

export default function WorkPage() {
  return (
    <div className="pt-20">
      <Work />
    </div>
  );
}

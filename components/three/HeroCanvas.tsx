"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#05050A] transition-opacity duration-700" />
  ),
});

export default function HeroCanvas() {
  return <HeroScene />;
}

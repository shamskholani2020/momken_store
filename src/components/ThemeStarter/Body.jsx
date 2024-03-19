import React from "react";
import Hero from "./Body/Hero";
import BestsellersSection from "./Body/BestsellersSection";

export default function Body() {
  return (
    <div className="w-full min-h-screen flex flex-col items-start justify-start gap-24 p-5 md:px-20">
      <Hero />
      <BestsellersSection />
    </div>
  );
}

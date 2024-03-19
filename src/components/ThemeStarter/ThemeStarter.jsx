import React from "react";
import { useTheme } from "../../utils/utils";
import Body from "./Body";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function ThemeStarter() {
  const theme = useTheme();

  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center gap-0">
      <Navbar />
      <Body />

      {theme?.palette?.name}
      <Footer />
    </div>
  );
}

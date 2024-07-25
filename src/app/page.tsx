"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/Navbar";


function Home() {
  return (
    <ThemeProvider>
      <Navbar />
      <div className="px-[5%]">
      </div>
    </ThemeProvider>
  );
}
export default Home;
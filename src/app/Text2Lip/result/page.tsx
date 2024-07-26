"use client";

import Dropdown from "@/components/Dropdown";
import Navbar from "@/components/Navbar";
import VideoUploadResult from "@/components/VideoboxResult";
import { ThemeProvider } from "@/context/ThemeContext";
import Link from "next/link";

function result() {
  return (
    <ThemeProvider>
      <Navbar />
      <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
        <div className="flex flex-col w-[80%] h-[60%] min-h-52 justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3">
          <VideoUploadResult />
          <div className="flex flex-row justify-evenly w-full h-16">
            <div className="transition ease-in-out delay-150 duration-200 hover:scale-105 cursor-pointer bg-white hover:bg-slate-100 text-[color:var(--text-color-1)] uppercase font-semibold rounded-full w-36 h-12 flex justify-center items-center">
              Export Voice
            </div>
            <div className="transition ease-in-out delay-150 duration-200 hover:scale-105 cursor-pointer bg-white hover:bg-slate-100 text-[color:var(--text-color-1)] uppercase font-semibold rounded-full w-36 h-12 flex justify-center items-center">
              Export Video
            </div>
            <Link
              key="backtoinput"
              href={"/Text2Speech"}
              className="transition ease-in-out delay-150 duration-200 hover:scale-105 cursor-pointer bg-white hover:bg-slate-100 text-[color:var(--text-color-1)] uppercase font-semibold rounded-full w-36 h-12 flex justify-center items-center"
            >
              Back to Input
            </Link>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
export default result;

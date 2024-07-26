"use client";

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import Dropdown from "@/components/Dropdown";
import Textbox from "@/components/Textbox";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Videobox from "@/components/Videobox";

function Text2Lip() {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    textinput: "",
    voice: "Voice: Reporter A",
    video: "",
  });
  const [videofile, setVideofile] = useState<File[]>([]);
  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = async (e: any) => {
    //prevent from refresh when submit
    e.preventDefault();
    push("/Text2Lip/result");
  };
  return (
    <ThemeProvider>
      <Navbar />
      <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
        <form
          className="flex flex-col w-[80%] h-[60%] min-h-52 justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3"
          onSubmit={onSubmit}
        >
          <div className="flex flex-row w-full h-full gap-3">
            <div className="flex flex-col w-full h-full min-h-52 justify-center items-center bg-[color:var(--palette2)] rounded-xl gap-3">
              <Textbox
                textName="textinput"
                textValue={formData.textinput}
                handleInput={handleInput}
              />
              <Dropdown
                name="voice"
                value={formData.voice}
                dropdownList={[
                  "Voice: Reporter A",
                  "Voice: Reporter B",
                  "Voice: Reporter C",
                ]}
                handleInput={handleInput}
              />
            </div>
            <div className="flex flex-col w-full h-full min-h-52 justify-center items-center bg-[color:var(--palette2)] rounded-xl gap-3">
              <Videobox />
              <Dropdown
                name="voice"
                value={formData.voice}
                dropdownList={["Video: Upload"]}
                handleInput={handleInput}
              />
            </div>
          </div>

          <input
            type="submit"
            value="submit"
            className="transition ease-in-out delay-150 duration-200 hover:scale-105 cursor-pointer bg-white hover:bg-slate-100 text-[color:var(--text-color-1)] uppercase font-semibold rounded-full w-36 h-12"
          />
        </form>
      </div>
    </ThemeProvider>
  );
}
export default Text2Lip;

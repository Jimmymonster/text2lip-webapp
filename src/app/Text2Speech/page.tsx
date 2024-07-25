"use client"

import Dropdown from "@/components/Dropdown";
import Navbar from "@/components/Navbar";
import Textbox from "@/components/Textbox";
import { ThemeProvider } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Text2Speech() {
    const [formData, setFormData] = useState({
        textinput: "",
        voice: "Voice: Reporter A",
        video: ""
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

    return (
        <ThemeProvider>
            <Navbar />
            <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)]">
                <form className="flex flex-col w-[80%] h-[60%] min-h-52 justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3">
                    <Textbox
                        textName="textinput"
                        textValue={formData.textinput}
                        handleInput={handleInput}
                    />
                    <Dropdown
                        name="voice"
                        value={formData.voice}
                        dropdownList={["Voice: Reporter A", "Voice: Reporter B", "Voice: Reporter C"]}
                        handleInput={handleInput}
                    />
                    <input
                        type="submit"
                        value="submit"
                        className="transition ease-in-out delay-150 duration-200 hover:scale-105 cursor-pointer bg-white hover:bg-slate-100 text-[color:var(--text-color-1)] uppercase font-semibold rounded-full w-36 h-12"
                    />
                </form>
            </div>
        </ThemeProvider>
    )
}
export default Text2Speech;
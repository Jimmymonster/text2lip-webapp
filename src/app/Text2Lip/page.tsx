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
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleFileChange = (file: File | null) => {
    setVideoFile(file); // Update the state with the selected file
  };

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message

    if (!videoFile) {
      setErrorMessage("Please upload a video file.");
      setIsLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append(
      "text",
      new Blob([formData.textinput], { type: "text/plain" }),
      "textfile.txt"
    );
    formDataToSend.append("video", videoFile);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/text2lip`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse JSON response for detailed error message
        console.error("Error response data:", errorData);
        throw new Error(errorData.message || "Network response was not ok");
      }

      const result = await response.json();
      if (result.task_id) {
        // Redirect to result page with task_id in the query parameters
        push(`/Text2Lip/result?task_id=${result.task_id}`);
      } else {
        setErrorMessage("Task ID not found in response.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ThemeProvider>
      <Navbar />
      <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)] min-h-96">
        <form
          className="flex flex-col w-[80%] h-[80%] min-h-96 justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3"
          onSubmit={onSubmit}
        >
          <div className="flex flex-row w-full h-full min-h-80 gap-3">
            <div className="flex flex-col w-full h-full min-h-72 justify-center items-center bg-[color:var(--palette2)] rounded-xl gap-3">
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
            <div className="flex flex-col w-full h-full min-h-72 justify-center items-center bg-[color:var(--palette2)] rounded-xl gap-3">
              <Videobox onFileChange={handleFileChange} />
              <Dropdown
                name="voice"
                value={formData.video}
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

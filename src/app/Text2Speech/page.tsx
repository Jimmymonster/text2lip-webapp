"use client";

import Dropdown from "@/components/Dropdown";
import Navbar from "@/components/Navbar";
import Textbox from "@/components/Textbox";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner"; // Import the spinner component

function Text2Speech() {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    textinput: "",
    voice: "Voice: Reporter A",
    video: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleInput = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message

    const formDataToSend = new FormData();
    formDataToSend.append(
      "text",
      new Blob([formData.textinput], { type: "text/plain" }),
      "textfile.txt"
    );
    const queryParams = new URLSearchParams();
    queryParams.append("voice", formData.voice.slice(7));
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/text2lip?${queryParams.toString()}`,
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
        push(`/Text2Speech/result?task_id=${result.task_id}`);
      } else {
        setErrorMessage("Task ID not found in response.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setErrorMessage(`Something went wrong. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)] min-h-80">
        <form
          className="flex flex-col w-[80%] h-[80%] min-h-80 justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3"
          onSubmit={onSubmit}
        >
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
          {isLoading && <LoadingSpinner />} {/* Show spinner when loading */}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <input
            type="submit"
            value="submit"
            className="transition ease-in-out duration-200 hover:scale-105 cursor-pointer bg-[color:var(--bg-box-col)] hover:bg-[color:var(--bg-box-hover-col)] text-[color:var(--text-color-1)] uppercase font-semibold rounded-full w-36 h-12"
          />
        </form>
      </div>
    </div>
  );
}

export default Text2Speech;

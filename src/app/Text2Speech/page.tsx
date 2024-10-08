"use client";

import Dropdown from "@/components/Dropdown";
import Navbar from "@/components/Navbar";
import Textbox from "@/components/Textbox";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner"; // Import the spinner component
import Inputnumber from "@/components/Inputnumber";

function Text2Speech() {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    textinput: "",
    pitch_octave: "0",
    index_rate: "0.75",
    filter_radius: "3",
    resample_sr: "0", // 0 is no resampling
    rms_mix_rate: "0.25",
    protect: "0.33",
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
    queryParams.append("pitch_octave", formData.pitch_octave);
    queryParams.append("index_rate", formData.index_rate);
    queryParams.append("filter_radius", formData.filter_radius);
    queryParams.append("resample_sr", formData.resample_sr);
    queryParams.append("rms_mix_rate", formData.rms_mix_rate);
    queryParams.append("protect", formData.protect);
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
      <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)] min-h-[450px]">
        <form
          className="flex flex-col w-[80%] h-[80%] min-h-[450px] justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3"
          onSubmit={onSubmit}
        >
          <Textbox
            textName="textinput"
            textValue={formData.textinput}
            handleInput={handleInput}
          />
          <div className="flex flex-row w-full h-fit gap-3">
          <Dropdown
            name="voice"
            value={formData.voice}
            dropdownList={[
              "Voice: Reporter A",
            ]}
            handleInput={handleInput}
          />
           </div>
          <div className="grid grid-rows-6 sm:grid-rows-3 md:grid-rows-2 grid-flow-col w-full h-fit gap-2">
          <Inputnumber
          textName="pitch_octave"
          textValue={formData.pitch_octave}
          handleInput={handleInput}
          max="12"
          min="-12"
          step="1"
          description="Change voice pitch. Input number of semitones. Higher for female like, lower for male like. value is -12 to 12"
          />
          <Inputnumber
          textName="resample_sr"
          textValue={formData.resample_sr}
          handleInput={handleInput}
          max="48000"
          min="0"
          step="1"
          description="Resampling sample rate of voice. 0 for no resampling. value is 0 to 48000"
          />
          <Inputnumber
          textName="rms_mix_rate"
          textValue={formData.rms_mix_rate}
          handleInput={handleInput}
          max="1"
          min="0"
          step="0.01"
          description="Adjust the volume envelope scaling. Closer to 0, the more it mimicks the original vocals. Closer to 1 can mask some noise but will be more of consistently loud volume. value is 0 to 1"
          />
          <Inputnumber
          textName="protect"
          textValue={formData.protect}
          handleInput={handleInput}
          max="0.5"
          min="0"
          step="0.01"
          description="Protect voiceless consonants and breath sounds. Set to 0.5 to disable. Decrease the value to increase the protection but reduce indexing accuracy. value is 0 to 0.5"
          />
          <Inputnumber
          textName="filter_radius"
          textValue={formData.filter_radius}
          handleInput={handleInput}
          max="7"
          min="0"
          step="1"
          description="The value represents the filter radius and can reduce breathiness. value is 0 to 7"
          />
          <Inputnumber
          textName="index_rate"
          textValue={formData.index_rate}
          handleInput={handleInput}
          max="1"
          min="0"
          step="0.01"
          description="Controls accent strenght, too high will be artifacting. value is 0 to 1"
          />
          </div>
          
          
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

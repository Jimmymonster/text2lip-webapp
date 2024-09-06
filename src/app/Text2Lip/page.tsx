"use client";

import Navbar from "@/components/Navbar";
import Dropdown from "@/components/Dropdown";
import Textbox from "@/components/Textbox";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Videobox from "@/components/Videobox";
import Image from 'next/image'
import Inputnumber from "@/components/Inputnumber";
import ProgressBar from "@/components/Progressbar";

function Text2Lip() {
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
    video: "Video: Default",
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const [progressState,setProgressState] = useState<[number,number,string]>([0,6,'uploading your text and video input to server']);

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

    if (!videoFile && formData.video!=="Video: Default") {
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
    if(videoFile && formData.video!=="Video: Default"){
      formDataToSend.append("video", videoFile);
    }
    const queryParams = new URLSearchParams({
      useDefaultVideo: (formData.video === "Video: Default").toString(),
    });
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
    <div>
      <Navbar />
      <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)] min-h-[500px]">
        {isLoading ? (
          <div className="flex flex-col w-[80%] h-[80%] min-h-96 justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3">
            <div className="flex flex-col justify-center items-center">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin"
              >
                <path
                  d="M32 4C26.4621 4 21.0486 5.64217 16.444 8.71885C11.8395 11.7955 8.25064 16.1685 6.13139 21.2849C4.01213 26.4012 3.45764 32.0311 4.53802 37.4625C5.61841 42.894 8.28515 47.8831 12.201 51.799C16.1169 55.7149 21.106 58.3816 26.5375 59.462C31.969 60.5424 37.5988 59.9879 42.7151 57.8686C47.8315 55.7494 52.2045 52.1605 55.2812 47.556C58.3578 42.9514 60 37.5379 60 32C60 24.5739 57.05 17.452 51.799 12.201C46.548 6.94999 39.4261 4 32 4ZM46.894 33.79L22.894 45.79C22.589 45.9424 22.2501 46.0143 21.9095 45.9989C21.5689 45.9835 21.2379 45.8812 20.948 45.7019C20.658 45.5225 20.4187 45.272 20.2528 44.9741C20.0869 44.6763 19.9999 44.341 20 44V20C20.0002 19.6592 20.0875 19.3241 20.2535 19.0265C20.4196 18.729 20.6589 18.4787 20.9488 18.2996C21.2387 18.1205 21.5696 18.0184 21.91 18.0031C22.2505 17.9878 22.5892 18.0597 22.894 18.212L46.894 30.212C47.2258 30.3783 47.5047 30.6336 47.6997 30.9494C47.8946 31.2651 47.9979 31.6289 47.9979 32C47.9979 32.3711 47.8946 32.7349 47.6997 33.0507C47.5047 33.3664 47.2258 33.6217 46.894 33.788"
                  fill="white"
                />
              </svg>
              <ProgressBar nowStep={progressState[0]} maxStep={progressState[1]} description={progressState[2]}/>
            </div>
          </div>
        ) : (
          <form
            className="flex flex-col w-[80%] h-[80%] min-h-[500px] justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3"
            onSubmit={onSubmit}
          >
            <div className="flex flex-row w-full h-full min-h-fit gap-3">
              <div className="flex flex-col w-full h-full min-h-fit justify-center items-center bg-[color:var(--palette2)] rounded-xl gap-3">
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
                    "Voice: Reporter B",
                    "Voice: Reporter C",
                  ]}
                  handleInput={handleInput}
                />
                </div>
                
                
              </div>
              <div className="flex flex-col w-full h-full min-h-fit justify-center items-center bg-[color:var(--palette2)] rounded-xl gap-3">
               { formData.video==="Video: Default"?(<Image
        src="/default_video.png"
        alt="default video image for text to lip inference"
        width={300}
        height={300}
        className="rounded-xl w-full h-full"
      />):(<Videobox onFileChange={handleFileChange} />)}
      <div className="flex flex-row w-full h-fit gap-3">
      <Dropdown
                  name="video"
                  value={formData.video}
                  dropdownList={["Video: Default","Video: Upload"]}
                  handleInput={handleInput}
                />
      </div>
                
              </div>
              
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
          
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <input
              type="submit"
              value="submit"
              className="transition ease-in-out duration-200 hover:scale-105 cursor-pointer bg-[color:var(--bg-box-col)] hover:bg-[color:var(--bg-box-hover-col)] text-[color:var(--text-color-1)] uppercase font-semibold rounded-full w-36 h-12"
            />
          </form>
        )}
      </div>
    </div>
  );
}
export default Text2Lip;

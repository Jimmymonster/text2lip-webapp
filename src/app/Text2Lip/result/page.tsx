"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import Link from "next/link";

function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [taskId, setTaskId] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const taskIdFromQuery = searchParams.get("task_id");

    if (!taskIdFromQuery) {
      // Redirect to /Text2Speech if no task_id is provided
      router.push("/Text2Speech");
      return;
    }

    setTaskId(taskIdFromQuery);
    fetchTaskStatus(taskIdFromQuery);
  }, [searchParams, router]);

  const fetchTaskStatus = async (taskId: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/text2lip/status?task_id=${taskId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setStatus(result.status);

      if (result.status === "finish") {
        fetchVideo(taskId);
        fetchVoice(taskId);
      } else if (result.status !== "error") {
        setTimeout(() => fetchTaskStatus(taskId), 2000); // Poll every 2 seconds
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideo = async (taskId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/text2lip/get_video?task_id=${taskId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch video");
      }

      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);

      // Clean up the URL object when the component is unmounted
      return () => URL.revokeObjectURL(videoUrl);
    } catch (error) {
      setErrorMessage("Failed to fetch video. Please try again.");
    }
  };

  const fetchVoice = async (taskId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/text2lip/get_voice?task_id=${taskId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch voice");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

      // Clean up the URL object when the component is unmounted
      return () => URL.revokeObjectURL(audioUrl);
    } catch (error) {
      setErrorMessage("Failed to fetch voice. Please try again.");
    }
  };

  const handleDownloadVideo = () => {
    if (videoUrl) {
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = "video.mp4"; // You can set the filename to whatever you prefer
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleDownloadVoice = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "voice.mp3"; // You can set the filename to whatever you prefer
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <ThemeProvider>
      <Navbar />
      <div className="flex justify-center items-center w-full h-[calc(100vh-4rem)] min-h-96">
        <div className="flex flex-col w-[80%] h-[80%] min-h-96 justify-center items-center bg-[color:var(--palette2)] rounded-xl px-4 py-4 gap-3">
          {errorMessage && <p className="error">{errorMessage}</p>}
          {isLoading && <p>Loading...</p>}
          {!isLoading && videoUrl && (
            <video
              controls
              ref={videoRef}
              src={videoUrl}
              className="w-full h-full"
            />
          )}
          <div className="flex flex-row justify-evenly w-full h-16">
            <button
              onClick={handleDownloadVoice}
              className="transition ease-in-out delay-150 duration-200 hover:scale-105 cursor-pointer bg-white hover:bg-slate-100 text-[color:var(--text-color-1)] uppercase font-semibold rounded-full w-36 h-12 flex justify-center items-center"
            >
              Export Voice
            </button>
            <button
              onClick={handleDownloadVideo}
              className="transition ease-in-out delay-150 duration-200 hover:scale-105 cursor-pointer bg-white hover:bg-slate-100 text-[color:var(--text-color-1)] uppercase font-semibold rounded-full w-36 h-12 flex justify-center items-center"
            >
              Export Video
            </button>
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
export default ResultPage;

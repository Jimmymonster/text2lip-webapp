import React, { useState, DragEvent } from "react";

function VideoUpload() {
  const [isDragging, setIsDragging] = useState(false); // State to track dragging
  const [videoSrc, setVideoSrc] = useState<string | null>(null); // State to hold video URL

  const handleFileChange = (file: File) => {
    const videoUrl = URL.createObjectURL(file);
    setVideoSrc(videoUrl); // Set video URL for preview
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
    setIsDragging(false); // Reset dragging state after drop
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true); // Set dragging state
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false); // Reset dragging state when leaving the drop area
  };

  const handleRemoveVideo = () => {
    setVideoSrc(null); // Clear video source to hide the video and show the upload button
  };

  return (
    <div className="w-full h-full relative">
      <div
        className={`flex items-center justify-center rounded-xl w-full h-full border border-dashed ${
          isDragging
            ? "border-blue-500 bg-slate-200"
            : "border-slate-300 bg-slate-50"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {!videoSrc && (
          <label className="absolute inset-0 flex items-center justify-center z-10 bg-slate-50 p-2 rounded-xl text-[color:var(--text-color-1)] cursor-pointer pointer-events-auto">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex flex-row gap-2">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.75 20.5H19.75V18.5H5.75V20.5ZM5.75 10.5H9.75V16.5H15.75V10.5H19.75L12.75 3.5L5.75 10.5Z"
                  fill="black"
                />
              </svg>
              Upload video
            </div>
          </label>
        )}
        {videoSrc && (
          <>
            <button
              onClick={handleRemoveVideo}
              className="absolute top-2 left-2 p-2 z-10 bg-red-500 text-white rounded"
            >
              Remove video
            </button>
            <video
              controls
              className="absolute inset-0 w-full h-full rounded-xl object-cover"
              src={videoSrc}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default VideoUpload;

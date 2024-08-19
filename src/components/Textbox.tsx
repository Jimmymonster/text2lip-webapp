import React, { useState, DragEvent } from "react";
import "./Textbox.css";

function Textbox({
  textName,
  textValue,
  handleInput,
}: {
  textName: string;
  textValue: string;
  handleInput: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const [fileInputKey, setFileInputKey] = useState(0); // Key to reset file input
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;
      handleInput({
        target: {
          name: textName,
          value: fileContent,
        },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    };
    reader.readAsText(file);
    // Reset file input value
    setFileInputKey((prevKey) => prevKey + 1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDrop = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFileChange(file);
    }
    setIsDragging(false);
  };

  const handleDragOver = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setIsDragging(true); // Set dragging state
  };

  const handleDragLeave = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setIsDragging(false); // Reset dragging state when leaving the drop area
  };

  return (
    <div className="w-full h-full relative">
      <div className="flex flex-col gap-3 w-full h-full rounded-xl drop-shadow-2xl">
        <div className="relative w-full h-full">
          <textarea
            name={textName}
            value={textValue}
            onChange={handleInput}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`custom-textarea block w-full h-full p-3 text-sm border border-[color:var(--bg-box-hover-col)] rounded-xl bg-[color:var(--bg-box-col)] resize-none pointer-events-none${
              isDragging
                ? "border-blue-500 bg-[color:var(--bg-box-hover-col)]"
                : "border-slate-500 bg-[color:var(--bg-box-col)]"
            }`}
            style={{ userSelect: "none" }}
            required
          ></textarea>
          {textValue.trim() === "" && (
            <label className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <span className="bg-[color:var(--bg-box-col)] p-2 rounded text-[color:var(--text-color-1)] cursor-pointer pointer-events-auto">
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  key={fileInputKey}
                />
                <div className="flex flex-row gap-2">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    className="fill-[color:var(--text-color-1)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.75 20.5H19.75V18.5H5.75V20.5ZM5.75 10.5H9.75V16.5H15.75V10.5H19.75L12.75 3.5L5.75 10.5Z"
                      fill=""
                    />
                  </svg>
                  Upload text file
                </div>
              </span>
            </label>
          )}
        </div>
      </div>
    </div>
  );
}

export default Textbox;

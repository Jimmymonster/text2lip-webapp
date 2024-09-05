import React, { useState, DragEvent } from "react";

function Inputnumber({
  textName,
  textValue,
  handleInput,
  max,
  min,
  step
}: {
  textName: string;
  textValue: string;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  max: string;
  min: string;
  step: string;
}) {

  return (
    <div className="w-full h-full flex items-center gap-2 text-[color:var(--text-color-1)] cursor-pointer bg-[color:var(--bg-box-col)] hover:bg-[color:var(--bg-box-hover-col)] border border-slate-400 text-sm font-semibold rounded-xl px-4 py-2">
  {/* Label and Input */}
  <label 
    htmlFor={textName} 
    className="whitespace-nowrap text-[color:var(--text-color-1)] text-sm font-semibold cursor-pointer">
    {textName.charAt(0).toUpperCase() + textName.slice(1) + " :"}
  </label>

  <input
    className="w-full bg-transparent cursor-pointer text-sm font-semibold outline-none"
    type="number"
    id={textName}   
    max={max}
    min={min}
    step={step}
    name={textName}
    value={textValue}
    onChange={handleInput}
    required
  />
</div>
  );
}

export default Inputnumber;

import React, { useState, DragEvent } from "react";

function Inputnumber({
  textName,
  textValue,
  handleInput,
  max,
  min,
  step,
  description,
}: {
  textName: string;
  textValue: string;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  max: string;
  min: string;
  step: string;
  description: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div className="relative w-full h-7 sm:h-full flex items-center gap-2 text-[color:var(--text-color-1)] cursor-pointer bg-[color:var(--bg-box-col)] hover:bg-[color:var(--bg-box-hover-col)] border border-slate-400 text-sm font-semibold rounded-xl px-4 py-2"
    onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
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
  {/* Tooltip */}
  {hover && (
        <div className="cursor-default absolute -left-2 -top-20 min-w-[300px] h-20 p-2 text-xs bg-[color:var(--bg-box-col)] text-[color:var(--text-color-1)] border-2 border-slate-500 rounded-xl shadow-lg">
          {description}
        </div>
      )}
</div>
  );
}

export default Inputnumber;

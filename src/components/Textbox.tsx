import React, { useState } from 'react';

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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const fileContent = e.target?.result as string;
                handleInput({ target: { value: fileContent } } as React.ChangeEvent<HTMLTextAreaElement>);
            };
            reader.readAsText(file);
            // Reset file input value
            setFileInputKey(prevKey => prevKey + 1);
        }
    };

    return (
        <div className="w-full h-full relative">
            <div className="flex flex-col gap-3 w-full h-full rounded-xl drop-shadow-2xl">
                <div className="relative w-full h-full">
                    <textarea
                        name={textName}
                        value={textValue}
                        onChange={handleInput}
                        className="block w-full h-full p-3 text-sm border border-slate-400 rounded-xl bg-slate-50 resize-none"
                        required
                    ></textarea>
                    {textValue.trim() === '' && (
                        <label
                            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                        >
                            <span className="bg-slate-50 p-2 rounded text-[color:var(--text-color-1)] cursor-pointer pointer-events-auto">
                                <input
                                    type="file"
                                    accept=".txt"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    key={fileInputKey}
                                />
                                <div className='flex flex-row gap-2'>
                                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.75 20.5H19.75V18.5H5.75V20.5ZM5.75 10.5H9.75V16.5H15.75V10.5H19.75L12.75 3.5L5.75 10.5Z" fill="black" />
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

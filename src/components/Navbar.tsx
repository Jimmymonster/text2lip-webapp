"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import Image from 'next/image'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="px-[5%] sticky top-0 bg-[color:var(--palette1)] font-bold">
            <nav>
                {/* > md*/}
                <div className="hidden h-16 md:flex justify-between items-center">
                    <div className="flex grow-[1] items-center justifiy-center uppercase pr-3 py-3 h-full">
                        <Link href="/" className="cursor-pointer flex w-12 h-full ">
                            <Image src="/logo.png" width={188} height={144} alt="Text to lip logo" />
                        </Link>
                    </div>
                    <div className="flex items-center justify-evenly rounded-full font-medium font-inter gap-6 px-2 py-2 h-full">
                        {[
                            ["Home", "/"],
                            ["Text2Speech", "/Text2Speech"],
                            ["Text2Lip", "/Text2Lip"],
                        ].map(([title, url], index) => (
                            <Link
                                key={index}
                                href={url}
                                className="grow h-full rounded-lg px-4 py-1 text-[color:var(--text-color-1)] font-inter font-semibold hover:bg-[color:var(--palette1-select)] hover:font-bold"
                            >
                                <div className="h-full w-full rounded-lg flex items-center justify-center">
                                    {title}
                                </div>
                            </Link>
                        ))}
                        <ThemeToggle></ThemeToggle>
                    </div>
                </div>
                {/* <md size  */}
                <div className="md:hidden h-16 flex justify-between items-center">
                    <div className="block grow-[1]">
                        <div className="w-full py-6 pb-6">
                            <div className="relative inline-block">
                                <button
                                    type="button"
                                    onClick={toggleDropdown}
                                    className="-ml-5 px-4 py-2 bg-transparent hover:ring-2 hover:outline-none font-medium rounded-lg text-sm inline-flex items-center"
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="w-6 h-6 fill-black"
                                    >
                                        <path d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                                    </svg>
                                </button>

                                {isOpen && (
                                    <div className="origin-top-right absolute left-0 mt-2 w-44 rounded-lg shadow-lg bg-[color:var(--palette1)] ring-1 ring-black ring-opacity-5">
                                        <ul
                                            role="menu"
                                            aria-orientation="vertical"
                                            aria-labelledby="options-menu"
                                        >
                                            {[
                                                ["Home", "/"],
                                                ["Text2Speech", "/Text2Speech"],
                                                ["Text2Lip", "/Text2Lip"],
                                            ].map(([title, url], index) => (
                                                <li key={index}>
                                                    <Link
                                                        href={url}
                                                        className="block rounded-lg px-1 py-1 text-[color:var(--text-color-1)] text-center font-semibold hover:bg-[color:var(--palette1-select)] hover:font-bold"
                                                        onClick={closeDropdown}
                                                    >
                                                        {title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex grow-[1] items-center justifiy-center uppercase pr-3 py-3 h-full">
                        <Link href="/" className="cursor-pointer flex w-12 h-full ">
                            <Image src="/logo.png" width={188} height={144} alt="Text to lip logo" />
                        </Link>
                    </div>

                </div>
            </nav>
        </div>
    )
}
export default Navbar;
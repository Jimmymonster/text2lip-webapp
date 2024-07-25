"use client"

import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";

function Text2Lip() {
    return (
        <ThemeProvider>
            <Navbar />
        </ThemeProvider>
    )
}
export default Text2Lip;
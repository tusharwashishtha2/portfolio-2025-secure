import React from "react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const handleResumeDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
        const response = await fetch('/assets/Tushar_Washishtha_Resume_Fixed.pdf');
        if (!response.ok) throw new Error("Network response was not ok");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Tushar_Washishtha_Resume_Fixed.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download failed, using fallback:', error);
        window.open('/assets/Tushar_Washishtha_Resume_Fixed.pdf', '_blank');
    }
};

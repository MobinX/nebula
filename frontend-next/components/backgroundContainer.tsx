import { useEffectOnce } from "@/lib/useEffectOnce";
import { useState, useEffect, ReactNode } from "react";

export default function BackgroundContainer({ children}: { children: ReactNode}) {
    //bg slide show image 
    const [imageIndex, setImageIndex] = useState(0);
    const images = ["backgrounds/slide1.jpg", "backgrounds/slide2.jpg", "backgrounds/slide3.jpg"]
    const [visibleBg, setVisibleBg] = useState(0); // 0 or 1 to toggle between backgrounds
    useEffectOnce(() => {
        const interval = setInterval(() => {
            setVisibleBg((prev) => (prev === 0 ? 1 : 0)); // Toggle visible background
            setTimeout(() => {
                setImageIndex((prev) => (prev + 1) % images.length);

            }, 1500);
        }, 6000); // Increase interval to allow fade in and out
        return () => clearInterval(interval);
    });

    // Adjust the return statement to include two divs for the backgrounds
    return (
        <main className="flex min-h-screen flex-col items-center justify-between  w-full relative">
            <div className={`absolute inset-0 bg-no-repeat bg-cover bg-center transition-opacity  duration-3000 ${visibleBg === 0 ? 'bg-fade-enter-active' : 'bg-fade-exit-active'}`} style={{ backgroundImage: `url(${images[imageIndex % images.length]})` }}></div>
            <div className={`absolute inset-0 bg-no-repeat bg-cover bg-center transition-opacity  duration-3000 ${visibleBg === 1 ? 'bg-fade-enter-active' : 'bg-fade-exit-active'}`} style={{ backgroundImage: `url(${images[(imageIndex + 1) % images.length]})` }}></div>
            {/* Foreground Content */}
            <div className="relative z-10 w-full h-screen">
                {children}
            </div>
        </main>
    );

}
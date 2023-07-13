import { Inter } from "next/font/google";
import WithPrivate from "@/features/users/components/WithPrivate/WithPrivate";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!ref.current) return;
        let angle = 0;
        const interval = setInterval(() => {
            const elem = ref.current;
            if (!elem) return;
            elem.style.background = `linear-gradient(${angle}deg, #fc00ff, #00dbde)`;
            angle = angle + 1;
        }, 1000/60);
        return () => clearInterval(interval);
    }, []);

    return (
        <WithPrivate>
            <div
                ref={ref}
                className="overflow-hidden h-screen  bg-origin-border w-full flex justify-center items-center p-2 "
            >
                <div className="bg-black bg-opacity-90  w-full h-full "></div>
            </div>
        </WithPrivate>
    );
}

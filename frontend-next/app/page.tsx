"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Member, clientWeb, codeRendererWeb, type MemberType } from "../lib/member";
import { Team } from "../lib/team";
import { memberInfo } from "@/ai/frontend-team";
import { loadPrompts } from "@/utils/loadPrompts";
import { useEffectOnce } from "@/lib/useEffectOnce";
export default function Home() {
  // const [logs, setLogs] = useState<string[]>([]);
  // const log = (msg: string) => {
  //   setLogs((prev) => [...prev, msg]);
  // }
  // useEffectOnce(() => {
  //   const initTeam = async () => {
  //     const team = new Team("frontend", log);
  //     memberInfo.forEach(async (member: MemberType) => {
  //       team.addMember(await Member(member));
  //     })
  //     team.addMember(await clientWeb(async (msg: string) => {
  //       log(msg);
  //       return prompt(msg);
  //     }));
  //     team.addMember(await codeRendererWeb(async (msg: string) => {
  //       log(msg);
  //       return prompt(msg);
  //     }));
  //     await team.setupCommunication();
  //     // setTimeout(() => {
  //     team.call("client", "team-representative", "I need a hero section");
  //     // }, 1000);
  //   }
  //   initTeam();


  // });

  console.log("Hello World");
  //bg slide show image 
  const [imageIndex, setImageIndex] = useState(0);
  const images = ["backgrounds/slide1.jpg", "backgrounds/slide2.jpg", "backgrounds/slide3.jpg"]
  const [visibleBg, setVisibleBg] = useState(0); // 0 or 1 to toggle between backgrounds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleBg((prev) => (prev === 0 ? 1 : 0)); // Toggle visible background
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Increase interval to allow fade in and out
    return () => clearInterval(interval);
  }, []);

  // Adjust the return statement to include two divs for the backgrounds
 return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full relative">
    <div className={`absolute inset-0 bg-no-repeat bg-cover bg-center transition-opacity duration-3000 ${visibleBg === 0 ? 'bg-fade-enter-active' : 'bg-fade-exit-active'}`} style={{backgroundImage: `url(${images[imageIndex % images.length]})`}}></div>
    <div className={`absolute inset-0 bg-no-repeat bg-cover bg-center transition-opacity duration-3000 ${visibleBg === 1 ? 'bg-fade-enter-active' : 'bg-fade-exit-active'}`} style={{backgroundImage: `url(${images[(imageIndex + 1) % images.length]})`}}></div>
    {/* Foreground Content */}
    <div className="relative z-10">
      {/* Your foreground content here */}
      hi
    </div>
  </main>
);
}

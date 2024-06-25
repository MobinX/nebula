"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Member, clientWeb, codeRendererWeb, type MemberType } from "../lib/member";
import { Team } from "../lib/team";
import { memberInfo } from "@/ai/frontend-team";
import { loadPrompts } from "@/utils/loadPrompts";
import { useEffectOnce } from "@/lib/useEffectOnce";
import BackgroundContainer from "@/components/backgroundContainer";
import MessageCard, { Msg } from "@/components/MessageCard";
export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const showMsg = (from: string, to: string, msg: string) => {
    setMsgs((prev) => [...prev, { from, to, msg, timestamp: new Date().toLocaleTimeString() }]);
  };
  const log = (msg: string) => {
    setLogs((prev) => [...prev, msg]);
  }
  useEffectOnce(() => {
    const initTeam = async () => {
      const team = new Team("frontend", log, showMsg);
      memberInfo.forEach(async (member: MemberType) => {
        team.addMember(await Member(member));
      })
      team.addMember(await clientWeb(async (msg: string) => {
        log(msg);
        return prompt(msg);
      }));
      team.addMember(await codeRendererWeb(async (msg: string) => {
        log(msg);
        return prompt(msg);
      }));
      await team.setupCommunication();
      // setTimeout(() => {
      // team.call("client", "team-representative", "I need a hero section");
      // }, 1000);
    }
    // initTeam();


  });


  return (
    <BackgroundContainer>
      <div className="w-full h-full grid grid-cols-12 gap-4 items-center px-6 py-7">
        <div className="col-span-12 md:col-span-4 md:col-start-9">
          <MessageCard msg={msgs} />
        </div>
      </div>
    </BackgroundContainer>
  );
}

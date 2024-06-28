"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Member, clientWeb, codeRendererWeb, type MemberType } from "@/lib/v2/member";
import { Team } from "@/lib/v2/team";
import { memberInfo } from "@/ai/devx";
import { loadPrompts } from "@/utils/loadPrompts";
import { useEffectOnce } from "@/lib/useEffectOnce";
import BackgroundContainer from "@/components/backgroundContainer";
import MessageCard, { Msg } from "@/components/MessageCard";
import CodeRenderer from "@/components/CodeRenderer";
import LogViewer from "@/components/LogViewer";
import { CardBack, CardFace, CardFlipper } from "@/components/CardFlipper";
import CodeViewer from "@/components/CodeViewer";
export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [teamInstance, setTeamInstance] = useState<Team | null>(null);
  const [html, setHtml] = useState<string | null>(null)
  const [isClientAllowedInput, setIsClientAllowedInput] = useState<boolean>(true)
  const showMsg = (msgsx:Msg[]) => { console.log(msgsx);
    setMsgs(msgsx);
   
  };
  const sendMsg = async (msg: string) => {
    log(`client: ${msg}`);
    teamInstance?.call("client", "developer", msg);
  }
  const log = (msg: string) => {
    console.log(msg);
    setLogs((prev) => [...prev, msg]);
  }
  useEffectOnce(() => {
    const initTeam = async () => {
      console.log("initTeam");
      const team = new Team("frontend", log, showMsg);
      setTeamInstance(team);
      memberInfo.forEach(async (member: MemberType) => {
        await team.addMember(await Member(member));
      })
      team.addMember(await clientWeb(async (msg: string) => {
        setIsClientAllowedInput(true)
      }));
      team.addMember(await codeRendererWeb(async (msg: string) => {
        setHtml(msg)
        setIsClientAllowedInput(true)
      }));
      await team.setupCommunication();
      // setTimeout(() => {
      // team.call("client", "representative", "I need a hero section");
      // }, 1000);
    }
    initTeam();


  });


  return (
    <BackgroundContainer>
      <div className="w-full h-full grid grid-cols-12 grid-rows-3  grid-flow-row gap-5 items-center px-6 py-10">
        <div className="col-span-12 row-span-3 md:col-span-8 hidden md:flex h-full">
          <CardFlipper>
            <CardFace>
              <CodeRenderer code={html || ""} />
            </CardFace>
            <CardBack>
              <CodeViewer code={html || ""} />
            </CardBack>
          </CardFlipper>
        </div>
        <div className="col-span-12 row-span-3 md:col-span-4 md:col-start-9 h-full">
          <CardFlipper>
            <CardFace>
              <MessageCard msg={msgs} onMsgSend={msg => sendMsg(msg)} setIsClientAllowedInput={state => setIsClientAllowedInput(state)} isClientAllowedInput={isClientAllowedInput} />
            </CardFace>
            <CardBack>
              <LogViewer logs={logs} />
            </CardBack>
          </CardFlipper>
          {/* <MessageCard msg={msgs} onMsgSend={msg => sendMsg(msg)} setIsClientAllowedInput={state=>setIsClientAllowedInput(state)} isClientAllowedInput={isClientAllowedInput}/> */}
          {/* <LogViewer  logs={logs}/> */}
        </div>
      </div>
    </BackgroundContainer>
  );
}

"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { Member, clientWeb, codeRendererWeb, type MemberType } from "../../lib/member";
import { Team } from "../../lib/team";
import { memberInfo } from "@/ai/frontend-team";
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
  const [isShowingMsgCard, setIsShowingMsgCard] = useState<boolean>(true)
  const [isClientAllowedInput, setIsClientAllowedInput] = useState<boolean>(true)
  const showMsg = (from: string, to: string, msg: string) => {
    setMsgs((prev) => [...prev, { from, to, msg, timestamp: new Date().toLocaleTimeString() }]);
  };
  const sendMsg = async (msg: string) => {
    log(`client: ${msg}`);
    teamInstance?.call("client", "representative", msg);
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
        <div className={`col-span-12 row-span-3 md:col-span-8  md:flex h-full ${isShowingMsgCard == false ? "flex" : " hidden md:flex"}`}>
          <CardFlipper>
            <CardFace>
              <CodeRenderer code={html || ""} isShowingMsgCard={isShowingMsgCard} setCardState={(state:boolean)=> setIsShowingMsgCard(state)} />
            </CardFace>
            <CardBack>
              <CodeViewer code={html || ""} isShowingMsgCard={isShowingMsgCard} setCardState={(state:boolean)=> setIsShowingMsgCard(state)} />
            </CardBack>
          </CardFlipper>
        </div>
        <div className={`col-span-12 row-span-3 md:col-span-4 md:col-start-9 h-full ${isShowingMsgCard == true ? "block" : " hidden md:block"}`}>
          <CardFlipper>
            <CardFace>
              <MessageCard msg={msgs} onMsgSend={msg => sendMsg(msg)} setIsClientAllowedInput={state => setIsClientAllowedInput(state)} isClientAllowedInput={isClientAllowedInput} isShowingMsgCard={isShowingMsgCard} setCardState={(state:boolean)=> setIsShowingMsgCard(state)} />
            </CardFace>
            <CardBack>
              <LogViewer logs={logs} isShowingMsgCard={isShowingMsgCard} setCardState={(state:boolean)=> setIsShowingMsgCard(state)} />
            </CardBack>
          </CardFlipper>
          {/* <MessageCard msg={msgs} onMsgSend={msg => sendMsg(msg)} setIsClientAllowedInput={state=>setIsClientAllowedInput(state)} isClientAllowedInput={isClientAllowedInput}/> */}
          {/* <LogViewer  logs={logs}/> */}
        </div>
      </div>
    </BackgroundContainer>
  );
}

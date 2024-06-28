import { sys } from "typescript";
// import { readFileSync } from "fs";

import {  historyManager, type historyManagerType } from "@/utils/callGemini";
import { generateGemini } from "@/utils/callGeminiAction";
import { log } from "@/utils/log";
import { loadPrompts } from "@/utils/loadPrompts";
import { execGemini } from "@/utils/execGemini";
//ai team member initalizers 

//dummy implementation of readFileSync
const readFileSync = (file: string, encoding: string) => {
    return "";
}
export interface MemberType {
    role: string;
    roleDescription: string;
    systemPrompt: string;
    promptSrc: "file" | "url" | "text";
}
export interface MemberOutput {
    chatHistory: historyManagerType; // Replace with the appropriate type
    role: string;
    roleDescription: string;
    noNeedReply? : boolean;
    progresiveOutput?: boolean;
    needProgesiveOutput?: boolean;
    call: (from: string, msg: any) => Promise<any>;
    addModelResponse?: (msg: any) => void;
    setUpCommunication: (members: Map<string, MemberOutput>,comPrompt:string) => void // Replace with the appropriate type
}

export const Member = async (memeberInfo: MemberType): Promise<MemberOutput> => {
    //first get system prompt
    let systemPrompt = (await loadPrompts(memeberInfo.promptSrc, memeberInfo.systemPrompt)).prompt;
    
    const memberChatHistory = historyManager;
    return {
        chatHistory: memberChatHistory,
        role: memeberInfo.role,
        roleDescription: memeberInfo.roleDescription,
        progresiveOutput: true,
        setUpCommunication:  (members: Map<string, MemberOutput>,comPrompt:string) => {
            let memberlist = ""
            for (const [role, member] of members) {
                if (role != memeberInfo.role)
                    memberlist += `${role} - ${member.roleDescription}\n`;
            }
            // log(`[members] [${memeberInfo.role}] Members: ${memberlist}`);
            //load communication prompts
            let totalPrompt = systemPrompt + `You can only send messages to them:  ${memberlist}`
            
            memberChatHistory.add("user", totalPrompt);

        },
        call: async (from: string, msg: any) => {
            try {
                return await execGemini({ msgx: `[[system]] Hey ${memeberInfo.role}, ${from} has sent you a msg: ${msg}`, history: memberChatHistory });
                memberChatHistory.add("user", `Hey ${memeberInfo.role}, ${from} has sent you a msg: ${msg}`);
            } catch (e) {
                console.log("[Member] Error in member call: ", e);
                throw e;
            }
        },
        addModelResponse: (msg: any) => {
            memberChatHistory.add("model", msg);
        }
    };
};

const prompt = (rl: any, query: any) => new Promise((resolve) => rl.question(query, resolve));

export const client = async (rl: any): Promise<MemberOutput> => {
    //first get system prompt


    const memberChatHistory = historyManager;
    return {
        chatHistory: memberChatHistory,
        role: "client",
        noNeedReply: true,
        roleDescription: "Client is the person , for whom the team is working for. The client can send messages to the team members and get the response from the team members",
        setUpCommunication: (members: Map<string, MemberOutput>,comPrompt:string) => {

        },
        call: async (from: string, msg: any) => {
            try {
                memberChatHistory.add("user", `${from} has sent you a msg: ${msg}`);
                const response: any = await prompt(rl, '${from} has sent you a msg: ${msg}');
                memberChatHistory.add("model", response);
                return { calls: [{ tergetCaller: "representative", msg: response }] };
            } catch (e) {
                console.log("[Member] Error in member call: ", e);
                throw e;
            }
        },
    };
};


export const clientWeb = async (onCall:Function): Promise<MemberOutput> => {
    //first get system prompt


    const memberChatHistory = historyManager;
    return {
        chatHistory: memberChatHistory,
        role: "client",
        noNeedReply: true,
        roleDescription: "Client is the person , for whom the team is working for. The client can send messages to the team members and get the response from the team members",
        setUpCommunication: (members: Map<string, MemberOutput>,comPrompt:string) => {

        },
        call: async (from: string, msg: any) => {
            try {
                memberChatHistory.add("user", `${from} has sent you a msg: ${msg}`);
                const response: any = await onCall('${from} has sent you a msg:" + ${msg}');
                // memberChatHistory.add("model", response);
                // return { calls: [{ tergetCaller: "representative", msg: response }] };
                return {calls: [{ tergeCaller: "developer", msg: response }] }
            } catch (e) {
                console.log("[Member] Error in member call: ", e);
                throw e;
            }
        },
    };
};




export const codeRendererWeb = async (onCall:Function): Promise<MemberOutput> => {
    //first get system prompt


    const memberChatHistory = historyManager;
    return {
        chatHistory: memberChatHistory,
        role: "code-renderer",
        noNeedReply: true,
        needProgesiveOutput: true,
        roleDescription: "Code renderer is the worker who is responsible for rendering the code to client for review. The code renderer can show the code to the client and get the feedback from the client. The code renderer can also send the code to the team members for review.",
        setUpCommunication: (members: Map<string, MemberOutput>,comPrompt:string) => {

        },
        call: async (from: string, msg: any) => {
            try {
                memberChatHistory.add("user", `${from} has sent you a msg: ${msg}`);
                const response: any = await onCall(msg);
                // memberChatHistory.add("model", response);
                return { calls: [{ tergeCaller: "developer", msg: response }] };
            } catch (e) {
                console.log("[Member] Error in member call: ", e);
                throw e;
            }
        },
    };
};




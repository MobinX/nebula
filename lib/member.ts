import { sys } from "typescript";
import { readFileSync } from "fs";
import { generateGemini, historyManager, type historyManagerType } from "../utils/callGemini";
import { log } from "../utils/log";
import { loadPrompts } from "../utils/loadPrompts";
//ai team member initalizers 
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
    call: (from: string, msg: any) => Promise<any>;
    setUpCommunication: (members: Map<string, MemberOutput>,comPrompt:string) => void // Replace with the appropriate type
}

export const Member = async (memeberInfo: MemberType): Promise<MemberOutput> => {
    //first get system prompt
    let systemPrompt = "";
    if (memeberInfo.promptSrc === "file") {
        try {
            //read file
            systemPrompt = readFileSync(memeberInfo.systemPrompt, 'utf8');
        } catch (e) {
            console.log("[Member] Error reading file: ", e);
            throw e;
        }
    } else if (memeberInfo.promptSrc === "url") {
        try {
            const response = await fetch(memeberInfo.systemPrompt);
            systemPrompt = await response.text();
        } catch (e) {
            console.log("[Member] Error fetching url: ", e);
            throw e;
        }
    } else if (memeberInfo.promptSrc === "text") {
        systemPrompt = memeberInfo.systemPrompt;
    }

    const memberChatHistory = historyManager;
    return {
        chatHistory: memberChatHistory,
        role: memeberInfo.role,
        roleDescription: memeberInfo.roleDescription,
        setUpCommunication:  (members: Map<string, MemberOutput>,comPrompt:string) => {
            let memberlist = ""
            for (const [role, member] of members) {
                if (role != memeberInfo.role)
                    memberlist += `${role} - ${member.roleDescription}\n`;
            }
            log(`[members] [${memeberInfo.role}] Members: ${memberlist}`);
            //load communication prompts
            
            memberChatHistory.add("user", systemPrompt + "\n" + comPrompt.replace("MEMBER_LIST", memberlist));

        },
        call: async (from: string, msg: any) => {
            try {
                memberChatHistory.add("user", `${from} has sent you a msg: ${msg}`);
                const response = await generateGemini(memberChatHistory.history);
                memberChatHistory.add("model", response);
                return response;
            } catch (e) {
                console.log("[Member] Error in member call: ", e);
                throw e;
            }
        },
    };
};

const prompt = (rl: any, query: any) => new Promise((resolve) => rl.question(query, resolve));

export const client = async (rl: any): Promise<MemberOutput> => {
    //first get system prompt


    const memberChatHistory = historyManager;
    return {
        chatHistory: memberChatHistory,
        role: "client",
        roleDescription: "Client is the person , for whom the team is working for. The client can send messages to the team members and get the response from the team members",
        setUpCommunication: (members: Map<string, MemberOutput>,comPrompt:string) => {

        },
        call: async (from: string, msg: any) => {
            try {
                memberChatHistory.add("user", `${from} has sent you a msg: ${msg}`);
                const response: any = await prompt(rl, '${from} has sent you a msg: ${msg}');
                memberChatHistory.add("model", response);
                return { calls: [{ tergetCaller: "team-represntative", msg: response }] };
            } catch (e) {
                console.log("[Member] Error in member call: ", e);
                throw e;
            }
        },
    };
};




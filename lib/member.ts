import { sys } from "typescript";
import { readFileSync } from "fs";
import { generateGemini, historyManager, type historyManagerType } from "../utils/callGemini";
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
    call: (from:string,msg: any) => Promise<any>;
    setUpCommunication: (comPrompt:string) => void // Replace with the appropriate type
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
        setUpCommunication: (comPromt: string) => {
            memberChatHistory.add("user", systemPrompt + "\n" + comPromt );

        },
        call: async (from:string,msg: any) => {
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

export const client = async (rl:any): Promise<MemberOutput> => {
    //first get system prompt
    
    
    const memberChatHistory = historyManager;
    return {
        chatHistory: memberChatHistory,
        role: "client",
        roleDescription: "Client is the person , for whom the team is working for. The client can send messages to the team members and get the response from the team members",
        setUpCommunication: (comPromt: string) => {
           
        },
        call: async (from:string,msg: any) => {
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




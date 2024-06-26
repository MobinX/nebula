//team intializers 

import { loadPrompts } from "@/utils/loadPrompts";
// import { log } from "../utils/log";
import type { MemberOutput } from "./member";
import { parseSys } from "@/utils/parseSys";
import { Msg } from "@/components/MessageCard";
interface msgType {
    from: string
    to: string
    msg: string
}
export class Team {
    // members is hash map of members
    name: string;
    members: Map<string, MemberOutput>;
    log: Function;
    showMsg: Function;
    msgsx: Msg[]
    constructor(name: string, log: Function, showMsg: Function) {
        this.members = new Map();
        this.name = name;
        this.log = log;
        this.showMsg = showMsg;
        this.msgsx = []
        this.log(`[Team] Created team: ${name}`);

    }
    async addMember(member: MemberOutput) {
        this.members.set(member.role, member);
        this.log(`[Team] Added member: ${member.role}`);
    }
    getMembers() {
        return this.members.keys();
    }
    getMember(role: string) {
        return this.members.get(role);
    }
    getMemeberListExceptRole(thisrole: string) {
        let memberlist = ""
        for (const [role, member] of this.members) {
            if (role != thisrole)
                memberlist += `${role} - ${member.roleDescription}\n`;
        }
        return memberlist;
    }

    //call any member
    async call(from: string, role: string, msg: any, noShowForFirstTimeMsg: boolean = false) {
        // console.log(`[Team] ${from} pvpvp ${role}: ${msg}`);
        const member = this.members.get(role);

        if (member) {
            try {
                if (from == role) {
                    this.log(`[Team] Error calling member: ${role}, you can not call yourself... Retrying...`);
                    await this.call("system", role, `you can not call yourself,rather call the acurate person you need to call, this is list of persons you are only allowed to call: ${this.getMemeberListExceptRole(role)} respected member please try again the last message and give replay according to schema`);
                    return;
                }
                this.log(`[Team] ${from} calling ${role}: ${msg}`);
                if (noShowForFirstTimeMsg == false) {
                    this.msgsx.push({ from: from, to: role, msg: msg, timestamp: new Date().toLocaleTimeString() })
                    this.showMsg(this.msgsx)
                }
                let response = await member.call(from, msg);
                if (member.noNeedReply == false || member.noNeedReply == undefined) {
                    let tempMsg = ""
                    // console.log(`[Team] ${role}'s i am running`)
                    if (response == "ERROR") {
                        this.log(`[Team] Error calling member: ${role},Retrying...`);
                        await this.call("system", role, "There is a error happened in system,Please try again the last message and give replay according to schema");
                        return;
                    }
                    if (member.progresiveOutput == true) {
                        try {
                            let isMsgShowingStarted = false
                            let tempCallMsg = ""
                            let thisMsgIndex = 0
                            for await (const msg of response.stream) {
                                console.log("msg", msg.text())
                                console.log("thos index", thisMsgIndex)
                                console.log("isMsgShowingStarted", isMsgShowingStarted)
                                tempMsg += msg.text()
                                const callInfo = parseSys(tempMsg)
                                if (callInfo) {
                                    this.log(`[Team] ${role} thought: ${callInfo.thoughts}`);
                                    tempCallMsg += callInfo.msg
                                    if (!isMsgShowingStarted) {
                                        this.msgsx.push({ from: role, to: from, msg: callInfo.msg, timestamp: new Date().toLocaleTimeString() })
                                        this.showMsg(this.msgsx)
                                        isMsgShowingStarted = true
                                        thisMsgIndex = this.msgsx.length - 1
                                    }
                                    else {
                                        this.msgsx[thisMsgIndex] = { ...this.msgsx[thisMsgIndex], msg: callInfo.msg }
                                        this.showMsg(this.msgsx)
                                    }
                                    if (this.members.get(callInfo.to) && this.members.get(callInfo.to)?.needProgesiveOutput) {
                                        await this.call(role, callInfo.to, callInfo.msg, true);
                                    }
                                }
                            }
                            const totalCallInfo = parseSys(tempMsg)
                            if (totalCallInfo) {
                                await this.call(role, totalCallInfo.to, totalCallInfo.msg, true);
                            }
                            if (member.addModelResponse) {
                                member.addModelResponse(tempMsg)
                            }
                        }
                        catch (e) {
                            this.log(`[Team] Error calling member: ${role},Retrying...`);
                            this.log(`[Team] Error calling member: ${role} and error is: ${e}`);
                            console.log(e)
                            // await this.call("system", role, "There is a error happened in system,Please try again the last message and give replay according to schema");
                            return;

                        }
                    }
                }

            }
            catch (e) {
                this.log(`[Team] Error calling member: ${role} and error is: ${e}`);
                console.log(e)
                await this.call("system", role, "There is a error happened in system,please try again the last message and give replay according to schema");
                return;
            }
        } else {
            this.log(`[Team] Member not found: ${role} called from ${from}... Retrying...`);
            await this.call("system", role, `MEMBER NOT FOUND.remeber you can only call the listed members that is given you earlier.you are only allowed to call this members ${this.getMemeberListExceptRole(role)}.May be make any typo or mistake in memberName give replay according to schema`);
            return;
        }
    }

    async setupCommunication() {
        this.log(`[Team] Setting up communication`);

        let comPromt = await loadPrompts("url", "prompts/communications.txt");

        //setup communication for each member
        for (const [role, member] of this.members) {
            member.setUpCommunication(this.members, comPromt.prompt);
        }

    }
}

// interface callType {
//     calls: [ // you can make multiple calls with different members in one go with this array
//         to: string, // member you want to call must match name from the list of members
//         msg: any // message you want to send to the member
//     ]
// }
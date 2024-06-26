//team intializers 

import { loadPrompts } from "../utils/loadPrompts";
// import { log } from "../utils/log";
import type { MemberOutput } from "./member";

export class Team {
    // members is hash map of members
    name: string;
    members: Map<string, MemberOutput>;
    log: Function;
    showMsg: Function;
    constructor(name: string, log: Function, showMsg: Function) {
        this.members = new Map();
        this.name = name;
        this.log = log;
        this.showMsg = showMsg;
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
    async call(from: string, role: string, msg: any) {
        console.log(`[Team] ${from} pvpvp ${role}: ${msg}`);
        const member = this.members.get(role);
        
        if (member) {
            try {
                if (from == role) {
                    this.log(`[Team] Error calling member: ${role}, you can not call yourself... Retrying...`);
                    await this.call("system", role, `you can not call yourself,rather call the acurate person you need to call, this is list of persons you are only allowed to call: ${this.getMemeberListExceptRole(role)} respected member please try again the last message and give replay according to schema`);
                    return;
                }
                this.log(`[Team] ${from} calling ${role}: ${msg}`);
                this.showMsg(from, role, msg)
                let response = await member.call(from, msg);
                if (member.noNeedReply == false || member.noNeedReply == undefined) {
                    console.log(`[Team] ${role}'s i am running`)
                    if (response == "ERROR") {
                        this.log(`[Team] Error calling member: ${role},Retrying...`);
                        await this.call("system", role, "There is a error happened in system,may be JSON Parser  failed to parse you msg string,double check if you the correctly using escapped quetos,if not please rewrite the respone,remember you must make atleast one 'calls' with 'tergetCaller' and 'msg' to call any member even the client, respected member please try again the last message and give replay according to schema");
                        return;
                    }
                    if (response.calls == undefined && member?.noNeedReply == false && member.noNeedReply == undefined) {
                        this.log(`[Team] Error calling member: ${role}, there is no replay call... Retrying...`);
                        await this.call("system", role, "oh you have not created any 'calls' array in response, remember you must make atleast one 'calls' with 'tergetCaller' and 'msg' to call any member even the client, so respected member please try again with the last message and give replay according to schema");
                        return;
                    }
                    if (response.calls.length < 0 && member?.noNeedReply == false && member.noNeedReply == undefined) {
                        this.log(`[Team] Error calling member: ${role}, there is no replay call... Retrying...`);
                        await this.call("system", role, "oh you have not created any 'calls' array in response, remember you must make atleast one 'calls' array item with 'tergetCaller' and 'msg' to call any member even the client, so respected member please try again with the last message and give replay according to schema");
                        return;

                    }
                    if ((response.calls[0].tergetCaller == undefined || response.calls[0].msg == undefined) && member?.noNeedReply == false && member.noNeedReply == undefined) {
                        this.log(`[Team] Error calling member: ${role}, there is no replay call... Retrying...`);
                        await this.call("system", role, "oh you have created a 'calls' array in response but it doesnot have 'tergetCaller' field or 'msg' field, remember you must make atleast one 'calls' array item with 'tergetCaller' and 'msg' to call any member even the client, so respected member please try again with the last message and give replay according to schema");
                        return;
                    }
                    //call the members
                    for (const call of response.calls) {
                        this.log(`[Team] ${role}'s thought: ${call.thoughts}`)
                        console.log(`ddddddddddddddd  ${role} ${call.tergetCaller} ${call.msg}`)
                        if (typeof call.msg != "string") {
                            await this.call(role, call.tergetCaller, JSON.stringify(call.msg));

                        }
                        else {
                            await this.call(role, call.tergetCaller, call.msg);
                        }
                    }
                }

            }
            catch (e) {
                this.log(`[Team] Error calling member: ${role} and error is: ${e}`);
                await this.call("system", role, "There is a error happened in system,may be JSON Parser  failed to parse you msg string,double check if you the correctly using escapped quetos,if not please rewrite the respone,remember you must make atleast one 'calls' with 'tergetCaller' and 'msg' to call any member even the client, respected member please try again the last message and give replay according to schema");
                return;
            }
        } else {
            this.log(`[Team] Member not found: ${role} called from ${from}... Retrying...`);
            await this.call("system", role, `MEMBER NOT FOUND.remeber you can only call the listed members that is given you earlier.you are only allowed to call this members ${this.getMemeberListExceptRole(role)}.May be make any typo or mistake in memberName, and you must make atleast one 'calls' with 'tergetCaller' and 'msg' to call any member even the client, respected member please try again the last message and give replay according to schema`);
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
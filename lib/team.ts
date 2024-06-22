//team intializers 

import { loadPrompts } from "../utils/loadPrompts";
import { log } from "../utils/log";
import type { MemberOutput } from "./member";

export class Team {
    // members is hash map of members
    name: string;
    members: Map<string, MemberOutput>;
    constructor(name: string) {
        this.members = new Map();
        this.name = name;
        log(`[Team] Created team: ${name}`);

    }
    async addMember(member: MemberOutput) {
        this.members.set(member.role, member);
        log(`[Team] Added member: ${member.role}`);
    }
    getMembers() {
        return this.members.keys();
    }
    getMember(role: string) {
        return this.members.get(role);
    }
    //call any member
    async call(from:string,role: string, msg: any) {
        const member = this.members.get(role);
        if (member) {
            try {
                log(`[Team] Calling member: ${role}`);
                let response = await member.call(from,msg);
                if (response == "ERROR") {
                    log(`[Team] Error calling member: ${role},Retrying...`);
                    await this.call("call system",role, "There is a error happened in system,remember you must make atleast one 'calls' with 'to' and 'msg' to call any member even the client, respected member please try again the last message and give replay according to schema");
                    return;
                }
                if (response.calls == undefined) {
                    log(`[Team] Error calling member: ${role}, there is no replay call... Retrying...`);
                    await this.call("call system",role, "oh you have not created any 'calls' array in response, remember you must make atleast one 'calls' with 'to' and 'msg' to call any member even the client, so respected member please try again with the last message and give replay according to schema");
                    return;
                }
                if (response.calls.length < 0) {
                    log(`[Team] Error calling member: ${role}, there is no replay call... Retrying...`);
                    await this.call("call system",role, "oh you have not created any 'calls' array in response, remember you must make atleast one 'calls' array item with 'to' and 'msg' to call any member even the client, so respected member please try again with the last message and give replay according to schema");
                    return;

                }
                if (response.calls[0].to == undefined || response.calls[0].msg == undefined) {
                    log(`[Team] Error calling member: ${role}, there is no replay call... Retrying...`);
                    await this.call("call system",role, "oh you have created a 'calls' array in response but it doesnot have 'to' field or 'msg' field, remember you must make atleast one 'calls' array item with 'to' and 'msg' to call any member even the client, so respected member please try again with the last message and give replay according to schema");
                    return;
                }
                //call the members
                for (const call of response.calls) {
                    await this.call(role,call.to, call.msg);
                }
            }
            catch (e) {
                log(`[Team] Error calling member: ${role} and error is: ${e}`);
                await this.call("call system",role, "There is a error happened in system,remember you must make atleast one 'calls' with 'to' and 'msg' to call any member even the client, respected member please try again the last message and give replay according to schema");
                return;
            }
        } else {
            log(`[Team] Member not found: ${role}`);
            await this.call("call system",role, "MEMBER NOT FOUND.remeber you can only call the listed members that is given you earlier.may be make any typo or mistake in memberName, and you must make atleast one 'calls' with 'to' and 'msg' to call any member even the client, respected member please try again the last message and give replay according to schema");
            return;
        }
    }
    async setupCommunication() {
        log(`[Team] Setting up communication`);
        // setup communication between members
        let memberlist = ""
        for (const [role, member] of this.members) {
            memberlist += `${role} - ${member.roleDescription}\n`;
        }
        log(`[Team] Members: ${memberlist}`);
        //load communication prompts
        let comPromt = await loadPrompts("file", "prompts/communications.txt");
        comPromt = comPromt.replace("MEMBER_LIST", memberlist);
        //setup communication for each member
        for (const [role, member] of this.members) {
            member.setUpCommunication(comPromt);
        }

    }
}

// interface callType {
//     calls: [ // you can make multiple calls with different members in one go with this array
//         to: string, // member you want to call must match name from the list of members
//         msg: any // message you want to send to the member
//     ]
// }
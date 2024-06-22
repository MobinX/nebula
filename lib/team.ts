//team intializers 

import { loadPrompts } from "../utils/loadPrompts";
import { log } from "../utils/log";
import type { MemberOutput } from "./member";

class Team {
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
    async call(role: string, msg: any) {
        const member = this.members.get(role);
        if (member) {
            try {
                log(`[Team] Calling member: ${role}`);
                return await member.call(msg);
            }
            catch (e) {
                log(`[Team] Error calling member: ${role} and error is: ${e}`);
                return null;
            }
        } else {
            log(`[Team] Member not found: ${role}`);
            return null;
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
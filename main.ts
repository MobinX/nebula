import { Member } from "./lib/member";
import { Team } from "./lib/team";
import readline from "readline"
// a cli chat interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//initialize the member
// const member = await Member({
//     role: "AI",
//     roleDescription: "AI team member",
//     systemPrompt: "https://raw.githubusercontent.com/mustvlad/ChatGPT-System-Prompts/main/prompts/educational/historical-expert.md",
//     promptSrc: "url"
// });

// console.log(member.roleDescription);
// console.log("AI: ", member.chatHistory.history[0].parts[0].text);
// rl.on('line', async (input) => {
//     try {
//         const response = await member.call(input);
//         console.log("AI: ", response);
//         rl.prompt();
//     } catch (e) {
//         console.log("[Main] Error in main: ", e);
//         rl.close();
//     }
// });
// rl.prompt();

let memberInfo = [
    {
        role: "Team Represntative",
        roleDescription: "The team representative who is responsible for the team communication and coordination with client and send orders to the other team members",
        systemPrompt: "Your work is to communicate with the client and send orders to the other team members.they may communicate with you for any help or information.if need , you may ask for help from the client or other team members.MUST use communication schema for any calling to team member or client.",
        promptSrc: "text"
    },
    {
        role: "AI",
        roleDescription: "AI team member",
        systemPrompt: "https://raw.githubusercontent.com/mustvlad/ChatGPT-System-Prompts/main/prompts/educational/historical-expert.md",
        promptSrc: "url"
    }

]

let frontendTeam = new Team("FrontendTeam");

frontendTeam.addMember(await Member({
    role: "",
    roleDescription: "AI team member",
    systemPrompt: "https://raw.githubusercontent.com/mustvlad/ChatGPT-System-Prompts/main/prompts/educational/historical-expert.md",
    promptSrc: "url"
}));
import { Member, client, codeRenderer, type MemberType } from "./lib/member";
import { Team } from "./lib/team";
import readline from "readline"
// a cli chat interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const prompt = (rl: any, query: any) => new Promise((resolve) => rl.question(query, resolve));

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

let memberInfo:MemberType[] = [
    {
        role: "team-representative",
        roleDescription: "The  team representative who is responsible for the team communication and coordination with client and send orders to the other team members",
        systemPrompt: "prompts/frontend/representative.txt",
        promptSrc: "file"
    },
    {
        role: "planner",
        roleDescription: "The planner who is responsible for planning the frontend work and assign the work to the frontend developers.",
        systemPrompt: "prompts/frontend/planner.txt",
        promptSrc: "file"
    },
    {
        role: "developer",
        roleDescription: "The frontend developer who is responsible for developing the frontend work according to the plan.",
        systemPrompt: "prompts/frontend/developer.txt",
        promptSrc: "file"
    }
]

let frontendTeam = new Team("FrontendTeam");

for (let member of memberInfo) {
    frontendTeam.addMember(await Member(member));
}
frontendTeam.addMember(await client(rl));
frontendTeam.addMember(await codeRenderer(rl));
frontendTeam.setupCommunication();

console.log(frontendTeam.getMembers());

// frontendTeam.call("client","team-representative", "Hello team representative, I am the client. I need a website with 3 pages: Home, About, Contact. I want to use TailwindCSS for styling. Can you help me with that?");

prompt(rl, "How can we help you today ?").then((response) => {
    frontendTeam.call("client","team-representative", response);
});
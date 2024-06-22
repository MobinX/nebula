import { Member } from "./lib/member";
import readline from "readline"
// a cli chat interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//initialize the member
const member = await Member({
    role: "AI",
    roleDescription: "AI team member",
    systemPrompt: "https://raw.githubusercontent.com/mustvlad/ChatGPT-System-Prompts/main/prompts/educational/historical-expert.md",
    promptSrc: "url"
});

console.log(member.roleDescription);
console.log("AI: ", member.chatHistory.history[0].parts[0].text);
rl.on('line', async (input) => {
    try {
        const response = await member.call(input);
        console.log("AI: ", response);
        rl.prompt();
    } catch (e) {
        console.log("[Main] Error in main: ", e);
        rl.close();
    }
});
rl.prompt();


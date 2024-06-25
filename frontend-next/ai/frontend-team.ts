import { MemberType } from "@/lib/member";

export const memberInfo:MemberType[] = [
    {
        role: "representative",
        roleDescription: "The  team representative who is responsible for the team communication and coordination with client and send orders to the other team members",
        systemPrompt: "https://raw.githubusercontent.com/MobinX/nebula/main/prompts/frontend/representative.txt",
        promptSrc: "url"
    },
    {
        role: "planner",
        roleDescription: "The planner who is responsible for planning the frontend work and assign the work to the frontend developers.",
        systemPrompt: "https://raw.githubusercontent.com/MobinX/nebula/main/prompts/frontend/planner.txt",
        promptSrc: "url"
    },
    {
        role: "developer",
        roleDescription: "The frontend developer who is responsible for developing the frontend work according to the plan.",
        systemPrompt: "https://raw.githubusercontent.com/MobinX/nebula/main/prompts/frontend/developer.txt",
        promptSrc: "url"
    }
]
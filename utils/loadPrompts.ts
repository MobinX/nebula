import { readFileSync } from "fs";

export const loadPrompts = async (promptSrc: "file" | "url" | "text", prompt: string): Promise<string> => {
    
    if (promptSrc === "file") {
        try {
            //read file
            return readFileSync(prompt, 'utf8');
        } catch (e) {
            console.log("[loadPrompts] Error reading file: ", e);
            throw e;
        }
    } else if (promptSrc === "url") {
        try {
            const response = await fetch(prompt);
            return await response.text();
        } catch (e) {
            console.log("[loadPrompts] Error fetching url: ", e);
            throw e;
        }
    } else if (promptSrc === "text") {
        return prompt;
    }
    return "";
}

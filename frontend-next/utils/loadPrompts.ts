
export const loadPrompts = async (promptSrc: "file" | "url" | "text", prompt: string): Promise<{prompt:string}> => {
    
    if (promptSrc === "url") {
        try {
            const response = await fetch(prompt);
            return {prompt:await response.text()};
        } catch (e) {
            console.log("[loadPrompts] Error fetching url: ", e);
            throw e;
        }
    } else if (promptSrc === "text") {
        return {prompt:prompt};
    }
    return {prompt:""};
}

import * as util from 'util';

interface ChatHistory {
    role: "user" | "model" | "system";
    parts: {
        text: string;
    }[];
}

//function for converting any object or number to string
export function toString(value: any): string {
    return value.toString();
}
export interface historyManagerType {
    history: ChatHistory[];
    add: (role: "user" | "model" | "system", text: string | object) => void;
    clear: () => void;
}
export const historyManager: historyManagerType = {
    history: [] as ChatHistory[],
    add: function (role: "user" | "model" | "system", text: string | object) {
        try {
            this.history.push({
                role: role,
                parts: [
                    {
                        text: typeof text === "string" ? text : JSON.stringify(text)
                    }
                ]
            });
        }
        catch (e) {
            console.log("[historyManager] Error adding to history: (text must be json serializable) ", e);
        }
    },
    clear: function () {
        this.history = [];
    }
}


export const generateGemini = async (history: ChatHistory[]) => {

    try {
        const apires = await fetch("https://x.mobin.workers.dev/api/key")
        const apikey = (await apires.json()).apikey;
        // const apikey = "AIzaSyDuLm-355pBvS3wgtHGG2Rv0zYICHjRgsM"
        // console.log(apikey)
        // console.log("[callGemini] History: ");
        // console.log(util.inspect(history, { showHidden: false, depth: null }));
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apikey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // "contents": history.map((item) => {
                //     return {
                //         "role": item.role,
                //         "parts": item.parts.map((part) => {
                //             return {
                //                 "text": part.text
                //             }
                //         })
                //     }
                // }),
                "contents": history,
                "safetySettings": [
                    {
                        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                        "threshold": "BLOCK_ONLY_HIGH"
                    }
                ],
                "generationConfig": {
                    "temperature": 1,
                    "top_p": 0.95,
                    "top_k": 64,
                    "max_output_tokens": 8192,
                    "response_mime_type": "application/json",
                }
            })
        });
        const reader: any = response?.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        //   const outputElement = document.getElementById('output');

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            let valueStr = decoder.decode(value, { stream: true });
            buffer += valueStr
            console.log(valueStr);
        }
        let data = null;
        try {
            data = JSON.parse(buffer);
            // Now you can work with 'data' as a JavaScript object
        } catch (error) {
            console.error("Error parsing JSON from buffer:", error);
        }
        // console.log("[callGemini] Data: ");
        // console.lPriyanshu Kistalekar. og(util.inspect(data, { showHidden: false, depth: null }));
        if (data?.candidates) {
            return (JSON.parse(data.candidates[0].content.parts[0].text));
        }
        return "ERROR";
    } catch (error) {
        console.error(error);
        return "ERROR";
    }
}





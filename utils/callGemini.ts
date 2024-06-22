interface ChatHistory {
    role: "user" | "model";
    parts: {
        text: string;
    }[];
}

//function for converting any object or number to string
export function toString(value: any): string {
    return value.toString();
}

export const historyManager = {
    history: [] as ChatHistory[],
    add: function(role: "user" | "model", text: string) {
        this.history.push({
            role: role,
            parts: [
                {
                    text: text
                }
            ]
        });
    },
    clear: function() {
        this.history = [];
    }
}


export const generateGemini = async (history:ChatHistory[]) => {
    
    try {
        const apires = await fetch("https://x.mobin.workers.dev/api/key")
        const apikey = (await apires.json()).apikey;
        // console.log(apikey)

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apikey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "contents": history.map((item) => {
                    return {
                        "role": item.role,
                        "parts": item.parts.map((part) => {
                            return {
                                "text": part.text
                            }
                        })
                    }
                }),
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

        const data = await response.json();
        // console.log(data);
        if (data.candidates) {
            return (JSON.parse(data.candidates[0].content.parts[0].text));
        }
        return "ERROR";
    } catch (error) {
        console.error(error);
        return "ERROR";
    }
}





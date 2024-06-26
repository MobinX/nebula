"use server"
import * as util from 'util';
interface ChatHistory {
    role: "user" | "model" | "system";
    parts: {
        text: string;
    }[];
}

export const generateGemini = async (history: ChatHistory[],showhistory=false) => {

    try {
        // const apires = await fetch("https://x.mobin.workers.dev/api/key",{
        //     mode: 'no-cors' // Add this line to disable CORS enforcement
        // //   })
        //   const apires = await fetch("https://x.mobin.workers.dev/api/key")
        //   const apikey = (await apires.json()).apikey;
          const apikey = "AIzaSyDuLm-355pBvS3wgtHGG2Rv0zYICHjRgsM"
        if(showhistory){
        console.log("[callGemini] History: ");
        
        console.log(util.inspect(history, { showHidden: false, depth: null }));
        }
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apikey}`, {
            method: 'POST',
            mode: "no-cors",
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
        

        //   const outputElement = document.getElementById('output');

       
        try {
           let data = await response.json();
           console.log("[callGemini] Data: ");
           console.log(util.inspect(data, { showHidden: false, depth: null }));
           if (data?.candidates) {
               return (JSON.parse(data.candidates[0].content.parts[0].text));
           }
            // Now you can work with 'data' as a JavaScript object
        } catch (error) {
            console.error("Error parsing JSON from buffer:", error);
        }
       
        return "ERROR";
    } catch (error) {
        console.error(error);
        return "ERROR";
    }
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import { historyManager, historyManagerType } from "./callGemini";



export async function execGemini({ msgx, history }: { msgx: string, history: historyManagerType }) {
    const apikey = "AIzaSyDuLm-355pBvS3wgtHGG2Rv0zYICHjRgsM"

    const genAI = new GoogleGenerativeAI(apikey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
        history: history.history,
        generationConfig: {
        },
    });
    try {
    const result = await chat.sendMessageStream(msgx);
    return result;
    }
    catch (e) {
        console.log("error in execGemini", e)
        return "ERROR"
    }
}

const history = historyManager;

//dummy data
// history.add("user", "hi, what is your name?")
// history.add("model", "I am doreamon")
// history.add("user", "what is your favorite color?")
// history.add("model", "I like blue")
// history.add("user", "what is your favorite food?")
// history.add("model", "I like doracakes")

// const demo = async () => {
//     const resp = await execGemini({ msgx: "what is your favorite friend?", history: history })
    
//     for await (const msg of resp.stream) {
//         console.log("msg", msg.text())
//     }
// }
// demo()
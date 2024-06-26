import { GoogleGenerativeAI } from "@google/generative-ai";
import { historyManager, historyManagerType } from "./callGemini";

const history = historyManager;

export class execGemini {
    history: historyManagerType;
    constructor(history: historyManagerType) {
        this.history = history;
    }
    async exec({ msgx }: { msgx: string }) {
        const apikey = "AIzaSyDuLm-355pBvS3wgtHGG2Rv0zYICHjRgsM"

        const genAI = new GoogleGenerativeAI(apikey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: this.history.history,
            generationConfig: {
            },
        });

        const msg = "How many paws are in my house?";

        const result = await chat.sendMessageStream(msgx);
        let text = '';
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            console.log("chunkText")
            console.log(chunkText);
            text += chunkText;
        }
    }
}

//dummy data
history.add("user","hi, what is your name?")
history.add("model","I am doreamon")
history.add("user","what is your favorite color?")
history.add("model","I like blue")
history.add("user","what is your favorite food?")
history.add("model","I like doracakes")

const gemini = new execGemini(history);
gemini.exec({msgx:"what is your favorite friend?"})
import { generateGemini, historyManager } from "./utils/callGemini";
import * as util from 'util'; // Import util module
import { log } from "./utils/log";

const historyCtrl = historyManager;

historyCtrl.add("user", "Hello, how are you?");
historyCtrl.add("model", "I am fine, thank you.");
historyCtrl.add("user", "What is your name?");
historyCtrl.add("model", "My name is Kara.");
historyCtrl.add("user", JSON.stringify("What is your favorite color?"));

generateGemini(historyCtrl.history).then((response) => {
    historyCtrl.add("model", JSON.stringify(response));
    log(response)
    log(util.inspect(historyCtrl.history, { depth: null, colors: true }));
}).catch((error) => {
    log(error)
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSys = void 0;
var parseSys = function (sys) {
    var toPattern = /\[\[to\]\]\s*(.*?)\s*(?=\[\[msg\]\])/gm;
    var thoughtsPattern = /\[\[thoughts\]\]\s*([\s\S]*?)\s*(?=\[\[to\]\])/gm;
    // const msgPattern = /\[\[msg\]\]\s*([\s\S]*)/s;
    var toMatch = toPattern.exec(sys);
    //   const msgMatch = msgPattern.exec(scenario);
    if (toMatch) {
        var toContent = toMatch[1].trim();
        var temp = sys;
        //delete first to msgPos
        var temps = temp.split("[[msg]]");
        var msg = temps[1];
        var thoughtsMatch = thoughtsPattern.exec(sys);
        var thoughtsContent = thoughtsMatch ? thoughtsMatch[1].trim() : null;
        return {
            to: toContent,
            thoughts: thoughtsContent,
            msg: msg
        };
    }
    else {
        return null;
    }
    //   const msgContent = msgMatch ? msgMatch[1].trim() : null;
};
exports.parseSys = parseSys;
var demo = "\nthis the cose for you:\n[[thoughts]]I need a hero section\ni also need a hero section0[[to]]\nclient\n[[msg]]\nI need a hero section";
console.log((0, exports.parseSys)(demo)); // { to: 'client', thoughts: 'I need a hero section', msg: 'I need a hero section' }

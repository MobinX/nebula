export const parseSys:any|null = (sys: string) => {
    const toPattern = /\[\[to\]\]\s*(.*?)\s*(?=\[\[msg\]\])/gm;
    const thoughtsPattern = /\[\[thoughts\]\]\s*([\s\S]*?)\s*(?=\[\[to\]\])/gm;
    // const msgPattern = /\[\[msg\]\]\s*([\s\S]*)/s;
    const toMatch = toPattern.exec(sys);
    //   const msgMatch = msgPattern.exec(scenario);
    if (toMatch) {
        const toContent = toMatch[1].trim()
        let temp = sys
        //delete first to msgPos
        let temps = temp.split("[[msg]]")
        const msg = temps[1]
        const thoughtsMatch = thoughtsPattern.exec(sys);
        const thoughtsContent = thoughtsMatch ? thoughtsMatch[1].trim() : null;
        return {
            to: toContent,
            thoughts: thoughtsContent,
            msg: msg
        }
    } else {
        return null
    }

    //   const msgContent = msgMatch ? msgMatch[1].trim() : null;
}

let demo = `
this the cose for you:
[[thoughts]]I need a hero section
i also need a hero section0[[to]]
client
[[msg]]
I need a hero section`
console.log(parseSys(demo)) // { to: 'client', thoughts: 'I need a hero section', msg: 'I need a hero section' }

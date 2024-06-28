import { Orbit, Send } from "lucide-react";
import { use, useContext, useEffect, useRef, useState } from "react";
import { FlipContext } from "./CardFlipper";

export interface Msg {
    from: string;
    to: string;
    msg: string;
    timestamp: string;
}

const MsgHeader = () => {
    const { toggleFlip } = useContext(FlipContext);
    return (
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <img src="https://via.placeholder.com/40" alt="Profile Picture" className="w-6 h-6 rounded-full" />
                <h3 className="text-lg font-medium text-gray-500">Frontend Team</h3>
            </div>
            <div className="flex items-center gap-2">
                <div onClick={() => toggleFlip()} className="">
                    <Orbit className="w-6 h-6 text-gray-500" />
                </div>

            </div>
        </div>)
}

const MsgContainer = ({ msg }: { msg: Msg[] }) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        console.log("msg changed")
        if (divRef.current) {
            divRef.current.scrollTo({
                top: divRef.current.scrollHeight,
                behavior: "smooth",
            });
            console.log("scrolling to bottom");
        }
    })


    return (
        <div className="px-4 py-6 space-y-6 overflow-y-scroll h-full" ref={divRef}>
            {msg.map((m, i) => {
                if (m.from === "client") {
                    return <SelfMessage key={i} msg={m.msg} to={m.to} />
                } else {
                    return <OtherMessage key={i} msg={m.msg} from={m.from} to={m.to} />
                }
            })
            }

        </div>)
}

const SelfMessage = ({ msg, state = "", to }: { msg: string, state?: string, to: string }) => {
    return (
        <div className="flex items-start w-full">
            <div className="flex flex-col items-center gap-1 w-full">
                <div className="bg-primary text-white px-4 py-2 rounded-2xl rounded-br-none ml-auto w-4/5 flex flex-col gap-1">

                    <p className="w-full break-words"><span className="text-primary-content">@{to}</span><br />{msg}</p>
                </div>
                <div className="text-xs text-gray-500 w-full text-right px-1">{state}</div>
            </div>
        </div>
    )
}
const OtherMessage = ({ msg, state = "", from, to }: { msg: string, state?: string, from: string, to: string }) => {
    return (
        <div className="flex items-start justify-end w-full">
            <div className="flex flex-col items-end gap-1 w-full">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 text-wrap rounded-2xl rounded-bl-none mr-auto w-4/5 flex flex-col gap-1">
                    <p className="text-xs font-semibold">{from}</p>
                    <p className="w-full break-words"><span className="text-primary">@{to}</span><br />{msg}</p>
                </div>
                <div className="text-xs text-gray-500  text-right px-1 mr-auto">{state}</div>
            </div>
        </div>
    )
}

export default function MessageCard({ msg, onMsgSend, setIsClientAllowedInput, isClientAllowedInput }: { msg: Msg[], onMsgSend: (arg0: string) => void, setIsClientAllowedInput: (arg0: boolean) => void, isClientAllowedInput: boolean }) {
    const [messages, setMessages] = useState<string>("")
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-xs h-full flex flex-col  bg-white shadow-md rounded-3xl">
                <MsgHeader />
                <MsgContainer msg={msg} />
                <div className="px-4 py-3 border-t border-gray-200 flex items-center w-full gap-2">
                    <input
                        type="text"
                        placeholder="Type something"
                        value={messages}
                        onChange={e => setMessages(e.target.value)}
                        disabled={!isClientAllowedInput}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                onMsgSend(messages);
                                setMessages("");
                                setIsClientAllowedInput(false);
                                e.preventDefault(); // Prevents the default action of the enter key
                            }
                        }}
                        className="flex-grow px-4 py-2 rounded-lg text-base-content bg-base-200 focus:outline-none focus:bg-base-300 w-4/5"
                    />
                    <button type="submit" className="btn btn-circle btn-sm" onClick={() => { onMsgSend(messages); setMessages(""); setIsClientAllowedInput(false) }} disabled={!isClientAllowedInput}>
                        <Send className="w-4 h-4" />
                    </button>

                </div>
            </div>
        </div>

    )
}
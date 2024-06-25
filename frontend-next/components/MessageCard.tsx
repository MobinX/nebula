import { Send } from "lucide-react";
import { useState } from "react";

export interface Msg {
    from: string;
    to?: string;
    msg: string;
    timestamp: string;
}

const MsgHeader = () => (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
            <img src="https://via.placeholder.com/40" alt="Profile Picture" className="w-6 h-6 rounded-full" />
            <h3 className="text-lg font-medium text-gray-500">Frontend Team</h3>
        </div>
    </div>)

const MsgContainer = ({ children }: { children: React.ReactNode }) => {

    return (<div className="px-4 py-6 space-y-6 overflow-y-auto max-h-[400px] min-h-[67vh]"> {children} </div>)
}

const SelfMessage = ({ msg, state = "" }: { msg: string, state?: string }) => {
    return (
        <div className="flex items-start w-full">
            <div className="flex flex-col items-center gap-1 w-full">
                <div className="bg-primary text-white px-4 py-2 rounded-2xl rounded-br-none ml-auto w-4/5 flex flex-col gap-1">

                    <p>{msg}</p>
                </div>
                <div className="text-xs text-gray-500 w-full text-right px-1">{state}</div>
            </div>
        </div>
    )
}
const OtherMessage = ({ msg, state = "", from }: { msg: string, state?: string, from: string }) => {
    return (
        <div className="flex items-start justify-end w-full">
            <div className="flex flex-col items-end gap-1 w-full">
                <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl rounded-bl-none mr-auto w-4/5 flex flex-col gap-1">
                    <p className="text-xs font-semibold">{from}</p>
                    <p>{msg}</p>
                </div>
                <div className="text-xs text-gray-500  text-right px-1 mr-auto">{state}</div>
            </div>
        </div>
    )
}

export default function MessageCard({ msg, onMsgSend, setIsClientAllowedInput,isClientAllowedInput }: { msg: Msg[], onMsgSend: (arg0: string) => void,setIsClientAllowedInput:(arg0:boolean)=>void ,isClientAllowedInput:boolean}) {
    const [messages, setMessages] = useState<string>("")
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-xs  bg-white shadow-md rounded-3xl">
                <MsgHeader />
                <MsgContainer>
                    {msg.map((m, i) => {
                        if (m.from === "client") {
                            return <SelfMessage key={i} msg={m.msg} />
                        } else {
                            return <OtherMessage key={i} msg={m.msg} from={m.from} />
                        }
                    })
                    }
                </MsgContainer>
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
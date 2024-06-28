import { EyeIcon, MessageCircle, Orbit } from "lucide-react"
import { FlipContext } from "./CardFlipper";
import { useContext, useEffect, useRef } from "react";

export default function LogViewer({ logs, isShowingMsgCard, setCardState }: { setCardState: Function, isShowingMsgCard: boolean, logs: string[] }) {
    const { toggleFlip } = useContext(FlipContext);
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
        <div className={`flex items-center justify-center h-full w-full ${isShowingMsgCard ? "flex" : "hidden  md:flex"}`}>
            <div className="w-full max-w-xs h-full flex flex-col  bg-white shadow-md rounded-3xl">
                <div className="bg-primary text-primary-content px-4 py-2 rounded-2xl rounded-br-none ml-auto w-4/5 flex items-center justify-between">
                    <p>Logs</p>
                    <div className="flex items-center gap-2 text-primary-content">
                        <div onClick={() => toggleFlip()} className="text-primary-content">
                            <MessageCircle className="w-6 h-6" />

                        </div>
                        <div onClick={() => setCardState(false)} className="text-primary-content md:hidden">
                            <EyeIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <div className="border-t border-base-300 w-full h-full overflow-y-scroll" ref={divRef}>

                    <ul className="space-y-4 text-left px-4  text-base-content text-sm">
                        {logs.map((log, i) => {
                            return (
                                <li className="flex items-start text-w space-x-3 rtl:space-x-reverse" key={i}>
                                    <span>[*]</span>
                                    <span>{log}</span>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </div>
        </div>
    )
}



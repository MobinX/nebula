import { RefreshCcw } from "lucide-react"

export function CardFlipper({ isFlipped, children }: { isFlipped: boolean, children: React.ReactNode }) {
    return (
        <div className={`bg-transparent w-full h-full space-y-3`} style={{ perspective: "1000px" }}>
            <div className="flex justify-center items-center relative w-full h-full transform transition-transform duration-700" style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
            

        </div>
    )
}

export function CardFace({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex justify-center items-center absolute " style={{ backfaceVisibility: "hidden" }}>
            {children}
        </div>
    )
}

export function CardBack({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex justify-center items-center absolute" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            {children}
        </div>
    )
}
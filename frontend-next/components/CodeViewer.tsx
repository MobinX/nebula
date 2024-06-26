import { useContext, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FlipContext } from './CardFlipper';
import { Copy, CopyCheck, Eye, } from 'lucide-react';



export default function CodeViewer({ code }: { code: string }) {
    const { toggleFlip } = useContext(FlipContext);
    const [isCopied, setIsCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        })
    }
    return (
        <div className="mockup-code  border-base-300 border w-full h-full rounded-3xl">
            <div className="flex items-center gap-3 absolute top-[15px] right-[15px]">
                <data className={`z-[999] ${isCopied ? "tooltip tooltip-open tooltip-primary tooltip-left" : ""}`} data-tip='✔️ Copied'>
                    <div onClick={() => copyToClipboard()} className="">
                        {isCopied ? <CopyCheck className="w-6 h-6" /> : <Copy className="w-6 h-6 " />}
                    </div>
                </data>
                <div onClick={() => toggleFlip()} className="">
                    <Eye className="w-6 h-6 " />
                </div>

            </div>
            <SyntaxHighlighter customStyle={{ background: "transparent", boxShadow: "unset", height: "100%", border: 0 }} language="javascript" style={dark}>
                {code}
            </SyntaxHighlighter>


        </div>
    );
}
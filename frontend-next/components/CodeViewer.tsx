import { useContext } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FlipContext } from './CardFlipper';
import { Code2 } from 'lucide-react';

export default function CodeViewer({ code }: { code: string }) {
    const { toggleFlip } = useContext(FlipContext);

    return (
        <div className="mockup-code  border-base-300 border w-full h-full rounded-3xl">
            <div className="flex items-center gap-2 absolute top-[15px] right-[7px]">
                <div onClick={() => toggleFlip()} className="">
                    <Code2 className="w-6 h-6 " />
                </div>
            </div>
            <SyntaxHighlighter customStyle={{ background: "transparent", boxShadow: "unset", height: "100%", border: 0 }} language="javascript" style={dark}>
                {code}
            </SyntaxHighlighter>


        </div>
    );
}
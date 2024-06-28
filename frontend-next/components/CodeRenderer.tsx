import React, { useContext, useEffect, useRef } from 'react';
import { FlipContext } from './CardFlipper';
import { Code2 } from 'lucide-react';

export default function CodeRenderer({ code }: { code: string }) {
    const iframeRef = useRef(null); // Step 2: Initialize the ref
    const { toggleFlip } = useContext(FlipContext);

    useEffect(() => {
        const iframe: any = iframeRef.current;
        if (iframe) {
            const doc = iframe.contentDocument;
            if (doc) {
                doc.open();
                doc.write(code);
                doc.close();
            }
        }
    })
    // The rest of your component logic

    return (
        <div className="mockup-browser border-base-300 border w-full h-[91%] rounded-3xl">
            <div className="mockup-browser-toolbar justify-between">
                <div className="input border-base-300 text-base-content border">https://demo.com</div>
                <div className="flex items-center gap-2">
                    <div onClick={() => toggleFlip()} className="">
                        <Code2 className="w-6 h-6 " />
                    </div>
                </div>
            </div>
            <div className="border-base-300 flex justify-center border-t  w-full h-full ">
                {/* Step 3: Attach the ref to the iframe */}
                <iframe id="outputFrame" className='w-full h-full' ref={iframeRef} sandbox="allow-same-origin allow-scripts"></iframe>
            </div>
        </div>
    );
}
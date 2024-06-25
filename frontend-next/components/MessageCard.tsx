export interface Msg {
    from: string;
    to: string;
    msg: string;
    timestamp: string;
}
export default function MessageCard({ msg }: { msg: Msg[] }) {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-xs  bg-white shadow-md rounded-3xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="flex items-center gap-2">
                            <img src="https://via.placeholder.com/40" alt="Profile Picture" className="w-6 h-6 rounded-full" />
                            <h3 className="text-lg font-medium text-gray-500">Frontend Team</h3>
                        </div>
                    </div>
                </div>

                <div className="px-4 py-6 space-y-6 overflow-y-auto max-h-[400px]">
                    <div className="flex items-start">
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg rounded-bl-none ml-auto">
                            Hi Rahman. How are you?
                            <br />
                            I&aposm Good
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 text-right">11:30 AM</div>

                    <div className="flex items-start justify-end">
                        <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-br-none mr-auto">
                            Yoo..! I am great. Etta
                            <br />
                            Thank you.
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 text-right">11:30 AM <span className="text-blue-500">✓✓</span></div>

                    <div className="flex items-start">
                        <img src="https://via.placeholder.com/200x150" alt="Image" className="w-48 h-36 rounded-lg" />
                    </div>
                    <div className="text-sm text-gray-500 text-right">11:30 AM <span className="text-blue-500">✓✓</span></div>

                    <div className="flex items-start justify-end">
                        <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg rounded-br-none mr-auto">
                            Thanks
                        </div>
                    </div>
                    <div className="text-sm text-gray-500 text-right">11:30 AM</div>
                </div>

                <div className="px-4 py-3 border-t border-gray-200">
                    <div className="flex items-center">
                        <input type="text" placeholder="Type something" className="flex-grow px-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:bg-white" />
                        <button type="submit" className="ml-2 px-4 py-2 rounded-lg bg-blue-500 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12h.757v.757A59.75 59.75 0 0118.075 21h-5.985A59.693 59.693 0 015.25 12z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}
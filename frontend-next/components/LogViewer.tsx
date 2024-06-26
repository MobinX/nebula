export default function LogViewer({ logs }: { logs: string[] }) {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="w-full max-w-xs h-full flex flex-col  bg-white shadow-md rounded-3xl">
                <div className="bg-primary text-primary-content px-4 py-2 rounded-2xl rounded-br-none ml-auto w-4/5 flex flex-col gap-1">
                    <p>Logs</p>
                </div>
                <div className="border-t border-base-300 w-full h-full overflow-y-scroll">
                    
                        <ul className="space-y-4 text-left px-4  text-base-content text-sm">
                            {logs.map((log, i) => {
                                return (
                                    <li className="flex items-start text-wrap space-x-3 rtl:space-x-reverse">
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
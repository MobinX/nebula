"use client"

import { useContext } from "react"
import { FSContext } from "./FSManager"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const ActionBar = () => {
    const { goBack,setIncludeInHistory } = useContext(FSContext)
    const prams = useSearchParams()
    const location = prams.get("location")
    return (
        <div className="flex w-full gap-2 items-center justify-center my-3 px-2 py-2 bg-base-content/30 rounded-2xl" >
            <button className="btn btn-circle btn-sm btn-ghost" onClick={async () => await goBack()}><ArrowLeft className="w-5 h-5" /></button>
            <div className="breadcrumbs overflow-x-visible flex-1 w-full flex items-center bg-base-content/50 px-2 py-1 rounded-2xl ">
                <ul>
                    {(location?.split("/"))?.map((path,key)=>(
                        <li key={key}>
                            <Link href={"/fileManager?location=" + location?.split("/").slice(0, key+1).join("/") } onClick={()=> setIncludeInHistory(true)}>{path}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
"use client"

import Link from "next/link"
import { useState } from "react"



export default function WebsiteAdd() {
    const [steps, setSteps] = useState(1)
    const [environmentInfo, setEnvironmentInfo] = useState({
        lang:"PHP",
        lang_v:"20.10.1",
        framwork:"PHP",
        framwork_v:"20.10.1"
    })
    return (
        <div className="flex w-full h-full justify-center pt-4">
            {steps == 1 &&
                <div className=" h-[80%] md:w-[75%] lg:w-[55%] flex flex-col  items-center bg-base-content/15 rounded-3xl px-5 md:px-9 py-6">
                    <div className="flex flex-col  items-center flex-1 w-full h-full">
                        <p className="text-xl md:text-3xl my-6">Setup Environment</p>
                        <div className="flex flex-col items-start  w-full h-full  gap-5 my-3 px-1 md:px-3 lg:px-7">

                            <div className="flex gap-2 items-center justify-center">
                                <p className="hidd md:block">Running Language:</p>
                                <select className="select select-sm bg-base-content/30 rounded-md text-base-200 focus:outline-none" value={environmentInfo.lang} onChange={(e)=>setEnvironmentInfo({...environmentInfo,lang:e.target.value.toString()})}>
                                    <option>NodeJS</option>
                                    <option>PHP</option>
                                </select>
                                <select className="select select-sm bg-base-content/30 rounded-md text-base-200 focus:outline-none" value={environmentInfo.lang_v } onChange={(e)=>setEnvironmentInfo({...environmentInfo,lang_v:e.target.value.toString()})}>
                                    <option className="">7.0.1</option>
                                    <option>20.10.1</option>
                                </select>
                            </div>

                            <div className="flex gap-2 items-center justify-center">
                                <p className="hidd md:block">Framwork/Library:</p>
                                <select className="select select-sm bg-base-content/30 rounded-md text-base-200 focus:outline-none" value={environmentInfo.framwork } onChange={(e)=>setEnvironmentInfo({...environmentInfo,framwork:e.target.value.toString()})}>
                                    <option className="">NodeJS</option>
                                    <option>PHP</option>
                                </select>
                                <select className="select  select-sm bg-base-content/30 rounded-md text-base-200 focus:outline-none" value={environmentInfo.framwork_v } onChange={(e)=>setEnvironmentInfo({...environmentInfo,framwork_v:e.target.value.toString()})}>
                                    <option className="">7.0.1</option>
                                    <option>20.10.1</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-end px-4 gap-4">
                        <Link href={"/websites"} > <button className="btn btn-sm btn-ghost bg-base-content/30 rounded-full">Cancel</button> </Link>
                        <button className="btn btn-sm btn-ghost bg-base-content/40 rounded-full" onClick={()=>setSteps(2)}>Go Next</button>

                    </div>
                </div>
            }
        </div>

    )
}
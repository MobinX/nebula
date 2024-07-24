"use client"
import { useContext, useEffect, useState } from "react"
import { directoryItemType, getDir } from "../actions/fsActions"
import { useEffectOnce } from "@/app/(dashboard)/components/useEffectOnce"
import Image from "next/image"
import { FSContext } from "../components/FSManager"
import { useRouter, useSearchParams } from "next/navigation"


const LoadingUI = () => (
    <div className="h-full w-full flex flex-col items-center justify-center">
        <div className="loading loading-dots w-[90px]" ></div>
    </div>
)

export default function FileManager() {
    const { openFolder, dirItems, loadingState, goBack, goNext, FsHistory } = useContext(FSContext)
    console.log(FsHistory)
    const prams = useSearchParams()
    const location = prams.get("location")
    async function loadOperations(path: string) {
        await openFolder(path)
    }
    useEffectOnce(() => { location ? loadOperations(location) : loadOperations("C:/Users/progr/DEV/nebula/frontend-next/"); })
    return (
        <>
            {dirItems.length > 0 && loadingState == "SUCCESS" &&
                <div className="grid items-center justify-center justify-items-center grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-5 px-2 py-5 overflow-auto" >
                    <button onClick={async () => await goBack()}>Back</button>
                    <button onClick={async () => await goNext()}>Next</button>

                    {dirItems.map((itm, k) => (
                        itm.isFolder ? (
                            <div className="btn btn-ghost btn-lg flex-nowrap h-fit w-fit flex flex-col items-center justify-center gap-1 p-3 min-h-[auto]" key={k} onClick={async () => { itm.isFolder ? await openFolder(itm.parentPath + "/" + itm.name) : "" }} aria-description={itm.name}>
                                <Image className="w-20 h-20 md:w-[5.5rem] md:h-[5.5rem]" alt={itm.name} src={itm.iconName} width={32} height={32} />
                                <p className="text-sm loa">{itm.name}</p>
                            </div>
                        ) :
                            (
                                <div className="btn btn-ghost btn-lg flex-nowrap h-fit w-fit flex flex-col items-center justify-center gap-1 p-3 min-h-[auto]" key={k} onClick={async () => { itm.isFolder ? await openFolder(itm.parentPath + "/" + itm.name) : "" }} aria-description={itm.name}>
                                    <Image className="w-20 h-20 md:w-[5.5rem] md:h-[5.5rem]" alt={itm.name} src={itm.iconName} width={32} height={32} />
                                    <p className="text-sm loa">{itm.name}</p>
                                </div>
                            )

                    ))}
                </div>
            }
            {loadingState == "LOADING" && <LoadingUI />}
        </>
    )
}
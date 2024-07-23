"use client"
import { useEffect, useState } from "react"
import { directoryItemType, getDir } from "../actions/fsActions"
import { useEffectOnce } from "@/app/(dashboard)/components/useEffectOnce"

export default function FileManager() {
    const [dirItems, setDirItems] = useState<directoryItemType[]>([])
    async function loadOperations() {
        let itm = await getDir("C:/Users/progr/DEV/nebula/frontend-next/")
        if (typeof itm != "string") setDirItems(itm);
        else { }
    }
    useEffectOnce(() => { loadOperations() })
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-2 py-5">
            
        </div>
    )
}
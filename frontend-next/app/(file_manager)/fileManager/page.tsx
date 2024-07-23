"use client"
import { useEffect } from "react"
import { getDir } from "../actions/fsActions"
import { useEffectOnce } from "@/app/(dashboard)/components/useEffectOnce"

export default function FileManager() {
    async function loadOperations() {
        console.log(await getDir("C:/"))
    }
    useEffectOnce(()=>{loadOperations()})
    return <div>hi</div>
}
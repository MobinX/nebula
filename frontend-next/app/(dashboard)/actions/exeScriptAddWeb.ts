"use server"

import { addWebsite } from "../data/db"
import { loadScript } from "./loadScript"

export async function exeAdd(initialState:any,form:FormData){
    try {
        const EXECUTE = loadScript(initialState.path)
        const result:any = EXECUTE(form)
        await addWebsite(result?.attr)
    return {...initialState,msg: "ok" }
    } catch (error) {
        console.log(error)
        return {...initialState,msg:"error"}
    }
    
}
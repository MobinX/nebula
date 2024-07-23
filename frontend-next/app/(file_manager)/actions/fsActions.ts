"use server"
import {Dirent, readdirSync,stat} from "node:fs"

export interface directoryItemType {
    name: string
    path:string
    parentPath:string
    isFolder:string

}

export async function getDir(path:string) {
    try {
        const directoryItems =  readdirSync(path,{withFileTypes:true})
        console.log(directoryItems)
        return directoryItems;
    
    } catch (error) {
        console.log(error)
    }
}

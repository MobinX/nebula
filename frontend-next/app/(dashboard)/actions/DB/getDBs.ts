"use server"

import { UUID } from "crypto";
import { getDBById, getDBs, DBInfo } from "../../db/DBManager";

export async function getDBList():Promise<DBInfo[] | null | undefined> {
    try {
        const dbList = await getDBs()
        return dbList
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function getOneDB(id:UUID):Promise<DBInfo | null | undefined> {
    try {
        const DB = await getDBById(id)
        return DB
    } catch (error) {
        console.log(error)
        return null
    }
}
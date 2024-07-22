"use server"

import { getWebsits, WebsiteInfo } from "../data/db";

export async function getWebsiteList():Promise<WebsiteInfo[] | null | undefined> {
    try {
        const webList = await getWebsits()
        return webList
    } catch (error) {
        console.log(error)
        return null
    }
}
import Link from "next/link"
import { useState } from "react"
import { getLangs } from "../../data/db"
import { Steps } from "./Steps"
export default async function WebsiteAdd() {
    const langs = await getLangs()
    return <Steps langs={langs} />
}
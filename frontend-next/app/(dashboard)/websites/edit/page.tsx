"use client"

import { useSearchParams } from "next/navigation"
import { getOneWebsite } from "../../actions/website/getWebsites"
import { useEffect, useState } from "react"
import { WebsiteInfo } from "../page"
import { useEffectOnce } from "../../components/useEffectOnce"
import { useFormState } from "react-dom"
import { exeAdd } from "../../actions/website/AddWeb"
import { getUI } from "../../actions/getUI"
import { DrawUI, UIInterface } from "../../components/DrawUI"
import Link from "next/link"
import { exeUpdateWeb } from "../../actions/website/updateWebInfo"

export default function WebsiteInfoPage() {
    const param = useSearchParams()
    const id: any = param.get("id")
    const [web, setWeb] = useState<WebsiteInfo>()
    const [formState, formAction] = useFormState(exeUpdateWeb, {msg:"hi"})
    const [steps, setSteps] = useState(1)
    const [UIs, setUIs] = useState<UIInterface[]>([])
    const loadWeb = async () => {
        const webinfo = await getOneWebsite(id)
        if (webinfo) {
            setWeb(webinfo)
            console.log(webinfo)
            await fetchUI(webinfo.updateUIPath)
        }

    }

    const fetchUI = async (uiPath: string) => {
        const uis = await getUI(uiPath)
        if (uis) {
            setUIs(uis)
            console.log("got ui")
            
        }
    }
    useEffect(() => {
        if (formState.msg == "ok") setSteps(2)
    }, [formState])
    useEffectOnce(() => {
        loadWeb()
    })
    return <div className="flex w-full h-full justify-center pt-4 overflow-hidden">
        {steps == 1 &&
            <div className="w-full bg-base-content/15 rounded-3xl flex flex-col px-5 md:px-12 lg:px-16 lg:w-[90%] py-6 transition-all duration-500">
                <div className="w-full text-2xl text-center mb-3"> Configure Framwork </div>
                <form action={formAction} className="flex flex-col h-full py-4 overflow-auto px-3">
                    <div className="flex-1 ">
                        <DrawUI ui={UIs} defaults={web?.store} />
                        <input type="text" className="hidden" name="extra-data-xp" readOnly value={JSON.stringify({ id:web?.id, path: web?.updateUISrc, updateUIPath: web?.updateUIPath, updateUISrc: web?.updateUISrc, deleteSrc: web?.deleteSrc })} />
                    </div>
                    <div className="w-full flex items-center justify-end px-4 gap-4 my-3">
                        <button className="btn btn-sm btn-ghost bg-base-content/40 rounded-full" type="submit">Go Next</button>
                    </div>
                </form>
            </div>
        }
        {steps == 2 &&
            <div className=" h-[80%] w-full flex flex-col justify-center items-center bg-base-content/15 rounded-3xl px-5 md:px-9 py-6 transition-all duration-500 text-3xl lg:text-5xl space-y-5">
                <p>Configuration Updated!</p>
                <Link href={"/websites"} > <button className="btn btn-sm btn-ghost bg-base-content/30 rounded-full mt-5"> Websites Page</button> </Link>
            </div>
        }
    </div>
}
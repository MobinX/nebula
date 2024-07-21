"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { environment_web_lang, environment_web_lang_framwork } from "../../data/db"
import { getLangFramworksIncludeLangs } from "../../utils/data_helper"
import { DrawUI, UIInterface } from "../../components/DrawUI"
import { UIPasswordInput, UITextInput } from "../../plugin/src/developer/ui"
import { getUI } from "../../actions/getUI"

export function Steps({ langs }: { langs: environment_web_lang[] }) {
    const [steps, setSteps] = useState(1)
    const [environmentInfo, setEnvironmentInfo] = useState({
        lang: langs[0].name,
        lang_v: langs[0].versions[0],
        framwork: langs[0].framworks[0].name,
        framwork_v: langs[0].framworks[0].version
    })
    const [framworks, setFramworks] = useState<environment_web_lang_framwork[]>([])
    useEffect(() => {
        setFramworks(getLangFramworksIncludeLangs(environmentInfo.lang, environmentInfo.lang_v, langs))
    }, [environmentInfo])

    const [UIs, setUIs] = useState<UIInterface[]>([])
    const fetchUI =async ()=>{
        const uis = await getUI(`C:/Users/progr/DEV/nebula/frontend-next/app/(dashboard)/plugin/store/${(framworks.find(itm=>itm.name == environmentInfo.framwork))?.pkg}/${(framworks.find(itm=>itm.name == environmentInfo.framwork))?.executeAddUIPath}`)
        if(uis) {
            setUIs(uis)
            console.log("got ui!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            setSteps(2)
        }
        setSteps(2)
    }


    return (
        <div className="flex w-full h-full justify-center pt-4 overflow-hidden">
            {steps == 1 &&
                <div className=" h-[80%] md:w-[75%] lg:w-[55%] flex flex-col  items-center bg-base-content/15 rounded-3xl px-5 md:px-9 py-6">
                    <div className="flex flex-col  items-center flex-1 w-full h-full">
                        <p className="text-xl md:text-3xl my-6">Setup Environment</p>
                        <div className="flex flex-col items-start  w-full h-full  gap-5 my-3 px-1 md:px-3 lg:px-7">

                            <div className="flex gap-2 flex-wrap items-center justify-center">
                                <p className="hidd md:block">Running Language:</p>
                                <div className="flex gap-2 items-center">
                                    <select className="select select-sm bg-base-content/30 rounded-md text-base-200 focus:outline-none" value={environmentInfo.lang} onChange={(e) => setEnvironmentInfo({ ...environmentInfo, lang: e.target.value.toString() })}>
                                        {langs.map((lang, k) =>
                                            <option key={k}>{lang.name}</option>
                                        )}
                                    </select>
                                    <select className="select select-sm bg-base-content/30 rounded-md text-base-200 focus:outline-none" value={environmentInfo.lang_v} onChange={(e) => { setEnvironmentInfo({ ...environmentInfo, lang_v: e.target.value.toString() });  /*setFramworks(getLangFramworksIncludeLangs(environmentInfo.lang,  e.target.value.toString(), langs)) */ }}>
                                        {langs.find(lang => lang.name == environmentInfo.lang)?.versions.map((v, k) =>
                                            <option key={k}>{v}</option>
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2 flex-wrap items-center justify-center">
                                <p className="hidd md:block">Framwork/Library:</p>
                                <div className="flex gap-2 items-center">

                                    <select className="select select-sm bg-base-content/30 rounded-md text-base-200 focus:outline-none" value={environmentInfo.framwork} onChange={(e) => setEnvironmentInfo({ ...environmentInfo, framwork: e.target.value.toString() })}>
                                        {framworks.map((f, k) => <option key={k}>{f.name}</option>)}
                                    </select>
                                    <select className="select  select-sm bg-base-content/30 rounded-md text-base-200 focus:outline-none" value={environmentInfo.framwork_v} onChange={(e) => setEnvironmentInfo({ ...environmentInfo, framwork_v: e.target.value.toString() })}>
                                        {framworks.map((f, k) => <option key={k}>{f.version}</option>)}

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-end px-4 gap-4">
                        <Link href={"/websites"} > <button className="btn btn-sm btn-ghost bg-base-content/30 rounded-full">Cancel</button> </Link>
                        <button className="btn btn-sm btn-ghost bg-base-content/40 rounded-full" onClick={async() => await fetchUI()}>Go Next</button>
                    </div>
                </div>
            }
            {steps == 2 &&
                <div className="w-full h-[90%] bg-base-content/15 rounded-3xl px-5 md:px-9 py-6 overflow-auto">
                    <div className="w-full text-2xl text-center"> Configure Framwork </div>
                    <DrawUI ui={[UITextInput("ji","ji","ji"),UIPasswordInput("ji","ji","ji")]} />
                    <DrawUI ui={UIs} />

                </div>



            }
        </div>

    )
}
import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

export interface DB_INTERFACE {
    environment_web: ENVIRONMENT_WEB
    //environment_db

}
export interface environment_web_lang_framwork {
    name: string
    pkg: string
    version: string
    supported_lang_v: string
    executeAddUIPath: string
    executeAddSrc: string
    executeUpdateUIPath: string
    executeUpdateSrc: string
}
export interface environment_web_lang {
    name: string
    versions: string[]
    framworks: environment_web_lang_framwork[]
}
export interface WebsiteInfo {
    name: string
    domain: string
    language: string
    database: string
    host: string
    filepath: string
}
export interface ENVIRONMENT_WEB {
    langs: environment_web_lang[]
    WebsiteInfoList: WebsiteInfo[]
}
// ================================= DB ========================
export let DB: DB_INTERFACE = {
    environment_web: {
        langs: [],
        WebsiteInfoList: []
    }
    //environment_db
}
//============================ DB (END) =========================
export interface BaseResult {
    ok: boolean
    msg: string
}
export async function loadDB() {
    try {
        let dbPath = path.join((process.argv[1]).replace("db.ts", ""), "db.json")
        let dbFile = readFileSync("C:/Users/progr/DEV/nebula/frontend-next/app/(dashboard)/data/db.json", { encoding: "utf-8" })
        DB = JSON.parse(dbFile)

    }
    catch (e) {
        throw e
    }
}
export async function saveDB() {
    try {
        let dbPath = path.join((process.argv[1]).replace("db.ts", ""), "db.json")
        console.log("execution dbPath", dbPath)
        writeFileSync("C:/Users/progr/DEV/nebula/frontend-next/app/(dashboard)/data/db.json", JSON.stringify(DB),{mode:"a"})
    }
    catch (e) {
        throw e
    }
}


export async function addLang(lang: environment_web_lang): Promise<BaseResult> {
    try {
        await loadDB()
        if ((DB.environment_web.langs.find(lan => lan.name == lang.name)) == undefined) {
            DB = {
                ...DB, environment_web: {
                    ...DB.environment_web,
                    langs: DB.environment_web.langs.concat([lang])
                }
            }
            await saveDB()
            return {
                ok: true,
                msg: "ok"
            }
        } else {
            return {
                ok: false,
                msg: "Languauge already exists"
            }
        }
    }
    catch (e: any) {
        console.log(e)
        return {
            ok: false,
            msg: e
        }
    }


}
export async function getLangs(): Promise<environment_web_lang[]> {
    await loadDB()
    return DB.environment_web.langs
}
export async function getLangsNameArray(): Promise<string[]> {
    await loadDB()
    let names: string[] = []
    DB.environment_web.langs.map(lang => names.push(lang.name))
    return names
}
export async function getLangByName(name: string): Promise<environment_web_lang | undefined> {
    await loadDB()
    return DB.environment_web.langs.find(lang => lang.name == name)
}
export async function removeLang(lang: string): Promise<BaseResult> {
    try {
        await loadDB()
        let tempLangs: environment_web_lang[] = []
        DB.environment_web.langs.map((itm) => {
            if (itm.name != lang) tempLangs.push(itm)
        })
        DB = {
            ...DB, environment_web: {
                ...DB.environment_web,
                langs: tempLangs
            }
        }
        await saveDB()
        return {
            ok: true,
            msg: "ok"
        }
    }
    catch (e: any) {
        console.log(e)
        return {
            ok: false,
            msg: e
        }
    }
}
export async function addLangVersion(langName: string, version: string): Promise<BaseResult> {
    try {
        await loadDB()
        let langPortion = DB.environment_web.langs.find(lang => lang.name == langName)


        if (langPortion) {
            if ((langPortion?.versions.find(vv => vv == version)) == undefined) {
                let tempLangs: environment_web_lang[] = []
                DB.environment_web.langs.map(lan => {
                    if (lan.name != langName) tempLangs.push(lan)
                })
                tempLangs.push({ ...langPortion, versions: langPortion?.versions.concat([version]) })
                DB = {
                    ...DB, environment_web: {
                        ...DB.environment_web,
                        langs: tempLangs
                    }
                }
                await saveDB()
                return {
                    ok: true,
                    msg: "ok"
                }
            }
            else {
                return {
                    ok: false,
                    msg: "Vertion already exists"
                }
            }
        }
        else {
            return {
                ok: false,
                msg: "Language not found"
            }
        }

    }
    catch (e: any) {
        console.log(e)
        return {
            ok: false,
            msg: e
        }
    }
}
export async function removeLangVersion(langName: string, version: string): Promise<BaseResult> {
    try {
        await loadDB()
        let langPortion = DB.environment_web.langs.find(lang => lang.name == langName)
        if (langPortion) {
            let tempVersion: string[] = []
            langPortion.versions.map((itm) => {
                if (itm != version) tempVersion.push(itm)
            })
            let tempLangs: environment_web_lang[] = []
            DB.environment_web.langs.map(lan => {
                if (lan.name != langName) tempLangs.push(lan)
            })
            tempLangs.push({ ...langPortion, versions: tempVersion })
            DB = {
                ...DB, environment_web: {
                    ...DB.environment_web,
                    langs: tempLangs
                }
            }
            await saveDB()
            return {
                ok: true,
                msg: "ok"
            }
        }
        else {
            return {
                ok: false,
                msg: "Language not found"
            }
        }

    }
    catch (e: any) {
        console.log(e)
        return {
            ok: false,
            msg: e
        }
    }
}
export async function addLangFramwork(langName: string, framwork: environment_web_lang_framwork): Promise<BaseResult> {
    try {
        await loadDB()
        let langPortion = DB.environment_web.langs.find(lang => lang.name == langName)
        if (langPortion) {
            if ((langPortion?.framworks.find(vv => vv.pkg == framwork.pkg)) == undefined) {
                let tempLangs: environment_web_lang[] = []
                DB.environment_web.langs.map(lan => {
                    if (lan.name != langName) tempLangs.push(lan)
                })
                tempLangs.push({ ...langPortion, framworks: langPortion?.framworks.concat([framwork]) })
                DB = {
                    ...DB, environment_web: {
                        ...DB.environment_web,
                        langs: tempLangs
                    }
                }
                await saveDB()
                return {
                    ok: true,
                    msg: "ok"
                }
            } else {
                return {
                    ok: false,
                    msg: "framwork already exists"
                }
            }
        }
        else {
            return {
                ok: false,
                msg: "Language not found"
            }
        }

    }
    catch (e: any) {
        console.log(e)
        return {
            ok: false,
            msg: e
        }
    }
}
export async function getLangFramworks(langName: string, supported_version: string): Promise<environment_web_lang_framwork[] | undefined> {
    await loadDB()
    let langPortion = DB.environment_web.langs.find(lang => lang.name == langName)
    if (langPortion) {
        let framworks: environment_web_lang_framwork[] = []
        langPortion.framworks.map(framwork => { if (framwork.supported_lang_v == supported_version) framworks.push(framwork) })
        return framworks
    }

    return undefined;
}
export async function removeLangFramwork(langName: string, pkg: string): Promise<BaseResult> {
    try {
        await loadDB()
        let langPortion = DB.environment_web.langs.find(lang => lang.name == langName)
        if (langPortion) {
            let tempFramworks: environment_web_lang_framwork[] = []
            langPortion.framworks.map((itm) => {
                if (itm.pkg != pkg) tempFramworks.push(itm)
            })
            let tempLangs: environment_web_lang[] = []
            DB.environment_web.langs.map(lan => {
                if (lan.name != langName) tempLangs.push(lan)
            })
            tempLangs.push({ ...langPortion, framworks: tempFramworks })
            DB = {
                ...DB, environment_web: {
                    ...DB.environment_web,
                    langs: tempLangs
                }
            }
            await saveDB()
            return {
                ok: true,
                msg: "ok"
            }
        }
        else {
            return {
                ok: false,
                msg: "Language not found"
            }
        }

    }
    catch (e: any) {
        console.log(e)
        return {
            ok: false,
            msg: e
        }
    }
}
(async () => {
    let dummyLang: environment_web_lang = {
        name: "php",
        versions: ["7.0.1"],
        framworks: [
            {
                name: "Base",
                version: "11.0.1",
                pkg: "com.mbn.xpanel",
                executeAddSrc: "add.js",
                executeAddUIPath: "addui.js",
                executeUpdateSrc: "add.js",
                executeUpdateUIPath: "addui.js",
                supported_lang_v: "7.0.1"
            }
        ]
    }
    let rn = await addLang(dummyLang)
    console.log(rn)
})();
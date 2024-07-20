import { ArrowDownUp, ChevronLeft, ChevronRight, DatabaseZap, ExternalLink, FolderCog, Globe, MousePointerSquareDashed, PackagePlus, Search, Trash } from "lucide-react"
import Link from "next/link"

export interface WebsiteInfo {
    name: string
    domain: string
    language: string
    database: string
    host: string
    filepath: string
}

export const websiteDummyInfo: WebsiteInfo[] = [
    {
        name: "Virsys",
        domain: "http://www.virsys.com",
        language: "nodejs",
        database: "virsys_db",
        host: "192.0.0.1:5555",
        filepath: "/home/web/htdocs"
    }, {
        name: "Virsys",
        domain: "http://www.virsys.com",
        language: "nodejs",
        database: "virsys_db",
        host: "192.0.0.1:5555",
        filepath: "/home/web/htdocs"
    }, {
        name: "Virsys",
        domain: "http://www.virsys.com",
        language: "nodejs",
        database: "virsys_db",
        host: "192.0.0.1:5555",
        filepath: "/home/web/htdocs"
    }, {
        name: "Virsys",
        domain: "http://www.virsys.com",
        language: "nodejs",
        database: "virsys_db",
        host: "192.0.0.1:5555",
        filepath: "/home/web/htdocs"
    }, {
        name: "Virsys",
        domain: "http://www.virsys.com",
        language: "nodejs",
        database: "virsys_db",
        host: "192.0.0.1:5555",
        filepath: "/home/web/htdocs"
    },

]

const WebsiteList = () => {
    return (
        <div className="flex flex-col items-center w-full h-full gap-4 md:gap-5  overflow-y-auto">
            {websiteDummyInfo.map((info, key) => (
                <div className="btn btn-ghost btn-lg flex-nowrap flex justify-center md:space-x-4 items-center w-full px-3 md:px-7 py-[2.125rem] md:py-10 bg-base-content/5 hover:bg-base-content/20 cursor-pointer transition duration-200 rounded-lg text-[15px] md:text-base" key={key}>
                    <Globe className="w-9 h-9 hidden md:block" />
                    <div className="flex flex-col items-start justify-start gap-1  w-full mb-2 ">
                        <h1 className="">{info.name}</h1>
                        <div className="flex items-center  gap-1">
                            <a href={info.domain} className="flex items-center hover:text-base-100">{info.domain} <ExternalLink className="ml-1 w-3 h-3" /></a>
                            <p className="hidden md:block">|</p>
                            <p className="hidden md:block">{info.host}</p>
                            <p className="hidden md:block">|</p>
                            <p className="hidden md:block">{info.language}</p>

                        </div>
                    </div>
                    <button className="btn btn-circle btn-ghost "> <MousePointerSquareDashed className="w-4 h-4" /> </button>
                    <Link className="flex items-center gap-1 md:gap-2 hover:text-base-100" href={`/files/${info.filepath}`}><button className="btn btn-circle btn-ghost "> <FolderCog className="w-4 h-4" /> </button></Link>
                    <Link className="flex items-center gap-1 md:gap-2 hover:text-base-100" href={`/databases/${info.database}`}> <button className="btn btn-circle btn-ghost "><DatabaseZap className="w-4 h-4" /> </button> </Link>
                </div>
            ))}
        </div>
    )
}
const ActionsRow1 = () => (
    <div className="flex justify-between items-center w-full md:my-2">
        <div className="flex items-center gap-2 bg-base-content/30 rounded-xl w-[60%]  md:w-[40%] my-3 ">
            <input className="input w-full input-sm flex-1 input-ghost focus:outline-none bg-transparent focus:bg-transparent focus:border-transparent placeholder:text-base-content" type="text" placeholder="Search..." />
            <button className="btn btn-circle btn-ghost btn-sm ">
                <Search className="w-4 h-4" />
            </button>
        </div>
        <div className="flex items-center gap-3 md:px-2">
            <div> <button className="btn btn-circle btn-sm btn-ghost bg-base-content/30 hover:bg-base-content/50 "><Trash className="w-4 h-4" /></button></div>
            <Link href="/websites/add" ><button className="btn btn-circle btn-sm btn-ghost bg-base-content/30 hover:bg-base-content/50"><PackagePlus className="w-4 h-4" /></button> </Link>

        </div>
    </div>
)

const ActionsRow2 = () => (
     <div className="flex justify-between items-center mb-3 w-full px-3">
                {/* <div className="flex items-center gap-1"><Activity className="w-4 h-4 hidden md:block" />{websiteDummyInfo.length} items found</div> */}
                <div className="flex gap-2 items-center justify-center">
                    <ArrowDownUp className="w-5 h-5" />
                    <p className="hidden ">Sort by :</p>
                    <select className="select select-sm bg-base-content/30 rounded-md text-base-200 focus:outline-none">
                        <option className="">Name (A to Z)</option>
                        <option>Name (Z to A)</option>
                        {/* <option>Date (Recent)</option>
                            <option>Date (old)</option> */}
                    </select>
                </div>
                <div className="flex items-center gap-1">

                    <p className="hidden md:block">Pages : </p><p>{3}/{20}</p>
                    <div className="flex items-center ">
                        <button className="btn btn-circle btn-sm btn-ghost w-6 md:w-8"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="btn btn-circle btn-sm btn-ghost w-6 md:w-8"><ChevronRight className="w-4 h-4" /></button>

                    </div>
                </div>

            </div>
)
export default function Websites() {

    return (
        <div className="flex flex-col h-full w-full overflow-hidden mb-3">
            <ActionsRow1 />
            <ActionsRow2 />
           
            <WebsiteList />
            {/* <div className="flex justify-end items-center w-full px-3 gap-3 my-2">
                    Pages: {3}/{20}  <div className="flex gap-2 items-center ">
                        <button className="btn btn-circle btn-sm btn-ghost"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="btn btn-circle btn-sm btn-ghost"><ChevronRight className="w-4 h-4" /></button>

                    </div>
                </div> */}
        </div>
    )
}








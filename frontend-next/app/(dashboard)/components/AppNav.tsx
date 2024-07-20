import Link from "next/link"
import { NavigationIcons } from "./Sidebar"

export const AppNav = () => {
    return (
        <div className="flex justify-center  bg-base-content/40 rounded-full  items-center md:hidden space-x-3   fixed left-1/2 -translate-x-1/2 bottom-6">
             {NavigationIcons.map((icon, key) =>
                        <Link href={icon.slug} key={key} className="text-base-content before:bg-base-content/40 before:text-base-content after:opacity-0" data-tip={icon.name}>
                            <button className="btn btn-circle btn-ghost "  style={{filter:icon.slug == "/websites" ? "brightness(10) text-base-content" : "brightness(1)"}} >
                                <icon.icon className="w-5 h-5" />
                            </button>
                        </Link>
                    )}
        </div>
    )
}
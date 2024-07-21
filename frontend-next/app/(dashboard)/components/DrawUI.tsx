export interface UIInterface {
    type: "text" | "select" | "checkbox" | "password" | "email"
    label: string
    name: string
    // data?: string[] /*for option */ | string /*for placeholder */
    data?:any
    value?: any //if it has default value
}

export const DrawUI = ({ ui }: { ui: UIInterface[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center w-full">
            {
                ui.map((elm, k) =>
                    (elm.type == "text" || elm.type == "email" || elm.type == "password") ?
                        (
                        <div className="flex items-start justify-center flex-col w-full" key={k}>
                            <label className="label pl-3 text-lg" htmlFor={elm.name}>{elm.label}</label>
                            <input className="input w-full   input-ghost focus:outline-none bg-base-content/30 rounded-xl focus:bg-base-content/30 focus:border-transparent placeholder:text-base-content" type={elm.type} placeholder={elm.data}  name={elm.name}  />
                        </div>
                        ) : (<></>)
            )
            }

        </div>
    )
}

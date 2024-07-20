export default function WebsiteAdd() {
    return (

        <div className="w-full h-[80%] flex flex-col  items-start bg-base-content/15 rounded-3xl px-6 md:px-9 py-6">
            <p className="text-xl md:text-2xl">Setup Environment</p>
            <div className="flex flex-col  w-full h-full  gap-5 my-3 px-3">
                <div className="flex items-center">
                    <div className="relative bg-base-content/40  p-1 rounded-lg">
                        <p>NodeJS</p>
                        <div className="absolute flex flex-col bg-base-content/60 gap-2 rounded-2xl p-2 left-1/2 -translate-x-1/2  top-[120%]">
                            <p>NodeJS</p>
                            <p>PHP</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
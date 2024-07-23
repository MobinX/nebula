"use client"
import { createContext, ReactNode, useEffect, useState } from "react";
import { directoryItemType, getDir } from "../actions/fsActions";

export const FSContext = createContext<{
    FsHistory: string[]
    dirItems: directoryItemType[]
    currentPath: string,
    goBack: () => Promise<void>
    goNext: () => Promise<void>
    openFolder: (path: string, includeInhistory?: boolean) => Promise<void>
    loadingState: "SUCCESS" | "LOADING" | "FAILED"
    errorMsg: string
    presentHistoryIndex: number
    canGoBack: boolean
    canGoNext: boolean

}>({
    FsHistory: [],
    dirItems: [],
    currentPath: "",
    loadingState: "LOADING",
    goBack: async () => { },
    goNext: async () => { },
    openFolder: async (path: string, includeInhistory = true) => { },
    errorMsg: "",
    canGoBack: false,
    canGoNext: false,
    presentHistoryIndex: 0

})

export const FSManager = ({ children }: { children: ReactNode }) => {
    const [FsHistory, setFsHistory] = useState<string[]>([])
    const [dirItems, setDirItems] = useState<directoryItemType[]>([])
    const [currentPath, setCurrentPath] = useState<string>("")
    const [loadingState, setLaodingState] = useState<"SUCCESS" | "LOADING" | "FAILED">("LOADING")
    const [errorMsg, setErrorMsg] = useState<string>("")
    const [presentHistoryIndex, setPresentHistoryIndex] = useState<number>(0)
    const [canGoBack, setCanGoBack] = useState(false)
    const [canGoNext, setCanGoNext] = useState(false)


    useEffect(() => setPresentHistoryIndex(FsHistory.length - 1), [FsHistory])
    useEffect(() => {
        if (presentHistoryIndex == 0) {
            setCanGoBack(false)
            if (FsHistory.length > 1) setCanGoNext(true);
            else setCanGoNext(false)
        }

        if (presentHistoryIndex == FsHistory.length - 1) {
            setCanGoNext(false)
            if (FsHistory.length > 1) setCanGoBack(true);
            else setCanGoBack(false)
        }

        setCurrentPath(FsHistory[presentHistoryIndex])

    }, [presentHistoryIndex])

    const openFolder = async (path: string, includeInhistory = true) => {
        try {
            setLaodingState("LOADING")
            let itm = await getDir(path)
            console.log(itm)
            if (typeof itm != "string") {
                setDirItems(itm);
                setLaodingState("SUCCESS");
                if (includeInhistory) {
                    if (FsHistory.length > 0) {
                        let tmpHistory: any[] = []
                        for (let i = 0; i <= (presentHistoryIndex); i++) {
                            tmpHistory.push(FsHistory[i])
                            console.log(tmpHistory)
                            console.log(i)
                        }
                        tmpHistory.push(path)
                        setFsHistory(tmpHistory)
                    }
                    else {
                        setFsHistory([path])
                    }
                }
            }
            else {
                setErrorMsg(itm);
                setLaodingState("FAILED")
            }
        } catch (error) {
            setErrorMsg("Something went wrong, Please try again")
            setLaodingState("FAILED")
        }
    }

    const goBack = async () => {
        if (canGoBack) {
            try {
                setLaodingState("LOADING")
                let itm = await getDir(FsHistory[presentHistoryIndex - 1])
                console.log(itm)
                if (typeof itm != "string") {
                    setDirItems(itm);
                    setLaodingState("SUCCESS");
                    setPresentHistoryIndex(presentHistoryIndex - 1)
                }
                else {
                    setErrorMsg(itm);
                    setLaodingState("FAILED")
                }
            } catch (error) {
                setErrorMsg("Something went wrong, Please try again")
                setLaodingState("FAILED")
            }
        }
    }
    const goNext = async () => {
        if (canGoNext) {
            try {
                setLaodingState("LOADING")
                let itm = await getDir(FsHistory[presentHistoryIndex + 1])
                console.log(itm)
                if (typeof itm != "string") {
                    setDirItems(itm);
                    setLaodingState("SUCCESS");
                    setPresentHistoryIndex(presentHistoryIndex + 1)
                }
                else {
                    setErrorMsg(itm);
                    setLaodingState("FAILED")
                }
            } catch (error) {
                setErrorMsg("Something went wrong, Please try again")
                setLaodingState("FAILED")
            }
        }
    }

    return (
        <FSContext.Provider value={{ FsHistory, canGoBack, canGoNext, currentPath, dirItems, errorMsg, goBack, goNext, loadingState, openFolder, presentHistoryIndex }} >
            {children}
        </FSContext.Provider>
    )
}
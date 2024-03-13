import { PropsWithChildren, createContext, useState } from "react";
import { ProcessWithSubProcess } from "../pages/Areas/ViewArea";

export const SubProcessTimelineContext = createContext<SubProcessTimelineContextProps>({
    setSelectedSubProcess: () => { },
});

type SubProcessTimelineContextProps = {
    selectedSubProcess?: ProcessWithSubProcess;
    setSelectedSubProcess: (value: ProcessWithSubProcess | undefined) => void;
}

export default function SubProcessTimelineContextProvider(props: PropsWithChildren) {
    const [selectedSubProcess, setSelectedSubProcess] = useState<ProcessWithSubProcess>();

    return <SubProcessTimelineContext.Provider value={{ selectedSubProcess, setSelectedSubProcess }}>
        {props.children}
    </SubProcessTimelineContext.Provider>;
}
import { PropsWithChildren, createContext, useState } from "react";
import { SubProcess } from "../pages/ViewProcess/Index";

export const SubProcessTimelineContext = createContext<SubProcessTimelineContextProps>({
    setSelectedSubProcess: () => { },
});

type SubProcessTimelineContextProps = {
    selectedSubProcess?: SubProcess;
    setSelectedSubProcess: (value: SubProcess | undefined) => void;
}

export default function SubProcessTimelineContextProvider(props: PropsWithChildren) {
    const [selectedSubProcess, setSelectedSubProcess] = useState<SubProcess>();

    return <SubProcessTimelineContext.Provider value={{ selectedSubProcess, setSelectedSubProcess }}>
        {props.children}
    </SubProcessTimelineContext.Provider>;
}
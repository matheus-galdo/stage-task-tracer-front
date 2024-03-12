import { PropsWithChildren, createContext, useEffect, useState } from "react";
import areasService from "../services/areasService";
import { Area } from "../pages/Areas/ViewArea";

export const NavbarContext = createContext<NavbarContextProps>({
    setSelectedItem: () => { },
    getAreas: () => { },
    areas: [],
});

type NavbarContextProps = {
    areas: Area[] | undefined;
    selectedItem?: number;
    setSelectedItem: (value: number) => void;
    getAreas: () => void;
}

export default function NavbarContextProvider(props: PropsWithChildren) {
    const [areas, setAreas] = useState<Area[] | undefined>();
    const [selectedItem, setSelectedItem] = useState<number>();

    useEffect(() => {
        getAreas();
    }, []);

    function getAreas() {
        areasService.getAreas().then(response => {
            setAreas(response.data)
        });
    }

    return <NavbarContext.Provider value={{ areas, getAreas, selectedItem, setSelectedItem }}>
        {props.children}
    </NavbarContext.Provider>;
}
import { PropsWithChildren, createContext, useState } from "react";

export const NavbarContext = createContext<NavbarContextProps>({
    setSelectedItem: () => { },
});

type NavbarContextProps = {
    selectedItem?: number;
    setSelectedItem: (value: number) => void;
}

export default function NavbarContextProvider(props: PropsWithChildren) {
    const [selectedItem, setSelectedItem] = useState<number>();

    return <NavbarContext.Provider value={{ selectedItem, setSelectedItem }}>
        {props.children}
    </NavbarContext.Provider>;
}
import { PropsWithChildren, createContext, useState } from "react";

type SubProcessModalContextType = {
    isEditModalOpen: boolean;
    isModalOpen: boolean;
    setIsEditModalOpen: (value: boolean) => void;
    openEditModal: () => void;
    closeEditModal: () => void;
}

export const SubProcessModalContext = createContext<SubProcessModalContextType>({
    isEditModalOpen: false,
    isModalOpen: false,
    setIsEditModalOpen: () => { },
    openEditModal: () => { },
    closeEditModal: () => { },
});

function SubProcessModalContextProvider({ children }: PropsWithChildren) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    function openEditModal() {
        setIsModalOpen(true);
    }

    function closeEditModal() {
        setIsModalOpen(false);
    }

    const contextValue: SubProcessModalContextType = {
        isEditModalOpen,
        setIsEditModalOpen,
        openEditModal,
        closeEditModal,
        isModalOpen,
    };

    return <SubProcessModalContext.Provider value={contextValue}>
        {children}
    </SubProcessModalContext.Provider>
}

export default SubProcessModalContextProvider;
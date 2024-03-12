import { PropsWithChildren, createContext, useState } from "react";

type SubProcessEditModalContextType = {
    isEditModalOpen: boolean;
    openEditModal: () => void;
    closeEditModal: () => void;
}

export const SubProcessEditModalContext = createContext<SubProcessEditModalContextType>({
    isEditModalOpen: false,
    openEditModal: () => { },
    closeEditModal: () => { },
});

function SubProcessEditModalContextProvider({ children }: PropsWithChildren) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    function openEditModal() {
        setIsEditModalOpen(true);
    }

    function closeEditModal() {
        setIsEditModalOpen(false);
    }

    const contextValue: SubProcessEditModalContextType = {
        openEditModal,
        closeEditModal,
        isEditModalOpen,
    };

    return <SubProcessEditModalContext.Provider value={contextValue}>
        {children}
    </SubProcessEditModalContext.Provider>
}

export default SubProcessEditModalContextProvider;
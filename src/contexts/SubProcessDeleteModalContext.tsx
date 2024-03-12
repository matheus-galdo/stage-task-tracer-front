import { PropsWithChildren, createContext, useState } from "react";

type SubProcessDeleteModalContextType = {
    isDeleteModalOpen: boolean;
    showDeleteModal: () => void;
    closeDeleteModal: () => void;
}

export const SubProcessDeleteModalContext = createContext<SubProcessDeleteModalContextType>({
    isDeleteModalOpen: false,
    showDeleteModal: () => { },
    closeDeleteModal: () => { },
});

export function SubProcessDeleteModalContextProvider({ children }: PropsWithChildren) {

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const showDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    function closeDeleteModal() {
        setIsDeleteModalOpen(false);
    }

    const contextValue: SubProcessDeleteModalContextType = {
        showDeleteModal,
        closeDeleteModal,
        isDeleteModalOpen,
    };

    return <SubProcessDeleteModalContext.Provider value={contextValue}>
        {children}
    </SubProcessDeleteModalContext.Provider>
}
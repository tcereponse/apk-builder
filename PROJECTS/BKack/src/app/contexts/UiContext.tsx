x
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface UiContextType {
isMobile: boolean;
showModal: boolean;
modalContent: ReactNode | null;
actions: {
openModal: (content: ReactNode) => void;
closeModal: () => void;
setMobile: (isMobile: boolean) => void;
};
}

const UiContext = createContext<UiContextType | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
const [showModal, setShowModal] = useState(false);
const [modalContent, setModalContent] = useState<ReactNode | null>(null);

const openModal = useCallback((content: ReactNode) => {
setModalContent(content);
setShowModal(true);
}, []);

const closeModal = useCallback(() => {
setShowModal(false);
setModalContent(null);
}, []);

const setMobile = useCallback((mobile: boolean) => {
setIsMobile(mobile);
}, []);

return (
<UiContext.Provider value={{
isMobile,
showModal,
modalContent,
actions: { openModal, closeModal, setMobile }
}}>
{children}
</UiContext.Provider>
);
}

export function useUi() {
const context = useContext(UiContext);
if (!context) {
throw new Error('useUi must be used within UiProvider');
}
return context;
}
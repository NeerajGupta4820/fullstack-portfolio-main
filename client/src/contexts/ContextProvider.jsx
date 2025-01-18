import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {

    const [mode, setMode] = useState(localStorage.getItem('mode') || 'user');
    const [showSidebar, setShowSidebar] = useState(true);
    const [activeNavLink, setActiveNavLink] = useState('overview');
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    // Add initialErrorObj and setErrorObj state
    const initialErrorObj = {}; // Define your initial error object here
    const [errorObj, setErrorObj] = useState(initialErrorObj);

    return (
        <StateContext.Provider
            value={{
                mode, setMode,
                showSidebar, setShowSidebar,
                activeNavLink, setActiveNavLink,
                windowSize, setWindowSize,
                errorObj, setErrorObj, // Add these to the provider's value
                initialErrorObj, // Provide initialErrorObj if needed in your components
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

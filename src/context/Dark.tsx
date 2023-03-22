import React from 'react';
import useLocalStorageState from 'use-local-storage-state';

interface IDarkContext {
    isDarkMode: boolean;
    toggleMode(): void;
}

const DarkContext = React.createContext<IDarkContext>({} as IDarkContext);

const DarkContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState('darkMode', {defaultValue: true});

    const toggleMode = () => {
        setIsDarkMode(d => ! d);
    };

    return (
        <DarkContext.Provider value={{ isDarkMode, toggleMode }}>
            {children}
        </DarkContext.Provider>
    )
}

const useDarkMode = () => {
    const context = React.useContext(DarkContext);

    if (!context)
        throw new Error('useDarkMode must be used inside a DarkContextProvider');

    return context;
}

export { DarkContextProvider, useDarkMode };
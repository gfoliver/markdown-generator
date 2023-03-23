import React from 'react';
import useLocalStorageState from 'use-local-storage-state';
import { v4 } from 'uuid';

interface ITemplate {
    id: string;
    title: string;
    description: string;
    content: string;
}

interface ITemplatesContext {
    templates: ITemplate[];
    addTemplate(data: Omit<ITemplate, "id">): void;
}

const TemplatesContext = React.createContext<ITemplatesContext>({} as ITemplatesContext);

const TemplatesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [templates, setTemplates] = useLocalStorageState<ITemplate[]>('templates', {defaultValue: []});

    const addTemplate = (data: Omit<ITemplate, "id">) => {
        const newTemplate = {
            ...data,
            id: v4()
        }

        setTemplates([...templates, newTemplate]);
    };

    return (
        <TemplatesContext.Provider value={{ templates, addTemplate }}>
            {children}
        </TemplatesContext.Provider>
    )
}

const useTemplates = () => {
    const context = React.useContext(TemplatesContext);

    if (!context)
        throw new Error('useTemplates must be used inside a TemplatesContextProvider');

    return context;
}

export { TemplatesContextProvider, useTemplates };
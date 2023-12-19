import React, { createContext, useState } from "react";

export const SelectedProjectContext = createContext<{project: {id: string | null, name: string | null}, setSelectedProject: (project: {id: string | null, name: string | null}) => void}>
({project: {id: null, name: null}, setSelectedProject: () => {}});

const SelectedProjectProvider = ({children}: any) => {
    const [project, setProject] = useState<{id: string | null, name: string | null}>({id: null, name: null});

    const setSelectedProject = (project: {id: string | null, name: string | null}) => {
        setProject({...project});
    }

    return <SelectedProjectContext.Provider value={{ project, setSelectedProject }}>{children}</SelectedProjectContext.Provider>
}

export default SelectedProjectProvider
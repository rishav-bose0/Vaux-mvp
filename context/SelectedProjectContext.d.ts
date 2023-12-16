import React from "react";
export declare const SelectedProjectContext: React.Context<{
    project: {
        id: string | null;
        name: string | null;
    };
    setSelectedProject: (project: {
        id: string | null;
        name: string | null;
    }) => void;
}>;
declare const SelectedProjectProvider: ({ children }: any) => import("react/jsx-runtime").JSX.Element;
export default SelectedProjectProvider;

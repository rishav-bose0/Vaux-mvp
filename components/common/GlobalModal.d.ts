import React from "react";
interface GlobalModalProps {
    onCloseHandler?: (value: any) => void;
    openState: boolean;
    children?: React.ReactNode;
    MinWidth?: string;
    iskeepMounted?: boolean;
}
declare const GlobalModal: (props: GlobalModalProps) => import("react/jsx-runtime").JSX.Element;
export default GlobalModal;

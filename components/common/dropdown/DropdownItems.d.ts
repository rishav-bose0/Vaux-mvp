interface DropdownItemsProps {
    className?: string;
    textColor: string;
    label: string;
    start_icon?: string;
    end_icon?: string;
    value?: any;
    active?: boolean;
    disabled?: boolean;
    onSelect?: (value: any) => void;
    ddRef?: any;
    setChangeLeft?: any;
}
declare const DropdownItems: ({ className, textColor, label, value, disabled, start_icon, active, end_icon, onSelect, ddRef, setChangeLeft, }: DropdownItemsProps) => import("react/jsx-runtime").JSX.Element;
export default DropdownItems;

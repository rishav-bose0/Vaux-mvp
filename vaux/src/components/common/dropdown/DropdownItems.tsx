
import React, { useEffect, useRef, useState } from "react";

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
 
const DropdownItems = ({
 className,
 textColor,
 label,
 value,
 disabled,
 start_icon,
 active = false,
 end_icon,
 onSelect,
 ddRef,
 setChangeLeft,
}: DropdownItemsProps) => {
 const [hover, setHover] = useState<boolean>(false);


 useEffect(() => {
   if (ddRef?.current.clientWidth > 1300) setChangeLeft(false);
 }, []);


 const onMouseEnterHandler = () => {
   setHover(true);
 };
 const onMouseLeaveHandler = () => {
   setHover(false);
 };


 const ref = useRef<any>(null);
 const checkOverFlow = () => {
   const element = ref.current;
   if (element) {
     return element.scrollWidth > element.offsetWidth;
   }
   return false;
 };


 const handleOnSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
   e.stopPropagation();
   onSelect && onSelect(value);
 };


 return (
   <div
     onMouseDown={(e) => {
       !disabled && handleOnSelect(e);
     }}
     className={`h-8 flex items-center py-4 px-4 min-w-[150px] max-w-[160px] ${
       disabled
         ? "cursor-not-allowed"
         : "cursor-pointer"
     } ${className}`}
     onMouseEnter={onMouseEnterHandler}
     onMouseLeave={onMouseLeaveHandler}
     ref={ddRef}
   >
     {Boolean(start_icon) && (
       <div
         className={`mr-2 ${
           disabled
             ? "text-Gray-200"
             : hover
             ? "text-Gray-700"
             : "text-Gray-500"
         }`}
       >
         <span className={start_icon}></span>
       </div>
     )}



    
       <div
         className={`flex-1  ${
           disabled ? "text-Gray-200" : `${textColor}`
         } ${className}`}
         title={checkOverFlow() ? label : undefined}
         ref={ref}
       >
         {label}
       </div>
     {Boolean(end_icon) && (
       <div
         className={`ml-2 ${
           !disabled && (hover || active)
             ? "text-Primary-700"
             : "text-Gray-200"
         }`}
       >
         <span className={end_icon}></span>
       </div>
     )}
   </div>
 );
};


export default DropdownItems;

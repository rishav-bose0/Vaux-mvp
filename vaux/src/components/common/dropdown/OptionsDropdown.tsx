import React, { useRef, useState } from "react";
import DropdownItem from "../dropdown/DropdownItems";
import {ReactComponent as UpArrow} from '../../assets/up_arrow.svg';

const OptionsDropdown = (props:any) => {
	/**
	 ** Initially, setting hardcoded values for Option Dropdown, once the preferences changes, we can update it in the success of data call
	 */
  const{ disabled = false, DD_data=[], DD_Item_classes, options_classes, itemTextColor, arrowStyles, children} = props;
	const [optionsDropdownData, setOptionsDropdownData] = useState(DD_data);
	const [optionDropdownOpen, setOptionDropdownOpen] = useState<boolean>(false);
	const optionDropdown = useRef<HTMLDivElement>(null);

	/**
	 ** Toggling options menu open and close on click on nav options button
	 */
	const toggleOptionDropdown = () => {
		setOptionDropdownOpen(prev=>!prev);
	};

	/**
	 ** Checking click on document and closing the dropdown
	 */
	const closeOptionsDropdown = (e: any) => {
		if (
			optionDropdown.current &&
			optionDropdownOpen &&
			!optionDropdown.current.contains(e.target)
		) {
			setOptionDropdownOpen(false);
		}
	};
	document.addEventListener("mousedown", closeOptionsDropdown);

	/**
	 ** On click of the dropdown option take the user to close the dropdown and respective page
	 */
	const optionDropdownItemClickHandler = (link: string) => {
		setOptionDropdownOpen(false);
		 if (link.length)
     {
				window.location.href = link;
			};
	};

	return (
		<div
			className={
				"cursor-pointer flex flex-col relative"
			}
			onClick={() => {
				if (!disabled) toggleOptionDropdown();
			}}
		>
			{/* <div className={`${DD_classes}`}>
				{DD_label}
				{!optionDropdownOpen && <img src={downArrow} alt="down-arrow" />}
				{optionDropdownOpen && <img src={upArrow} alt="down-arrow" />}
				
			</div> */}
			{ children }
			<div
				ref={optionDropdown}
				className={`${options_classes} ${optionDropdownOpen ? "block" : "hidden"}`}
			>
				<UpArrow className={` w-[18px] h-[18px] absolute ${arrowStyles}`} />
				{optionsDropdownData.map(
					(d: { label: string; link: string }, i: number) => {
						return (
							<DropdownItem
								key={i} textColor={`${itemTextColor}`}
								className={`${DD_Item_classes}`}
								onSelect={() => optionDropdownItemClickHandler(d.link)}
								label={d.label}
							/>
						);
					},
				)}
			</div>
		</div>
	);
};

export default OptionsDropdown;

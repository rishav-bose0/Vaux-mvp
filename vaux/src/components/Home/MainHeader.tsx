import { useState } from "react";
import OptionsDropdown from "components/common/dropdown/OptionsDropdown";
import { Constants } from "utils/constants";
import GlobalModal from "components/common/GlobalModal";
import ContactUs from "components/common/ContactUs";
import { useNavigate } from "react-router";
import LOGO from "assets/voaux-logo.png";

const MainHeader = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showProductsDropdown, setShowProductsDropdown] = useState(false);
	const [openContactUsModal, setOpenContactUsModal] = useState(false);
	const handleOpenContactUsModal = () => setOpenContactUsModal(true);
	const handleCloseContactUsModal = () => setOpenContactUsModal(false);
	const navigate = useNavigate();

	const routeChange = (path: string, params?: any) => {
		navigate(path, { state: params });
	}

	return (
		<nav className="sticky top-0 flex flex-wrap items-center justify-between z-20 w-full py-4 md:py-0 px-8 border-b border-gray-600 bg-primary text-white">
			<div className="flex bg-primary w-[110px] h-[67px] items-center justify-center">
				<a href="/#">
					<div className="flex">
						<img
							src={LOGO}
							className="h-[120px] mr-2"
							alt="VOAUX Logo"
						/>
					</div>
				</a>
			</div>
			<div
				className="cursor-pointer md:hidden block"
				onClick={() => setShowMenu(!showMenu)}
			>
				<svg xmlns="http://www.w3.org/2000/svg" id="menu-button" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
			</div>
			<div
				className={`${!showMenu ? 'hidden' : ''} w-full md:flex md:items-center md:w-auto`}
				id="menu"
			>
				<ul className="pt-4 text-base text-white md:flex md:items-center md:justify-between md:pt-0 ">
					{/* Products Dropdown */}
					<li
						className="cursor-pointer px-4 py-4 block group relative"
						onMouseEnter={() => setShowProductsDropdown(true)}
						onMouseLeave={() => setShowProductsDropdown(false)}
					>
						<div className={`text-0 flex items-center text-white font-medium group-hover:font-bold gap-1`}>
							{'Products'}
							{showProductsDropdown && (
								<div className="absolute top-[42px] right-0 w-[200px] p-2 max-h-[60vh] min-h-[50px] shadow-md bg-white">
									{/* Dropdown content */}
									{Constants.optionDropdownDataProducts.map((item, index) => (
										<div key={index} className="text-[14px] px-2 text-primary p-4 hover:text-blue-500 hover:bg-gray-200 transition-all">
											{/* Render your dropdown content here */}
											<a href={item.link}> {item.label} </a>
										</div>
									))}
								</div>
							)}
						</div>
					</li>
					<li className="cursor-pointer px-4 py-4 block font-medium hover:font-bold" onClick={handleOpenContactUsModal}>
						Contact Us
					</li>
					<GlobalModal
						openState={openContactUsModal}
						onCloseHandler={handleCloseContactUsModal}
						MinWidth={'400'}
					>
						<ContactUs handleCloseContactUsModal={handleCloseContactUsModal} />
					</GlobalModal>

					<li className="md:p-4 px-2 block py-3">
						<button className="text-white font-medium hover:font-bold border-0 p-0 rounded-none md:border md:border-solid md:border-white md:px-4 md:py-2 md:rounded-xmd" onClick={() => routeChange('/login', { type: 'login' })}>
							Login
						</button>
					</li>
					<li className="md:p-4 px-2 block py-3">
						<button className="text-white font-medium hover:font-bold border-0 p-0 rounded-none md:text-primary md:bg-white md:border md:border-solid md:border-primary md:px-4 md:py-2 md:rounded-xmd" onClick={() => routeChange('/signup', { type: 'signup' })}>
							Sign Up
						</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default MainHeader;

import CreateProject from "components/common/CreateProject";
import GlobalModal from "components/common/GlobalModal";
import { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import UserProfile from "components/UserDetail/UserProfile";
import { useAuth } from "hooks/useAuth";
import { useNavigate } from "react-router";
import { useLocalStorage } from "hooks/useLocalStorage";
import { SelectedProjectContext } from "context/SelectedProjectContext";
import ContactUs from "components/common/ContactUs";
import Email from "@mui/icons-material/Email";
import LOGO from "assets/voaux-profile-logo.png";

function AuthHeader() {
	const { logout }: any = useAuth();
	const { project } = useContext(SelectedProjectContext);
	const [userDetails] = useLocalStorage("userDetails", JSON.stringify(null));
	const navigate = useNavigate();

	const [openCreateProject, setOpenCreateProject] = useState(false);
	const [openMyAccountModal, setOpenMyAccountModal] = useState(false);
	const handleProjectCloseModal = () => setOpenCreateProject(false);
	const handleCloseMyAccountModal = () => setOpenMyAccountModal(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [openContactUsModal, setOpenContactUsModal] = useState(false);
	const handleOpenContactUsModal = (event: any) => {
		event.preventDefault();
		setOpenContactUsModal(true);
	};
	const handleCloseContactUsModal = (event: any) => {
		event.preventDefault();
		setOpenContactUsModal(false);
	};
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleLogout = () => {
		logout();
		navigate("/login");
	};
	const handleOnClickMyAccBtn = () => {
		setOpenMyAccountModal(true);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const makeBadge = () => {
		const name = [userDetails?.first_name, userDetails?.last_name];
		if (name && name.length > 1) {
			return name[0].charAt(0).toUpperCase() + name[1].charAt(0).toUpperCase();
		}else if(name && name.length == 1){
			return name[0].charAt(0);
		}
	};
	return (
		<nav className="sticky top-0 flex flex-wrap items-center justify-between z-20 w-full p-0 border-b border-gray-300 bg-white">
			<div className="flex w-[90px] h-[67px] items-center justify-center">
				<a href="/studio">
					<div className="flex">
					<img
							src={LOGO}
							alt="VOAUX Logo"
						/>
						{/* <span className="self-center text-2xl text-white font-semibold whitespace-nowrap">
							VOAUX
						</span> */}
					</div>
				</a>
			</div>
			<div className="flex items-center flex-auto text-2xl font-semibold my-2 mx-8">
				{project?.name}
			</div>
			<div className={`flex items-center w-auto`} id="menu">
				<ul className="flex items-center justify-between pt-0 px-2 gap-4 md:gap-0">
					<li className="cursor-pointer md:px-6 md:py-3 block">
						<button
							className="text-primary bg-white border border-solid border-primary px-4 py-2 rounded-xmd font-medium hover:bg-primary hover:text-white"
							onClick={() => setOpenCreateProject(true)}
						>
							{/* <AddCircle className='fill-white inline w-[20px] h-[20px] mx-1' /> */}
							Create Project
						</button>
					</li>
					<li className="cursor-pointer md:px-4 md:py-3 block">
						<Tooltip title="Account settings">
							<IconButton
								onClick={handleClick}
								size="small"
								sx={{
									ml: 2,
									background: "rgb(24 42 117 / 1)",
									"&:hover": {
										background: "rgb(24 42 117 / 1)",
									},
								}}
								aria-controls={open ? "account-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
							>
								<Avatar
									sx={{
										width: 30,
										height: 30,
										background: "rgb(24 42 117 / 1)",
										fontSize: "16px",
									}}
								>
									{makeBadge()}
								</Avatar>
							</IconButton>
						</Tooltip>
						<Menu
							anchorEl={anchorEl}
							id="account-menu"
							open={open}
							onClose={handleClose}
							onClick={handleClose}
							PaperProps={{
								elevation: 0,
								sx: {
									overflow: "visible",
									filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
									mt: 1.5,
									"& .MuiAvatar-root": {
										width: 24,
										height: 24,
										ml: -0.5,
										mr: 1,
									},
									"&:before": {
										content: '""',
										display: "block",
										position: "absolute",
										top: 0,
										right: 14,
										width: 10,
										height: 10,
										bgcolor: "background.paper",
										transform: "translateY(-50%) rotate(45deg)",
										zIndex: 0,
									},
								},
							}}
							transformOrigin={{ horizontal: "right", vertical: "top" }}
							anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
						>
							<MenuItem onClick={handleOnClickMyAccBtn}>
								<Avatar /> My Account
							</MenuItem>
							<Divider />
							<MenuItem
								onClick={(event) => {
									handleOpenContactUsModal(event);
								}}
							>
								<ListItemIcon>
									<Email fontSize="small" />
								</ListItemIcon>
								Contact Us
							</MenuItem>
							<MenuItem onClick={handleLogout}>
								<ListItemIcon>
									<Logout fontSize="small" />
								</ListItemIcon>
								Logout
							</MenuItem>
						</Menu>
					</li>
				</ul>
			</div>
			<GlobalModal
				openState={openCreateProject}
				onCloseHandler={handleProjectCloseModal}
				MinWidth={"400"}
			>
				<CreateProject handleCloseModal={handleProjectCloseModal} />
			</GlobalModal>
			{openMyAccountModal && (
				<GlobalModal
					openState={openMyAccountModal}
					onCloseHandler={handleCloseMyAccountModal}
					MinWidth={"400"}
				>
					<UserProfile handleCloseModal={handleCloseMyAccountModal} />
				</GlobalModal>
			)}
			{openContactUsModal && (<GlobalModal
				openState={openContactUsModal}
				onCloseHandler={(event) => {
					handleCloseContactUsModal(event);
				}}
				MinWidth={"400"}
				iskeepMounted={false}
			>
				<ContactUs />
			</GlobalModal>
			)}
		</nav>
	);
}

export default AuthHeader;

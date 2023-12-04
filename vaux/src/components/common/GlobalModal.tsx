import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";


interface GlobalModalProps {
	onCloseHandler?: (value: any) => void;
	openState: boolean;
    children?: React.ReactNode;
    MinWidth?:string;
	iskeepMounted?:boolean;
}
const GlobalModal = (props: GlobalModalProps) => {
	const { onCloseHandler, openState = false ,children,MinWidth,iskeepMounted=false} = props;
	const style = {
		position: "absolute" as "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: "background.paper",
		boxShadow: 24,
		border: "0",
		p: 4,
		outline: "none",
        borderRadius:"5px",
        overflowY:"auto",
		padding:'0'
	};

	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={openState}
			// onClose={onCloseHandler}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
				},
			}}
			keepMounted = {iskeepMounted}
		>
			<Fade in={openState}>
				<Box sx={style} className={`max-sm:min-w-[300px] ${MinWidth ? MinWidth : ""}`}>
					{children}
				</Box>
			</Fade>
		</Modal>
	);
};
export default GlobalModal;

import { List, ListItem } from "@mui/material";
import contactUsbanner from "assets/contactUs.svg";
import { Constants } from "utils/constants";

const ContactUs = (props:any) => {
	let {handleCloseContactUsModal} = props;
	return (
		<div className="grid  grid-cols-1 md:grid-cols-2 gap-4 items-center sm:text-lg 2xl:text-2xl">
			<div>
				<img src={contactUsbanner} alt="contact us" />
			</div>
			<div id="transition-modal-description">
				<List sx={{ listStyleType: "disc" }}>
					<ListItem sx={{ display: "list-item" }}>
						For any product usage related queries,
						<span className="text-bold">
							{" "}
							write to{" "}
							<a className="text-blue-700" href="mailto:xyz@mail.com">
								{Constants.CONTACT_US_EMAIL.SUPPORT}
							</a>
						</span>
					</ListItem>
					<ListItem sx={{ display: "list-item" }}>
						<p>
							If you are a business enterprise looking to buy software for your
							organization, we'd be glad to assist you!
							<div style={{ fontWeight: "bold" }}>
								Email us at{" "}
								<a className="text-blue-700" href="mailto:xyz@mail.com">
								{Constants.CONTACT_US_EMAIL.PRODUCT_SUPPORT}
								</a>
							</div>
						</p>
					</ListItem>
				</List>
				<button onClick={handleCloseContactUsModal} className="absolute top-5 right-5">
					<svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16">
						<path
							d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"
							fillRule="evenodd"
						></path>
					</svg>
				</button>
			</div>
		</div>
	);
};
export default ContactUs;

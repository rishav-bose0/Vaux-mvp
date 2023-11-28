import { useEffect, useRef, useState } from "react";
import playBtn from "assets/play.svg";
import pauseBtn from "assets/pause.svg";
import { VAUX_AI_VOICES } from "utils/APIResponseTypes";
import { fetchAIVoicePreview } from "actions/APIActions";
import { Constants } from "utils/constants";
import smallLoader from "assets/smallLoader.svg";
interface ExploreAIVoiceItemPropsInterface {
	AIVoiceItem: VAUX_AI_VOICES;
	isAudioPlaying: string;
	setIsAudioPlaying: React.Dispatch<React.SetStateAction<string>>;
	isSelectionRequired?: boolean;
	SelectCallbackFunc?: () => void;
	isAnyAudioSelected: number;
	setIsAnyAudioSelected: React.Dispatch<React.SetStateAction<number>>;
}
const ExploreAIVoiceItem = (props: ExploreAIVoiceItemPropsInterface) => {
	let {
		AIVoiceItem,
		setIsAudioPlaying,
		isAudioPlaying,
		isSelectionRequired = false,
		SelectCallbackFunc,
		isAnyAudioSelected,
		setIsAnyAudioSelected,
	} = props;
	const [AIAudioLink, setAiAudioLink] = useState<string>("");
	const [playControls, setPlayControls] = useState<{
		playMode: boolean;
		pauseMode: boolean;
	}>({
		playMode: true,
		pauseMode: false,
	});
	const ref = useRef<HTMLAudioElement>(null);
	const [displayControls, setDisplayControls] = useState({
		display: "hidden",
		opacity: "opacity-100",
	});
	const [isAudioSelected, setIsAudioSelected] = useState(props.isAnyAudioSelected === AIVoiceItem?.Id ?? false);
	const [isLoading, setIsLoading] = useState(false);
	const fetchAIVoiceAudioLink = async () => {
		const url = await fetchAIVoicePreview(AIVoiceItem.Id, AIVoiceItem.Name);
		// const url = Voice_preview_MockData.Preview_link;
		// const url = await fetchAIVoicePreview("55", "Timothy");
	
		if (url) {
			setAiAudioLink(url);
			if(ref.current){
				ref.current.src = url;
				fetch(url);
			} 
			// setIsLoading(false);
			// setDisplayControls((prev) => {
			// 	return { ...prev, display: "", opacity: "opacity-100" };
			// });
			// setDisplayControls((prev) => {
			// 	return { ...prev, display: "", opacity: "opacity-100" };
			// });
			return
		}else{
			setIsLoading(false)
		}
		// setIsLoading(false);
		// setDisplayControls((prev) => {
		// 	return { ...prev, display: "", opacity: "opacity-100" };
		// });
	};
	// fetchAIVoiceAudioLink();
	const audioPlayHandler = async () => {
		if (!AIAudioLink?.length) {
			setDisplayControls((prev) => {
				return { ...prev, display: "", opacity: "opacity-50" };
			});
			setIsLoading(true);
			await fetchAIVoiceAudioLink();
		}
		if(ref.current){
			setIsAudioPlaying(ref.current.id);
		} 
		
		if (ref.current && ref.current.currentTime > 0) {
			ref.current.currentTime = 0;
		}
		AIAudioLink && ref.current?.play();
		setDisplayControls((prev) => {
			return { ...prev, display: "", opacity: "opacity-50" };
		});
		// setIsLoading(false);
	};
	const audioPauseHandler = () => {
		ref.current?.pause();
		setDisplayControls((prev) => {
			return { ...prev, display: "hidden", opacity: "opacity-100" };
		});
	};
	const audioOnEndHandler = () => {
		setDisplayControls((prev) => {
			return { ...prev, display: "hidden", opacity: "opacity-100" };
		});
	};
	const audioSelectHandler = () => {
		setIsAudioSelected(true);
		setIsAnyAudioSelected(AIVoiceItem.Id);
		SelectCallbackFunc && SelectCallbackFunc();
	};
	useEffect(() => {
		if (isAudioPlaying !== ref.current?.id && !ref.current?.paused) {
			ref.current?.pause();
			setDisplayControls((prev) => {
				return { ...prev, display: "hidden", opacity: "opacity-100" };
			});
		}
		if (
			isSelectionRequired &&
			isAudioSelected &&
			isAnyAudioSelected !== AIVoiceItem.Id
		) {
			setIsAudioSelected(false);
		}
	}, [isAudioPlaying, isAnyAudioSelected, AIVoiceItem.Id, isSelectionRequired, isAudioSelected]);

	return (
		<div className="flex  group flex-col px-2 pt-2 pb-5 cursor-pointer  w-[150px] h-[180px] hover:shadow-lg hover:border-primary hover:border-2 justify-center items-center gap-2 relative border-[1px] border-gray-300 rounded-lg  border-solid bg-white ">
			<div className="w-[64px] h-[64px] rounded-[50%]  z-[1] relative">
				<img
					src={AIVoiceItem.Img_url}
					loading="lazy"
					alt="AI logo"
					className={`${displayControls.opacity} group-hover:opacity-50`}
				/>
				{!isLoading && playControls.playMode && (
					<img
						src={playBtn}
						alt="play"
						className={`cursor-pointer ${displayControls.display} group-hover:block  absolute top-[55%] left-[50%]`}
						width={45}
						style={{ transform: "translate(-50%, -50%)" }}
						onClick={() => {
							audioPlayHandler();
						}}
					/>
				)}
				{isLoading && (
					<img
						src={smallLoader}
						alt="loading"
						className={`cursor-pointer  absolute top-[55%] left-[50%]`}
						width={45}
						style={{ transform: "translate(-50%, -50%)" }}
					/>
				)}
				{!isLoading && playControls.pauseMode && (
					<img
						src={pauseBtn}
						alt="play"
						className={`cursor-pointer ${displayControls.display} group-hover:block  absolute top-[55%] left-[50%]`}
						width={45}
						style={{ transform: "translate(-50%, -50%)" }}
						onClick={() => {
							audioPauseHandler();
						}}
					/>
				)}
			</div>
			<div className="flex gap-1 text-sm font-medium">
				<span>{AIVoiceItem.Name}</span>
				<span>{`(${AIVoiceItem.Gender})`}</span>
			</div>
			<div className="text-sm font-normal">
				{
					Constants.LANGUAGE_MAPPING[
						AIVoiceItem.Language as keyof typeof Constants.LANGUAGE_MAPPING
					]
				}
				: {Constants.COUNTRY_MAPPING[AIVoiceItem.Country as keyof typeof Constants.COUNTRY_MAPPING]}
			</div>
			{/* <div className="w-[150px] h-[200px] absolute top-0 hover:backdrop-blur-[1px] z-[1] flex items-center justify-center "> */}
			{/* <img src={playBtn} alt="play" className="cursor-pointer hidden group-hover:block" width={64}  /> */}
			{/* </div> */}
			{(
				<audio
					autoPlay
					preload="auto"
					src={AIAudioLink}
					ref={ref}
					id={`${AIVoiceItem.Id}_${AIVoiceItem.Name}_${AIVoiceItem.Gender}`}
					onPause={() => {
						setPlayControls((prev) => {
							return { ...prev, pauseMode: false, playMode: true };
						});
					}}
					onPlay={() => {
						setPlayControls((prev) => {
							return { ...prev, pauseMode: true, playMode: false };
						});
					}}
					onEnded={audioOnEndHandler}
					onLoadedData={()=>setIsLoading(false)}
				/>
			)}
			{isSelectionRequired && (
				<button
					className={`${
						isAudioSelected ? "" : "hidden"
					} absolute bottom-0 group-hover:block bg-primary text-white w-full p-1 rounded-b font-medium `}
					onClick={audioSelectHandler}
				>
					{" "}
					{isAudioSelected ? "Selected" : "Select"}
				</button>
			)}
		</div>
	);
};
export default ExploreAIVoiceItem;

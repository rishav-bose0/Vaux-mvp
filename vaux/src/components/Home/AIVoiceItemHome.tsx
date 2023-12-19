import React, { useEffect, useRef, useState } from "react";
import playBtn from "../../assets/play.svg";
import { fetchAIVoicePreview } from "../../actions/APIActions";
import Avatar_male_1 from "../../assets/M1.png";
import Avatar_male_2 from "../../assets/M2.png";
import Avatar_female_1 from "../../assets/F1.png";
import Avatar_female_2 from "../../assets/F2.png";
import pauseBtn from "../../assets/pause.svg";
import { Constants } from "../../utils/constants";
interface AIVoiceItemHomePropsInterface {
	AIVoiceItem: {
		Gender: string;
		Name: string;
		Id: number;
		Img_url: string;
		img_id: string;
		Language: string;
		Emotion: Array<string>;
		Country: string;
		Preview_link: string
	};
	isAudioPlaying: number;
	setIsAudioPlaying: React.Dispatch<React.SetStateAction<number>>;
}

const AIVoiceItemHome = (props: AIVoiceItemHomePropsInterface) => {
	let { AIVoiceItem, setIsAudioPlaying, isAudioPlaying } = props;
	const [AIAudioLink, setAiAudioLink] = useState<string>("");
	const [playControls, setPlayControls] = useState<{
		playMode: boolean;
		pauseMode: boolean;
	}>({
		playMode: true,
		pauseMode: false,
	});
	const ref = useRef<HTMLAudioElement>(null);
	const imageObj = {
		M1: Avatar_male_1,
		M2: Avatar_male_2,
		F1: Avatar_female_1,
		F2: Avatar_female_2,
	};

	const audioPlayHandler = () => {
		setIsAudioPlaying(AIVoiceItem.Id);
		ref.current?.play();
		if (!AIAudioLink?.length) {
			setAiAudioLink(AIVoiceItem.Preview_link);
		}
	};
	const audioPauseHandler = () => {
		ref.current?.pause();
	};
	useEffect(() => {
		const fetchAIVoiceAudioLink = () => {
			const url = AIVoiceItem.Preview_link
			if (url) {
				setAiAudioLink(url);
			}
		};
		fetchAIVoiceAudioLink();
	},[]);
	useEffect(() => {
		if (isAudioPlaying !== AIVoiceItem.Id && !ref.current?.paused) {
			ref.current?.pause();
		}
	}, [AIVoiceItem.Id, isAudioPlaying]);
	return (
		<div className="flex flex-col w-[250px] justify-center items-center gap-4 relative">
			<div className="w-[216px] h-[206px]">
				<img
					src={imageObj[AIVoiceItem.img_id as keyof typeof imageObj]}
					alt="AI voice Avatar"
					className="absolute left-[50%] top-[-20px] min-w-[250px] z-10 transform-translate"
					width={260}
					style={{ transform: "translate(-50%, 0%)" }}
				/>
			</div>

			{/*<div*/}
			{/*	className=" w-[216px] h-[206px] rounded-[50%] bg-primary relative"*/}
			{/*>*/}
			{/*	<img*/}
			{/*		src={imageObj[AIVoiceItem.img_id as keyof typeof imageObj]}*/}
			{/*		alt="AI voice Avatar"*/}
			{/*		className="absolute left-[50%] top-[-70px] min-w-[250px] z-10"*/}
			{/*		width={260}*/}
			{/*		style={{transform: "translate(-50%, 0%)" }}*/}
			{/*	/>*/}
			{/*</div>*/}
			<div className="flex gap-2 font-medium text-3xl">
				<span>{AIVoiceItem.Name}</span>
				<span>({AIVoiceItem.Gender})</span>
			</div>
			<div className="text-xl font-medium">
				{
					Constants.LANGUAGE_MAPPING[
						AIVoiceItem.Language as keyof typeof Constants.LANGUAGE_MAPPING
					]
				}
				: {Constants.COUNTRY_MAPPING[AIVoiceItem.Country as keyof typeof Constants.COUNTRY_MAPPING]}

			</div>
			<div>
				<img
					src={playBtn}
					alt="play"
					className={`${
						!AIAudioLink
							? "opacity-50 pointer-events-none"
							: "cursor-pointer transition-opacity delay-300"
					} ${playControls.playMode ? "visible" : "hidden"}	`}
					onClick={() => {
						audioPlayHandler();
					}}
				/>

				<img
					src={pauseBtn}
					alt="pause"
					className={`cursor-pointer transition-opacity delay-300  ${
						playControls.pauseMode ? "visible" : "hidden"
					}`}
					onClick={() => {
						audioPauseHandler();
					}}
				/>

				{AIAudioLink && (
					<audio
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
					/>
				)}
			</div>
		</div>
	);
};
export default AIVoiceItemHome;

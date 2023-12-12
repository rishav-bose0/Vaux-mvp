import { useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as DownArrow } from "assets/dropdown_arrow.svg";
import { ReactComponent as GenerateButton } from "assets/generate.svg";
import { ReactComponent as DownloadButton } from "assets/download.svg";
import loadingGIF from "assets/smallLoader.svg";
import GlobalModal from "components/common/GlobalModal";
import ExploreAI from "components/exploreAI/ExploreAI";
import { VAUX_GENERATE_TTS } from "utils/APIResponseTypes";
import { generateTTS } from "actions/APIActions";
import SliderDropdown from "components/common/SliderDropdown";
import { AiVoicesContext } from 'context/AiVoicesContext';
import { useLocalStorage } from "hooks/useLocalStorage";
import { ClickAwayListener, MenuItem, Select, SxProps, Theme } from "@mui/material";

function GenerateAIBlock({
	blockDetail,
	updateBlockDetail,
}: {
	blockDetail: VAUX_GENERATE_TTS;
	updateBlockDetail: (item: VAUX_GENERATE_TTS) => void;
}) {
	const [token, setToken] = useLocalStorage("vaux-staff-token", JSON.stringify(null));
	const { aiVoices } = useContext(AiVoicesContext);
	const ttsAudioRef = useRef<HTMLAudioElement>(null);
	const [AudioLink, setAudioLink] = useState<string>("");
	const [isLoading, setIsloading] = useState<boolean>(false);
	const downloadAudioRef = useRef<HTMLAnchorElement>(null);
	const [openPitch, setOpenPitch] = useState(false);
	const [openSpeed, setOpenSpeed] = useState(false);
	const [generateBlockDetail, setGenerateBlockDetail] = useState(blockDetail);
	const [selectedAIVoice, setSelectedAIVoice] = useState(aiVoices[0]);

	const pitchSliderOptions = [
		{
			value: -50,
			label: '-50%',
		},
		{
			value: -25,
			label: '-25%',
		},
		{
			value: 0,
			label: '0%',
		},
		{
			value: 25,
			label: '25%',
		},
		{
			value: 50,
			label: '50%',
		},
	];

	const speedSliderOptions = [
		{
			value: 1,
			label: '1',
		},
		{
			value: 1.25,
			label: '1.25',
		},
		{
			value: 1.5,
			label: '1.5',
		},
		{
			value: 1.75,
			label: '1.75',
		},
		{
			value: 2,
			label: '2',
		},
		{
			value: 2.25,
			label: '2.25',
		}
	];

	const selectStyles: SxProps<Theme> = {
		border: 'none',
		padding: ' 0 1rem 0rem 0.5rem',
		maxWidth: '6rem',
		':focus-visible': {
			outline: 'none !important'
		},
		'.MuiSelect-select': {
			padding: '0',
			paddingRight: '8px !important',
			fontSize: '12px',
			fontWeight: '500 !important',
			fontFamily: `'Inter', sans-serif`
		},
		'.MuiOutlinedInput-notchedOutline': {
			borderWidth: '0px !important',
			':focus-visible': {
				outline: 'none !important'
			},
		},
		'.MuiSvgIcon-root': {
			right: '0px'
		},
	}

	useEffect(() => {
		setGenerateBlockDetail(blockDetail);
		const result = aiVoices.find((item) => item.Id === blockDetail.speaker_id);
		setSelectedAIVoice(result ?? aiVoices[0]);
	}, [blockDetail]);

	const updateGenerateBlockDetail = (key: string, value: string | number | boolean) => {
        let block = {...generateBlockDetail, [key]: value};
        if (key == "text") {
            const words = value.toString().split(/\s+/);
            const wordCount = words.length
			let maxWordCount = 200
			if (selectedAIVoice.Type !== "standard"){
				maxWordCount = 70
			}

            if (wordCount > maxWordCount) {
                const truncatedText = words.slice(0, maxWordCount).join(' '); // Limiting to 100 words
                block = {...generateBlockDetail, [key]: truncatedText};
                // Show a popup message
                alert("Word limit per block exceeded. Please create a new block and add text");
            }
        }
		if (key != "is_tts_generated") {
			block["is_tts_generated"]= false;
		} else {
			if (typeof value === "boolean") {
				block["is_tts_generated"] = value;
			}
		}

        setGenerateBlockDetail(() => {
            return {...block};
        });
        updateBlockDetail({...block});
    };

	const [openExploreAIsModal, setOpenExploreAIsModal] = useState(false);
	const handleOpenExploreAIsModal = () => setOpenExploreAIsModal(true);
	const handleCloseExploreAIsModal = () => setOpenExploreAIsModal(false);

	const handleTTSListen = async () => {
		if (
			generateBlockDetail &&
			generateBlockDetail.text &&
			generateBlockDetail.text.length > 0
		) {
			setIsloading(true);
			const payload: any = {
				project_id: generateBlockDetail.project_id,
				text: generateBlockDetail.text,
				language: generateBlockDetail.language,
				emotion: generateBlockDetail.emotion,
				speaker_id: generateBlockDetail.speaker_id,
				duration: generateBlockDetail.duration,
				block_number: generateBlockDetail.block_number,
				pitch: generateBlockDetail.pitch,
                // is_tts_generated: generateBlockDetail.is_tts_generated,
			};

			const link = await generateTTS(token, [payload]);
			if (link) {
				setAudioLink(link);
				updateGenerateBlockDetail( "is_tts_generated", true)
			}
			setIsloading(false);
		}
	};
	const handleDownloadTTS = async () => {
		try {
			if (!AudioLink) {
				throw new Error("Resource URL not provided! You need to provide one");
			}
			setIsloading(true);
			const response = await fetch(AudioLink);
			const blob = await response.blob();
			const blobURL = URL.createObjectURL(blob);
			if (downloadAudioRef?.current) {
				downloadAudioRef.current.href = blobURL;
				downloadAudioRef.current.click();
			}
			setIsloading(false);
		} catch (error) {
			console.log(error);
			setIsloading(false);
		}
	};
	return (
		<>
			{generateBlockDetail &&
				selectedAIVoice && (
					<div className="bg-white border border-transparent rounded-lg p-4 m-8">
						<div className="flex justify-between items-center">
							<div className="flex gap-4 items-center">
								<div
									className="flex rounded-3xl border border-gray-300 justify-center items-center px-1 py-0 text-xs cursor-pointer font-medium"
									onClick={handleOpenExploreAIsModal}
								>
									<img
										className={`w-[32px] h-[32px] border border-transparent rounded-circle mr-1`}
										src={selectedAIVoice?.Img_url}
										alt={selectedAIVoice?.Name}
									/>
									<span>{`${selectedAIVoice?.Name} (${selectedAIVoice?.Gender})`}</span>
									<DownArrow className="fill-primary mx-2" />
								</div>
								<div
									className="flex rounded-3xl font-medium border border-gray-300 justify-center items-center px-2 py-1 text-xs cursor-pointer">
									<Select
										className="generate-block-select"
										sx={selectStyles}
										defaultValue="Neutral"
										value={generateBlockDetail.emotion}
										onChange={(event) => updateGenerateBlockDetail('emotion', event.target.value)}
										disabled={selectedAIVoice?.Type != 'standard'}>
										{
											selectedAIVoice && selectedAIVoice?.Emotion.length > 0 &&
											selectedAIVoice.Emotion.map(emotion => {
												return <MenuItem key={emotion} value={emotion.toLowerCase()}>{emotion}</MenuItem>
											})
										}
									</Select>
								</div>
								<ClickAwayListener onClickAway={() => setOpenSpeed(false)}>
									<div className="relative">
										<div
											className={
												`flex rounded-3xl font-medium border border-gray-300 justify-center items-center px-2 py-1 text-xs cursor-pointer h-[33px] 
												${selectedAIVoice?.Type != 'standard' ? 'opacity-50' : ''}`
											}
											onClick={() => {
												setOpenPitch(false);
												setOpenSpeed(!openSpeed);
											}}
											style={{ pointerEvents: selectedAIVoice?.Type != 'standard' ? 'none' : 'auto' }}
										>
											<span style={{
												padding: ' 0 0.2rem 0rem 0.5rem' }}>{`Duration`}</span>
											<DownArrow className="fill-primary mx-1" />
										</div>
										{openSpeed && (
											<>
												<div className="absolute top-[110%] left-[40%] w-[0px] h-[0px] border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px]"></div>
												<SliderDropdown
													positionStyles={`top-[145%] left-[-150%]`} sliderValue={generateBlockDetail.duration} stepValue={0.25}
													sliderChanged={(value) => updateGenerateBlockDetail("duration", value)} defaultValue={1} min={1} max={2.25} sliderOptions={speedSliderOptions} />

											</>
										)}
									</div>
								</ClickAwayListener>
							</div>

							<div className="float-right">
								{!isLoading && (
									<div className="flex gap-2  items-center">
										<GenerateButton
											className="w-[24px] font-medium h-[24px] cursor-pointer "
											onClick={handleTTSListen}
										/>
										{AudioLink && (
											<a
												href={AudioLink}
												ref={downloadAudioRef}
												download={`VOAUX-${selectedAIVoice.Name + "-" + selectedAIVoice.Id
													}.wav`}
											>
												<DownloadButton
													className="w-[24px] font-medium h-[24px] cursor-pointer"
													onClick={handleDownloadTTS}
												/>
											</a>
										)}
									</div>
								)}
								{isLoading && (
									<img
										src={loadingGIF}
										alt="loading"
										className={`cursor-pointer`}
										width={40}
									/>
								)}
							</div>
						</div>
						<div>
							<input
								value={generateBlockDetail.text}
								onChange={(event) =>
									updateGenerateBlockDetail("text", event?.target?.value)
								}
								type="text"
								placeholder="Enter your text here"
								className="text-sm font-normal border border-gray-300 rounded-md w-full p-2 mt-4 focus-visible:outline-none"
							/>
						</div>
						{AudioLink && (
							<div className="mt-3 w-full ">
								<audio
									autoPlay
									className="w-full h-[32px]"
									controls
									controlsList={"nofullscreen nodownload "}
									src={AudioLink}
									ref={ttsAudioRef}
								/>
							</div>
						)}
						{!AudioLink && generateBlockDetail.speech_s3_link?.length > 0 &&(
							<div className="mt-3 w-full ">
								<audio
									className="w-full h-[32px]"
									controls
									controlsList={"nofullscreen nodownload "}
									src={generateBlockDetail.speech_s3_link}
									ref={ttsAudioRef}
								/>
							</div>
						)}
					</div>
				)}
			<GlobalModal
				openState={openExploreAIsModal}
				onCloseHandler={handleCloseExploreAIsModal}
				MinWidth={"w-[70%]"}
				iskeepMounted={true}
			>
				<ExploreAI
					selectedAiVoice={selectedAIVoice}
					handleCloseModal={handleCloseExploreAIsModal}
					isSelectionRequired={true}
					SelectCallbackFunc={(voice) => {
						setSelectedAIVoice({ ...voice });
						updateGenerateBlockDetail("speaker_id", voice.Id);
					}}
				/>
			</GlobalModal>
		</>
	);
}

export default GenerateAIBlock;

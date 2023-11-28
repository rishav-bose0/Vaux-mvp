import { useContext, useEffect, useRef, useState } from "react";
import { getAllAIVoiceSample } from "actions/APIActions";
import ExploreAIVoiceItem from "./ExploreAIItem";
import { VAUX_AI_VOICES } from "utils/APIResponseTypes";
import { useCookie } from "hooks/useCookie";
import { AiVoicesContext } from "context/AiVoicesContext";
import { useLocalStorage } from "hooks/useLocalStorage";
import usePageVisibility from "hooks/usePageVisibility";
interface ExploreAIProps {
	isSelectionRequired?: boolean;
	selectedAiVoice?: VAUX_AI_VOICES;
	SelectCallbackFunc?: (selectedAIVoice: VAUX_AI_VOICES) => void;
	handleCloseModal: () => void;
}
const ExploreAI = (props: ExploreAIProps) => {
	const { isSelectionRequired, SelectCallbackFunc, handleCloseModal } = props;
	const [AIVoices, setAIVoices] = useState<Array<VAUX_AI_VOICES>>([]);
	const [filteredVoices, setFilteredVoices] = useState<Array<VAUX_AI_VOICES>>(
		[],
	);
	const [isAudioPlaying, setIsAudioPlaying] = useState<string>("");
	const [isAnyAudioSelected, setIsAnyAudioSelected] = useState(
		props.selectedAiVoice?.Id ?? -1,
	);
	const [filterAIVoices, setFilterAIVoices] = useState({
		gender: "ALL",
	});
	const [token, setToken] = useLocalStorage(
		"vaux-staff-token",
		JSON.stringify(null),
	);
	const { addAiVoice } = useContext(AiVoicesContext);
	const isVisible = usePageVisibility();

	useEffect(() => {
		if (!isVisible && isAudioPlaying.length) {
			const audioId: HTMLAudioElement | any =
				document.getElementById(isAudioPlaying);
			if (audioId && !audioId.paused) {
				audioId.pause();
			}
		}
	}, [isVisible]);

	useEffect(() => {
		setIsAnyAudioSelected(props.selectedAiVoice?.Id ?? -1);
	}, [props.selectedAiVoice?.Id]);

	useEffect(() => {
		const getAllAIVoices = async () => {
			const voices = await getAllAIVoiceSample(token, false);
			// const voices = List_all_voicesMockData;
			if (voices && voices.length) {
				setAIVoices(voices);
				setFilteredVoices(voices);
				addAiVoice(voices);
			}
		};
		getAllAIVoices();
	}, [token]);

	const filterAiVoicesHandler = (field: string, value: string) => {
		switch (field) {
			case "gender":
				setFilterAIVoices((prev) => {
					return { ...prev, gender: value };
				});
				if (value.length && value === "ALL") {
					setFilteredVoices(AIVoices);
				} else {
					const filteredVoiceListBygender = AIVoices.filter(
						(item) =>
							item.Gender.toLocaleUpperCase().trim() ===
							value.toLocaleUpperCase().trim(),
					);
					setFilteredVoices(filteredVoiceListBygender);
				}

				break;
		}
	};

	const voiceCallbackFunctionHandler = (voice: VAUX_AI_VOICES) => {
		handleCloseModal();
		SelectCallbackFunc && SelectCallbackFunc(voice);
	};
	const modalCloseWrapper = () => {
		console.log(isAudioPlaying, "dddd");
		const audioId: HTMLAudioElement | any =
			document.getElementById(isAudioPlaying);

		if (audioId && !audioId.paused) {
			audioId.pause();
			// isAudioPlaying.pause();
		}
		handleCloseModal();
	};

	return (
		<div>
			<div className="flex items-center justify-between px-4 py-3 bg-white border-solid border-b-[1px] border-gray-300">
				<div className="flex flex-col">
					<h3 className="font-bold">Select a Voice</h3>
					<div className="text-gray-500 text-sm font-medium">
						Choose from 100+ voices
					</div>
				</div>
				<button onClick={modalCloseWrapper}>
					<svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16">
						<path
							d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"
							fillRule="evenodd"
						></path>
					</svg>
				</button>
			</div>
			<div className="grid grid-cols-[240px_auto]">
				<div className="w-[240px] flex flex-col items-center p-5 border-solid border-gray-300 border-r-[1px]">
					<div className="flex">
						<div className="inline-flex shadow-sm rounded-[40px] border-solid border-[1px] border-[rgba(25, 118, 210, 0.5)]">
							<button
								type="button"
								className={`${
									filterAIVoices.gender === "ALL"
										? "text-white bg-primary"
										: "text-primary"
								} rounded-l-[40px] px-4 py-2`}
								onClick={() => filterAiVoicesHandler("gender", "ALL")}
							>
								All
							</button>
							<button
								type="button"
								className={`${
									filterAIVoices.gender === "M"
										? "text-white bg-primary"
										: "text-primary"
								} px-4 py-2`}
								onClick={() => filterAiVoicesHandler("gender", "M")}
							>
								Male
							</button>
							<button
								type="button"
								className={`${
									filterAIVoices.gender === "F"
										? "text-white bg-primary"
										: "text-primary"
								} rounded-r-[40px] px-4 py-2`}
								onClick={() => filterAiVoicesHandler("gender", "F")}
							>
								Female
							</button>
						</div>
					</div>
				</div>
				{filteredVoices && (
					<div className="flex m-auto gap-3 flex-wrap  bg-gray-100 p-5 justify-center max-h-[70vh] overflow-y-scroll ">
						{filteredVoices.map((voice: any) => {
							return (
								<ExploreAIVoiceItem
									key={voice.Id}
									SelectCallbackFunc={() => {
										voiceCallbackFunctionHandler(voice);
									}}
									isSelectionRequired={isSelectionRequired}
									AIVoiceItem={voice}
									isAudioPlaying={isAudioPlaying}
									setIsAudioPlaying={setIsAudioPlaying}
									isAnyAudioSelected={isAnyAudioSelected}
									setIsAnyAudioSelected={setIsAnyAudioSelected}
								/>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};
export default ExploreAI;

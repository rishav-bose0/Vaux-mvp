import { useEffect, useState } from "react";
import { getAllAIVoiceSample } from "actions/APIActions";
import { formatAIVoicesResponseForLanding } from "utils/common.utils";
import AIVoiceItemHome from "components/Home/AIVoiceItemHome";

const AIVoicesListHome = () => {
	const [AIVoices, setAIVoices] = useState<any>([]);
	const [isAudioPlaying, setIsAudioPlaying] = useState("");

	useEffect(() => {
		const getAllAIVoices = async () => {
			const voices = await getAllAIVoiceSample(true);
			if (voices?.length) {
				const formatedVoices = formatAIVoicesResponseForLanding(voices, 2, 2);
				setAIVoices(formatedVoices);
			}
		};
		getAllAIVoices();
	}, []);

	return (
		<div className="flex m-auto gap-6 overflow-x-auto pt-[6rem] md:justify-evenly">
			{AIVoices.map(
				(voice: {
					Gender: string;
					Name: string;
					Id: string;
					Img_url: string;
					img_id: string;
					Language: string;
					Emotion: Array<string>;
					Country: string;
				}) => {
					return (
						<AIVoiceItemHome
							key={voice.Id}
							AIVoiceItem={voice}
							isAudioPlaying={isAudioPlaying}
							setIsAudioPlaying={setIsAudioPlaying}
						/>
					);
				},
			)}
		</div>
	);
};
export default AIVoicesListHome;

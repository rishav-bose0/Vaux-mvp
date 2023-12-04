import { useContext, useEffect, useState } from 'react';
import { VAUX_GENERATE_TTS } from 'utils/APIResponseTypes';
import GenerateAIBlock from 'components/projects/GenerateAIBlock';
import { ReactComponent as AddCircle } from 'assets/add_circle.svg';
import { ReactComponent as GenerateButton } from "assets/generate.svg";
import { ReactComponent as DownloadButton } from "assets/download.svg";
import { fetchProjectDetailsById, generateTTS } from 'actions/APIActions';
import { useParams } from 'react-router';
import { AiVoicesContext } from 'context/AiVoicesContext';
import { useLocalStorage } from 'hooks/useLocalStorage';
import loadingGIF from "assets/smallLoader.svg";
import { SelectedProjectContext } from 'context/SelectedProjectContext';
import Loader from 'components/common/Loader';



function Project() {

  const [token, setToken] = useLocalStorage("vaux-staff-token", JSON.stringify(null));
  const { id } = useParams();
  const { aiVoices } = useContext(AiVoicesContext);
  const { setSelectedProject } = useContext(SelectedProjectContext);
  const [generateVoiceBlocks, setGenerateVoiceBlocks] = useState<VAUX_GENERATE_TTS[]>([{ project_id: id ?? '', speaker_id: aiVoices[0]?.Id, text: '', language: 'en', emotion: 'neutral', duration: 1, pitch: 0, block_number: 0, speech_s3_link: '' , is_tts_generated: true}]);
  const [loading, setLoading] = useState(false);
  const [apiLoading, setapiLoading] = useState(false); 
  const [playAllAudioLink, setPlayAllAudioLink] = useState('');

  const addBlockHandler = () => {
    if (id && aiVoices?.length > 0) {
      setGenerateVoiceBlocks((prev: VAUX_GENERATE_TTS[]) => {
        return [...prev, { project_id: id, speaker_id: aiVoices[0]?.Id, text: '', language: 'en', emotion: 'neutral', duration: 1, pitch: 0, block_number: generateVoiceBlocks.length , speech_s3_link: '', is_tts_generated:true}];
      });
    }
  }

  useEffect(() => {
    if (id) {
      const fetchDetailsById = async () => {
        const { details } = await fetchProjectDetailsById(token, id);
        setSelectedProject({id: id ?? null, name: details?.name ?? null})
        const result = Object.values(details?.block_details);
        if (result.length > 0) {
          const list: VAUX_GENERATE_TTS[] = [];
          result.forEach((item: any, index: number) => {
            list.push({ ...item.tts_details, project_id: id, language: 'en', speaker_id: item.speaker_details?.id, block_number: index, is_tts_generated: true });
          });
          setGenerateVoiceBlocks([...list]);
        }
        setapiLoading(false);
      }
      setapiLoading(true);
      fetchDetailsById();
    }
    return () => {
      setSelectedProject({id: null, name: null});
    }
  }, [id, token]);

  const updateGenerateBlockHandler = (item: VAUX_GENERATE_TTS) => {
    setGenerateVoiceBlocks((prev: VAUX_GENERATE_TTS[]) => {
      let list = [...prev];
      list = list.map(element => element.block_number === item.block_number ? item : element);
      return [...list];
    });
  }

  const generatePlayAllHandler = async () => {
    if (generateVoiceBlocks.length > 1) {
      setLoading(true);
      const link = await generateTTS(token, generateVoiceBlocks);
      if (link) {
        setPlayAllAudioLink(link);
      }
      setLoading(false);
    }
  }

  return (
    <>
      {apiLoading && <Loader />}
      {!apiLoading && <div className='mx-auto w-[70%]'>
        { generateVoiceBlocks.length > 0 &&
          generateVoiceBlocks.map((item, index) => {
            return <GenerateAIBlock key={`generate-block-` + index} blockDetail={item} updateBlockDetail={updateGenerateBlockHandler} />
          })
        }
        <div className='flex justify-center gap-2'>
          {!loading && <>
            <div className='flex justify-center items-center rounded-3xl border border-gray-300 text-center px-2 py-1 text-xs cursor-pointer hover:bg-gray-200' onClick={addBlockHandler}>
              <AddCircle className='w-5 h-5 fill-black' />
              <span className='text-gray-500 font-semibold'>{`Add a block`}</span>
            </div>
            {generateVoiceBlocks.length > 1 &&
              <div className='flex justify-center items-center rounded-3xl border border-gray-300 text-center px-2 py-1 text-xs cursor-pointer hover:bg-gray-200' onClick={generatePlayAllHandler}>
                <GenerateButton className='w-4 h-4 mr-1' style={{ padding: '0.1rem', filter: 'brightness(0) saturate(100%) invert(47%) sepia(8%) saturate(664%) hue-rotate(182deg) brightness(92%) contrast(86%)' }} />
                <span className='text-gray-500 font-semibold'>{`Play All`}</span>
              </div>
            }
            {generateVoiceBlocks.length > 1 && playAllAudioLink &&
              <a className='flex justify-center items-center rounded-3xl border border-gray-300 text-center px-2 py-1 text-xs cursor-pointer hover:bg-gray-200'
                href={playAllAudioLink}
                download={`all.wav`}
              >
                <DownloadButton className='w-4 h-4 mr-1' style={{ padding: '0.1rem', filter: 'brightness(0) saturate(100%) invert(47%) sepia(8%) saturate(664%) hue-rotate(182deg) brightness(92%) contrast(86%)' }} />
                <span className='text-gray-500 font-semibold'>{`Download All`}</span>
              </a>
            }
          </>}
          {loading && (
            <img
              src={loadingGIF}
              alt="loading"
              className={`cursor-pointer`}
              width={40}
            />
          )}
        </div>
        {
          playAllAudioLink &&
          <div className='p-4 mx-10 my-6 bg-white rounded-lg flex justify-center items-center'>
            <audio autoPlay src={playAllAudioLink} controls className="m-4 w-full h-[32px]" controlsList={"nofullscreen nodownload "}></audio>
          </div>
        }
      </div>}
    </>
  )
}

export default Project
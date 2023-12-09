import AIVoicesListHome from 'components/Home/AIVoicesListHome';
import { Constants } from 'utils/constants';
import mainImage from 'assets/main.svg';
import first_step_image from 'assets/first_step.png';
import second_step_image from 'assets/second_step.png';
import third_step_image from 'assets/third_step.png';
import voiceAi from 'assets/voice_ai.svg';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { generateTTS } from 'actions/APIActions';
import VideoCarousel from './VideoCarousel';



function Overview() {

  const navigate = useNavigate();
  const voicesDivRef = useRef<HTMLDivElement>(null);
  const generateRef = useRef<HTMLTextAreaElement>(null);
  const ttsAudioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [playControls, setPlayControls] = useState<{
    playMode: boolean;
    pauseMode: boolean;
  }>({
    playMode: true,
    pauseMode: false,
  });

  const videoPlayHandler = async () => {
    videoRef.current?.play();
  };

  const videoPauseHandler = () => {
    videoRef.current?.pause();
  };

  const handleExplore = () => {
    if (voicesDivRef && voicesDivRef.current) {
      voicesDivRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // const handleTTSListen = async () => {
  //   if (generateRef?.current?.value && generateRef?.current?.value.length <= 100) {
  //     const link = await generateTTS("None",[{ text: generateRef?.current?.value }]);
  //     if (ttsAudioRef.current) {
  //       ttsAudioRef.current.src = link ?? '';
  //       if (ttsAudioRef.current.paused) {
  //         ttsAudioRef.current.play();
  //       }
  //     }
  //   }
  // }

  const routeChange = (path: string, params?: any) => {
    navigate(path, { state: params });
  }

  return (
    <div style={{height: 'calc(100% - 75px)'}} className='overview-main bg-background w-full p-8 md:px-16 md:py-12 overflow-y-auto'>
      <div className="overview-head md:flex">
        <div className='mt-6 md:w-[55%] text-center md:text-left'>
          <span className='text-20 md:text-30 leading-normal font-medium my-8'>{Constants.Overview_Labels.subtitle}</span>
          <h1 className='text-3xl md:text-6xl font-semibold my-10'>{Constants.Overview_Labels.description_heading}</h1>
          <div className="detail my-4 md:my-0 mx-2 md:w-[80%]">
            <span className='text-lg md:text-xl font-normal'>
              {Constants.Overview_Labels.detail_descripton}
            </span>
          </div>
        </div>
        <div className='mt-6 md:w-[45%] flex justify-center items-center mx-auto'>
          <img src={mainImage} alt="Main_Image" width={360} height={360} className="object-cover" />
        </div>
      </div>
      <div className="detail my-4 md:my-0 mx-2 md:w-[80%] md:hidden">
        <span className='text-lg md:text-xl font-normal whitespace-pre-wrap'>
          {Constants.Overview_Labels.detail_descripton}
        </span>
      </div>
      <div className='text-center md:text-left my-4'>
        <button type='button' className='my-4 mx-2 md:my-10 rounded-md border border-primary bg-primary text-white py-4 px-8 font-semibold hover:bg-white hover:text-primary'
          onClick={handleExplore}>{Constants.Overview_Labels.explore + ' >>'}</button>
      </div>

      <div ref={voicesDivRef}>
        <div className="voices-list border border-solid border-light-white bg-light-white rounded-[25px] p-8">
          <AIVoicesListHome />
          <div className='flex flex-col items-center my-8'>
            <span className='text-xl md:text-3xl font-normal font-ink-free mb-6'>{".... And many other voices to choose from"}</span>
            <h1 className='text-xl md:text-4xl font-semibold mb-6'>{'Every necessity has a corresponding voice'}</h1>
            <div>
              <button className='rounded-xmd border border-primary bg-primary text-white hover:bg-white hover:text-primary font-semibold px-12 py-3 mt-4' onClick={() => routeChange('/login')}>Start Now Free</button>
            </div>
          </div>
        </div>
      </div>

      <div className='vaux-introduction overflow-x-auto mb-8'>
        <h1 className='w-full text-3xl md:text-5xl font-semibold my-10 text-center'>{Constants.Overview_Labels.introduce_voux}</h1>
        <div className='flex flex-col mb-8 md:flex-row md:justify-center md:overflow-x-auto'>
          {
            Constants.Overview_Labels.introduction_list.map((listItem) => {
              return (
                <div key={listItem.key} className='introduce-div flex flex-col items-center md:w-[28rem] mx-4 my-4 md:m-0 first:bg-light-blue first:rounded-2xl last:bg-light-blue last:rounded-2xl px-2'>
                  <img src={listItem.img} className={`w-[15rem] h-[15rem] ${listItem.scale} `} alt={`introduce-${listItem.key}`} />
                  <h1 className='text-2xl md:text-4xl font-semibold my-4'>{listItem.title}</h1>
                  <span className='p-4 md:px-12 text-center whitespace-pre-wrap'>{listItem.description}</span>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* <div className='vaux-trail'>
        <h1 className='w-full md:w-[55%] text-3xl md:text-4xl font-semibold mb-6'>Improve Your Projects with Incredibly <br></br><span className='text-4xl md:text-5xl'>AI</span> Vocalizations</h1>
        <div className="md:flex w-full gap-6">
          <div className='md:w-1/2'>
            <img className='p-4 md:max-w-[350px] md:max-h-[350px] mx-auto' src={voiceAi} alt='voice-ai' />
          </div>
          <div className="flex flex-col items-center md:w-1/2 p-4">
            <textarea ref={generateRef} className='w-full p-6' style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 4px' }}
              name="convo" rows={10} maxLength={100} defaultValue={Constants.Overview_Labels.listen_tts_text}></textarea>
            <audio src={""} ref={ttsAudioRef} />
            <div>
              <button className='rounded-xmd border border-primary bg-primary text-white hover:bg-white hover:text-primary font-semibold px-12 py-2 my-8' onClick={handleTTSListen}>Listen</button>
            </div>
          </div>
        </div>
      </div> */}

      <div className='vaux-narrate '>
        <h1 className='text-2xl md:text-4xl font-bold mb-10'>Discover Voice Narrations Crafted by the VOAUX AI Voice Generator</h1>
        <span className='text-[1rem] md:text-xl font-normal'>"Below, you'll find compelling instances of authentic voiceovers, all shaped by the remarkable AI voices of VOAUX."</span>
        <div className='md:flex mt-10 mb-4 gap-6'>
          <div className='md:w-1/3 my-6'>
            <h1 className='text-2xl md:text-4xl font-semibold my-6'>Marketing</h1>
            <span className='block md:w-[60%] lg:w-[50%]'>Expand your storytelling reach and global content accessibility by entrusting VOAUX to generate engaging, lifelike voiceovers for your documentary films, available in multiple languages</span>
          </div>
          <div className='md:w-2/3 m-auto group rounded-[25px] bg-light-white relative'>
            <VideoCarousel />
          </div>
        </div>
      </div>

      <div className='vaux-narrate border border-solid border-light-white rounded-[25px] p-12' style={{ backgroundColor: '#E6E6FA'}}>
        <h2 className='text-2xl md:text-4xl font-bold mb-10'> Voice Cloning </h2>
        <p className='text-2xl md:text-xl mb-10'>
          Voice cloning is an advanced technology that replicates a person's voice, enabling the creation of highly realistic speech that mimics the unique characteristics, tone, and inflections of an individual's voice. It's achieved through sophisticated machine learning algorithms and neural networks that analyze and synthesize the voice patterns, intonations, and speech nuances from a sample audio dataset.
        </p>
        <p className='text-2xl md:text-xl mb-10'>
           Users can now experience personalized interactions, obtain tailored voice-related services, or explore creative applications in media and entertainment. It empowers users to create custom synthetic voices that suit their specific needs and preferences.
        </p>
        <p className='text-2xl md:text-xl font-bold mb-10'>
          Voice Cloning made simple in 2 easy steps:
        </p>
        {/*<div className="flex flex-col">*/}
        {/*  */}
        {/*</div>*/}
        <div className='md:flex mt-10 mb-4 gap-6'>
          <div className='md:w-4/6 my-6'>
            <img
                src={first_step_image}
                // alt="AI voice Avatar"
                // className="absolute left-[50%] top-[-20px] min-w-[250px] z-10 transform-translate"
                // width={260}
                // style={{ transform: "translate(50%, 0%)" }}
            />
            {/*<span className='block md:w-[60%] lg:w-[50%]'>Expand your storytelling reach and global content accessibility by entrusting VOAUX to generate engaging, lifelike voiceovers for your documentary films, available in multiple languages</span>*/}
          </div>
          <div className='md:w-2/6 m-auto group rounded-[25px] relative'>
            <p className='text-xl md:text-3xl font-normal font-ink-free mb-6'>
              * Upload the voice that you would want to clone.
            </p>
          </div>
        </div>

        <div className='md:flex mt-10 mb-4 gap-6'>
          <div className='md:w-2/6 my-6'>
            <p className='text-xl md:text-3xl font-normal font-ink-free mb-6'>
              * Add Details like clone name and gender of the clone voice.
            </p>
            {/*<span className='block md:w-[60%] lg:w-[50%]'>Expand your storytelling reach and global content accessibility by entrusting VOAUX to generate engaging, lifelike voiceovers for your documentary films, available in multiple languages</span>*/}
          </div>
          <div className='md:w-4/6 m-auto group rounded-[25px] relative'>
            <img
                src={second_step_image}
                // alt="AI voice Avatar"
                // className="absolute left-[50%] top-[-20px] min-w-[250px] z-10 transform-translate"
                // width={260}
                // style={{ transform: "translate(50%, 0%)" }}
            />
          </div>
        </div>

        <div className='md:flex mt-10 mb-4 gap-6'>
          <div className='md:w-4/6 my-6'>
            <img
                src={third_step_image}
                // alt="AI voice Avatar"
                // className="absolute left-[50%] top-[-20px] min-w-[250px] z-10 transform-translate"
                // width={260}
                // style={{ transform: "translate(50%, 0%)" }}
            />
            {/*<span className='block md:w-[60%] lg:w-[50%]'>Expand your storytelling reach and global content accessibility by entrusting VOAUX to generate engaging, lifelike voiceovers for your documentary films, available in multiple languages</span>*/}
          </div>
          <div className='md:w-2/6 m-auto group rounded-[25px] relative'>
            <p className='text-xl md:text-3xl font-normal font-ink-free mb-6'>
              Voila! Your Cloned voice is ready for use in a couple of minutes
            </p>
          </div>
        </div>
      </div>

    </div>


  )
}

export default Overview
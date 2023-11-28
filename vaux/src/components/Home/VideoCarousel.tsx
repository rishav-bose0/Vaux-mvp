import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import playBtn from "assets/play.svg";
import pauseBtn from "assets/pause.svg";
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import loadingGIF from "assets/smallLoader.svg";

const steps = [
    {
        label: 'VOAUX Sample 1',
        src: 'https://voaux.s3.ap-south-1.amazonaws.com/promo_videos/merc_voice_over_2.mp4',
    },
    {
        label: 'VOAUX Sample 2',
        src: 'https://voaux.s3.ap-south-1.amazonaws.com/promo_videos/summit_voice_over.mp4',
    },
];

export default function VideoCarousel() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoLoading, setVideoLoading] = useState(true);

    const handleNext = () => {
        setVideoLoading(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setVideoLoading(true);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [playControls, setPlayControls] = useState<{
        playMode: boolean;
        pauseMode: boolean;
    }>({
        playMode: true,
        pauseMode: false,
    });

    const videoPlayHandler = () => {
        videoRef.current?.play();
    };

    const videoPauseHandler = () => {
        videoRef.current?.pause();
    };

    return (
        <Box sx={{ flexGrow: 1, height: '400px' }}>
            <Box sx={{ width: '100%', height: '400px', p: 1 }}>
                {videoLoading && (
                    <div className='w-full h-full flex items-center justify-center'>
                        <img
                            src={loadingGIF}
                            alt="loading"
                            className={`cursor-pointer`}
                            width={40}
                        />
                    </div>
                )}
                <video className='h-full w-full' style={{display: videoLoading ? 'none' : 'block'}} ref={videoRef} src={steps[activeStep].src}
                    onLoadedData={() => setVideoLoading(false)}
                    onPause={() => {
                        setPlayControls((prev: any) => {
                            return { ...prev, pauseMode: false, playMode: true };
                        });
                    }}
                    onPlay={() => {
                        setPlayControls((prev: any) => {
                            return { ...prev, pauseMode: true, playMode: false };
                        });
                    }}></video>
                <div className='absolute top-[50%] left-[50%]' style={{ transform: 'translate(-50%, -50%)', display: videoLoading ? 'none' : 'block' }}>
                    {playControls.playMode && (
                        <img
                            src={playBtn}
                            alt="play"
                            className="cursor-pointer"
                            onClick={() => {
                                videoPlayHandler();
                            }}
                        />
                    )}
                    {playControls.pauseMode && (
                        <img
                            src={pauseBtn}
                            alt="pause"
                            className="cursor-pointer hidden group-hover:block"
                            onClick={() => {
                                videoPauseHandler();
                            }}
                        />
                    )}
                </div>
                <MobileStepper sx={{ px: '4.5rem', '.MuiMobileStepper-dotActive': {backgroundColor: '#182a75'} }}
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button sx={{ color: '#182a75'}}
                            size="small"
                            onClick={() => {videoPauseHandler(); setTimeout(() => { handleNext() },0)}}
                            disabled={activeStep === maxSteps - 1}
                        >
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button sx={{ color: '#182a75'}} size="small"
                        onClick={() => {videoPauseHandler(); setTimeout(() => { handleBack() },0)}}
                            disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </Box>
    );
}
// import React from 'react';
//
// interface TutorialsProps {
//     handleCloseModal: () => void;
// }
// const Tutorials: React.FC<TutorialsProps> = ({ handleCloseModal }) => {
//     const tutorialVideos = [
//         {
//             id: 1,
//             // title: 'Tutorial 1',
//             description: 'How to use text to speech?',
//             videoUrl: 'https://voaux.s3.ap-south-1.amazonaws.com/promo_videos/Tutorial_1.mp4',
//         },
//         {
//             id: 2,
//             // title: 'Tutorial 2',
//             description: 'How to clone voices',
//             videoUrl: 'https://voaux.s3.ap-south-1.amazonaws.com/promo_videos/Tutorial_2.mp4',
//         },
//     ];
//
//     return (
//         <>
//             <div className="flex items-center justify-between px-4 py-3 bg-white border-solid border-b-[1px] border-gray-300">
//                 <div className="flex flex-col">
//                     <h3 className="font-bold">Tutorials</h3>
//                 </div>
//                 <button onClick={handleCloseModal}>
//                     <svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16">
//                         <path
//                             d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"
//                             fillRule="evenodd"
//                         ></path>
//                     </svg>
//                 </button>
//             </div>
//             <div className="tutorials-container">
//                 {/*<h2>Tutorials</h2>*/}
//                 {/*<button onClick={handleCloseModal}>*/}
//                 {/*    <svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16">*/}
//                 {/*        <path*/}
//                 {/*            d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"*/}
//                 {/*            fillRule="evenodd"*/}
//                 {/*        ></path>*/}
//                 {/*    </svg>*/}
//                 {/*</button>*/}
//                 <div className="flex flex-row justify-center gap-4 text-m font-medium p-6">
//                     {tutorialVideos.map((tutorial) => (
//                         <div key={tutorial.id} className="tutorial-video w-1/2">
//                             {/*<h3>{tutorial.title}</h3>*/}
//                             <p className="m-2">{tutorial.description}</p>
//                             <video className="rounded-[20px] border" controls width="600" src={tutorial.videoUrl} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// };
//
// export default Tutorials;

import React, { useEffect } from 'react';

interface TutorialVideo {
    id: number;
    // title: string;
    description: string;
    videoUrl: string;
}

interface TutorialsProps {
    handleCloseModal: () => void;
}

const Tutorials: React.FC<TutorialsProps> = ({ handleCloseModal }) => {
    const tutorialVideos: TutorialVideo[] = [
        {
            id: 1,
            // title: 'Tutorial 1',
            description: 'How to use text to speech?',
            videoUrl: 'https://voaux.s3.ap-south-1.amazonaws.com/promo_videos/Tutorial_1.mp4',
        },
        {
            id: 2,
            // title: 'Tutorial 2',
            description: 'How to clone voices',
            videoUrl: 'https://voaux.s3.ap-south-1.amazonaws.com/promo_videos/Tutorial_2.mp4',
        },
    ];

    useEffect(() => {
        const videos = document.getElementsByTagName('video');
        for (let i = 0; i < videos.length; i++) {
            const video = videos[i];
            video.pause();
            video.currentTime = 0;
        }
    }, [handleCloseModal]);

    return (
        <>
            <div className="flex items-center justify-between px-4 py-3 bg-white border-solid border-b-[1px] border-gray-300">
                <div className="flex flex-col">
                    <h3 className="font-bold">Tutorials</h3>
                </div>
                <button onClick={handleCloseModal}>
                    <svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16">
                        <path
                            d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
            <div className="tutorials-container">
                {/*<h2>Tutorials</h2>*/}
                {/*<button onClick={handleCloseModal}>*/}
                {/*    <svg data-icon="cross" width="16" height="16" viewBox="0 0 16 16">*/}
                {/*        <path*/}
                {/*            d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z"*/}
                {/*            fillRule="evenodd"*/}
                {/*        ></path>*/}
                {/*    </svg>*/}
                {/*</button>*/}
                <div className="flex flex-row justify-center gap-4 text-m font-medium p-6">
                    {tutorialVideos.map((tutorial) => (
                        <div key={tutorial.id} className="tutorial-video w-1/2">
                            {/*<h3>{tutorial.title}</h3>*/}
                            <p className="m-2">{tutorial.description}</p>
                            <video className="rounded-[20px] border" controls width="600" src={tutorial.videoUrl} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Tutorials;

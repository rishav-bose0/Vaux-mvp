import React from "react";
import LoaderSvg from '../../assets/Loader.svg';

function Loader() {
  return (
    <div className='backdrop-blur-[2px] bg-transparent absolute h-full w-full top-0 left-0 z-20'>
      <div className='absolute flex justify-center items-center w-full h-full'>
          <img className='w-[80px] h-[80px]' src={LoaderSvg} alt="loader-svg" />
      </div>
    </div>
  )
}

export default Loader
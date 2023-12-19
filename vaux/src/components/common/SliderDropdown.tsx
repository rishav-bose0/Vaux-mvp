import React from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
    return `${value}`;
}

export default function SliderDropdown({positionStyles, defaultValue, min, max, stepValue, sliderOptions, sliderValue, sliderChanged}: {positionStyles: string, defaultValue: number, min: number, max: number, stepValue: number, sliderOptions: Array<any>, sliderValue: number, sliderChanged: (value: number) => void}) {
    return (
        <Box className={`custom-slider z-[1] bg-white position-absolute py-4 px-8 border border-gray-200 rounded-xmd shadow-md ${positionStyles}`} sx={{ width: 300, position: 'absolute' }}>
            <Slider
                aria-label="Percentages"
                value={sliderValue ?? 0} defaultValue={defaultValue} min={min} max={max}
                getAriaValueText={valuetext} autoFocus 
                valueLabelDisplay="auto" step={stepValue}
                marks={sliderOptions} onChangeCommitted={(event, value) => sliderChanged(value as number)}
            />
        </Box>
    );
}
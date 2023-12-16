export default function SliderDropdown({ positionStyles, defaultValue, min, max, stepValue, sliderOptions, sliderValue, sliderChanged }: {
    positionStyles: string;
    defaultValue: number;
    min: number;
    max: number;
    stepValue: number;
    sliderOptions: Array<any>;
    sliderValue: number;
    sliderChanged: (value: number) => void;
}): import("react/jsx-runtime").JSX.Element;

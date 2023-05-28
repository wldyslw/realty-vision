import BaseSlider, { type SliderOwnProps } from '@mui/base/Slider';

interface SliderValueLabelProps {
    children: React.ReactElement;
}

function SliderValueLabel({ children }: SliderValueLabelProps) {
    return <span className="">{children}</span>;
}
const slotProps: SliderOwnProps['slotProps'] = {
    root: () => ({
        className:
            'relative inline-flex items-center h-2 w-full cursor-pointer touch-none py-4 text-typo-secondary dark:text-black font-bold',
    }),
    rail: () => ({
        className: 'absolute block h-1 w-full rounded-full bg-base-darker',
    }),
    track: () => ({
        className:
            'absolute block h-1 rounded-sm bg-primary dark:bg-primary-darker',
    }),
    thumb: () => ({
        className:
            'absolute flex justify-center items-center -translate-x-1/2 h-6 w-6 text-xs rounded-full bg-white dark:bg-zinc-300 outline-none shadow-md',
    }),
    mark: () => ({
        className:
            'absolute top-1/2 h-2 w-2 -translate-x-1/2 rounded-sm opacity-70 bg-primary',
    }),
};

const getAriaLabel = (i: number) => {
    return i === 0 ? 'Minimum floor number' : 'Maximum floor number';
};

export default function Slider(props: SliderOwnProps) {
    return (
        <div className="flex w-full items-center px-3.5">
            <BaseSlider
                getAriaLabel={getAriaLabel}
                slotProps={slotProps}
                slots={{ valueLabel: SliderValueLabel }}
                {...props}
            />
        </div>
    );
}

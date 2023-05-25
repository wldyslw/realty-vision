import BaseSlider, { type SliderOwnProps } from '@mui/base/Slider';

interface SliderValueLabelProps {
    children: React.ReactElement;
}

function SliderValueLabel({ children }: SliderValueLabelProps) {
    return <span className="">{children}</span>;
}

export default function Slider(props: SliderOwnProps) {
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
                'absolute flex justify-center items-center -translate-x-1/2 h-7 w-7 rounded-full bg-white dark:bg-zinc-300 outline-none shadow-md',
        }),
        mark: () => ({
            className:
                'absolute top-1/2 h-2 w-2 -translate-x-1/2 rounded-sm opacity-70 bg-primary',
        }),
    };

    return (
        <div className="flex w-full items-center px-3.5">
            <BaseSlider
                aria-label="Floor number"
                slotProps={slotProps}
                // className='translate-x-1/2'
                slots={{ valueLabel: SliderValueLabel }}
                {...props}
            />
        </div>
    );
}

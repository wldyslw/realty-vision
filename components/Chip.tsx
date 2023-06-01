import { type DetailedHTMLProps, type ButtonHTMLAttributes, memo } from 'react';

type ChipProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    active?: boolean;
    activeColor?: string;
};

function Chip({
    children,
    className,
    active,
    activeColor = 'white',
    ...props
}: ChipProps) {
    return (
        <button
            style={{ backgroundColor: active ? activeColor : undefined }}
            className={`mr-2 rounded-full bg-base/70 px-4 py-2 text-sm font-bold drop-shadow-md backdrop-blur-md ${
                className ?? ''
            }`}
            {...props}
        >
            {children}
        </button>
    );
}

export default memo(Chip);

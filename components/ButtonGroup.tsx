import { type ReactNode, type ChangeEventHandler } from 'react';

type ButtonGroupProps = {
    checked?: boolean;
    children?: ReactNode;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    name?: string;
};

export default function ButtonGroup(props: ButtonGroupProps) {
    return (
        <label
            className={`button-group relative cursor-pointer border-[3px] border-x-0 border-base-darker bg-base-darker px-4 py-1 font-bold transition-colors first:rounded-s-md first:border-s-[3px] last:rounded-e-md last:border-e-[3px] ${
                props.checked
                    ? 'bg-primary-focus text-primary-darker'
                    : 'text-typo-secondary'
            }`}
        >
            <input
                id={props.id ?? ''}
                className="hidden"
                type="checkbox"
                name={props.name ?? ''}
                onChange={props.onChange}
                checked={props.checked}
            />
            {props.children}
        </label>
    );
}

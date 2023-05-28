type FilterProps = {
    icon: string;
    label: string;
    children?: React.ReactNode;
};

export function Filter({ children, label, icon }: FilterProps) {
    return (
        <fieldset
            aria-labelledby={`${icon}_filter_legend`}
            className="mb-2 flex flex-row justify-between rounded-md bg-base px-4 py-2"
        >
            <div
                id={`${icon}_filter_legend`}
                className="mr-4 flex items-center text-lg lg:text-xl"
            >
                <span className="material-symbols-rounded mr-2">{icon}</span>
                {label}
            </div>
            <div className="flex w-full items-center justify-end">
                {children}
            </div>
        </fieldset>
    );
}
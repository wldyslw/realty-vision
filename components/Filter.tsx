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
                className="me-4 flex items-center text-lg lg:text-xl"
            >
                <span className="material-symbols-rounded">{icon}</span>
                <span className="ms-2">{label}</span>
            </div>
            <div className="flex w-full items-center justify-end">
                {children}
            </div>
        </fieldset>
    );
}

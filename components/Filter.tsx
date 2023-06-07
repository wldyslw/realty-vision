type FilterProps = {
    icon: string;
    label: string;
    children?: React.ReactNode;
};

export function Filter({ children, label, icon }: FilterProps) {
    return (
        <fieldset
            aria-labelledby={`${icon}_filter_legend`}
            className="flex flex-row justify-between border-b-[1px] border-b-divider/50 px-4 py-2 last:border-none"
        >
            <div
                id={`${icon}_filter_legend`}
                className="me-4 flex items-center text-[1rem] lg:text-xl"
            >
                <span className="material-symbols-rounded hidden lg:inline">
                    {icon}
                </span>
                <span className="ms-0 whitespace-nowrap lg:ms-2">{label}</span>
            </div>
            <div className="flex w-full items-center justify-end">
                {children}
            </div>
        </fieldset>
    );
}

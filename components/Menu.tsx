import Link from 'next/link';
import type React from 'react';
import { type UrlObject } from 'url';

type MenuProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
>;

function Menu({ className, children, ...props }: MenuProps) {
    return (
        <ul
            {...props}
            className={`z-[100000010] flex flex-col rounded-xl border-[1px] border-divider/50 bg-base/50 backdrop-blur-md ${
                className ?? ''
            }`}
        >
            {children}
        </ul>
    );
}

type MenuItemProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLIElement>,
    HTMLLIElement
> & {
    icon?: string;
    href?: string | UrlObject;
};

function MenuItem({
    className,
    icon,
    children,
    role,
    href,
    ...props
}: MenuItemProps) {
    const content = (
        <>
            <span className="me-16">{children}</span>
            <span className="material-symbols-rounded">{icon}</span>
        </>
    );

    return (
        <li
            {...props}
            role={role ?? 'button'}
            className={`flex items-center justify-between border-b-[1px] border-b-divider/50 px-4 py-2 last:border-b-0 ${
                className ?? ''
            }`}
        >
            {href ? (
                <Link
                    className="flex w-full items-center justify-between"
                    href={href}
                >
                    {content}
                </Link>
            ) : (
                content
            )}
        </li>
    );
}

export { Menu, MenuItem };

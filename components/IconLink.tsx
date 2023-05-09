import { type ReactNode } from 'react';
import Link, { type LinkProps } from 'next/link';

type IconLinkProps = LinkProps & {
    icon: string;
    children: ReactNode | ReactNode[];
    collapsed?: boolean;
};

export default function IconLink({
    children,
    icon,
    collapsed,
    ...props
}: IconLinkProps) {
    return (
        <Link {...props} className="flex px-4 py-2 hover:cursor-pointer">
            <span className="material-symbols-outlined mr-2">{icon}</span>
            <span className={`${collapsed ? 'hidden' : ''} underline`}>
                {children}
            </span>
        </Link>
    );
}

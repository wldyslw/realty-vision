import type React from 'react';
import { useMemo, type ReactNode } from 'react';
import Link, { type LinkProps } from 'next/link';
import { type NextRouter, useRouter } from 'next/router';
import type { UrlObject } from 'url';

type IconLinkProps = Partial<LinkProps> & {
    icon?: string;
    href?: string | UrlObject;
    children?: ReactNode | ReactNode[];
    collapsed?: boolean;
    labelClass?: string;
    iconClass?: string;
    className?: string;
    matchPath?: boolean;
    type?: 'default' | 'filled';
    pathMatcher?: (router: NextRouter, href: string | UrlObject) => boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
};

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

function ButtonWrapper({ children, ...props }: ButtonProps) {
    return <button {...props}>{children}</button>;
}

const defaultPathMatcher = (router: NextRouter, href: string | UrlObject) => {
    const hrefStr = typeof href === 'string' ? href : (href.pathname as string);
    return href === '/'
        ? router.pathname === hrefStr
        : router.pathname.includes(hrefStr);
};

export default function IconLink({
    children,
    icon,
    collapsed,
    href,
    className,
    matchPath,
    labelClass,
    iconClass,
    pathMatcher = defaultPathMatcher,
    type = 'default',
    onClick,
}: IconLinkProps) {
    const router = useRouter();

    const matches = useMemo(() => {
        if (!matchPath || !href) {
            return false;
        }
        return pathMatcher(router, href);
    }, [href, matchPath, pathMatcher, router]);

    const Component = href ? Link : ButtonWrapper;

    return (
        <Component
            href={href as NonNullable<typeof href>}
            onClick={onClick}
            className={`${matches ? 'bg-primary-focus' : ''} ${
                collapsed ? 'justify-center' : ''
            } ${
                type === 'filled'
                    ? 'justify-center bg-primary px-4 py-2 text-center text-white'
                    : 'px-2 py-1 text-primary-darker'
            } inline-flex rounded-xl font-bold transition-colors hover:cursor-pointer hover:bg-primary-hover active:bg-primary-active ${className}`}
        >
            <span
                className={`material-symbols-rounded inline ${iconClass ?? ''}`}
            >
                {icon}
            </span>
            <span
                className={`${
                    collapsed ? 'hidden lg:hidden' : ''
                } ml-1 inline ${labelClass ?? ''}`}
            >
                {children}
            </span>
        </Component>
    );
}

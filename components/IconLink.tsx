import type React from 'react';
import { useMemo, type ReactNode, memo } from 'react';
import Link from 'next/link';
import { type NextRouter, useRouter } from 'next/router';
import type { UrlObject } from 'url';

type CommonProps = {
    icon?: string;
    href?: string | UrlObject;
    children?: ReactNode | ReactNode[];
    collapsed?: boolean;
    labelClass?: string;
    iconClass?: string;
    className?: string;
    matchPath?: boolean;
    styling?: 'default' | 'filled';
    pathMatcher?: (router: NextRouter, href: string | UrlObject) => boolean;
    useAnchor?: boolean;
};

type ButtonProps = CommonProps &
    React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    >;
type LinkProps = CommonProps & Partial<React.ComponentProps<typeof Link>>;

export type IconLinkProps = LinkProps & ButtonProps;

const defaultPathMatcher = (router: NextRouter, href: string | UrlObject) => {
    const hrefStr = typeof href === 'string' ? href : (href.pathname as string);
    return href === '/'
        ? router.pathname === hrefStr
        : router.pathname.includes(hrefStr);
};

function IconLink({
    children,
    icon,
    collapsed,
    href,
    className,
    matchPath,
    labelClass,
    iconClass,
    pathMatcher = defaultPathMatcher,
    styling = 'default',
    useAnchor,
    ...props
}: IconLinkProps) {
    const router = useRouter();

    const matches = useMemo(() => {
        if (!matchPath || !href) {
            return false;
        }
        return pathMatcher(router, href);
    }, [href, matchPath, pathMatcher, router]);

    const Component: React.ElementType = href
        ? useAnchor
            ? 'a'
            : Link
        : 'button';

    return (
        <Component
            {...props}
            href={href}
            className={`${matches ? 'bg-primary-focus' : ''} ${
                styling === 'filled'
                    ? 'justify-center bg-primary px-4 py-2 text-center text-white'
                    : 'px-2 py-1 text-primary-darker'
            } inline-flex items-center rounded-xl font-semibold transition-colors hover:cursor-pointer hover:bg-primary-hover active:bg-primary-active ${className}`}
        >
            <span className={`material-symbols-rounded ${iconClass ?? ''}`}>
                {icon}
            </span>
            <span
                className={`${children ? 'inline' : 'hidden'} ${
                    labelClass ?? 'ms-1'
                }`}
            >
                {children}
            </span>
        </Component>
    );
}

export default memo(IconLink);

import { useMemo, type ReactNode } from 'react';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import type { UrlObject } from 'url';

type IconLinkProps = LinkProps & {
    icon: string;
    children?: ReactNode | ReactNode[];
    collapsed?: boolean;
    labelClass?: string;
    iconClass?: string;
    href: string | UrlObject;
    className?: string;
    matchPath?: boolean;
};

const pathMatcher = (currentPath: string, href: string) =>
    href === '/' ? currentPath === href : currentPath.includes(href);

export default function IconLink({
    children,
    icon,
    collapsed,
    href,
    className,
    matchPath,
    labelClass,
    iconClass,
    ...props
}: IconLinkProps) {
    const router = useRouter();

    const matches = useMemo(() => {
        if (!matchPath) {
            return false;
        }
        if (typeof href === 'string') {
            return pathMatcher(router.pathname, href);
        }
        if (href.pathname) {
            return pathMatcher(router.pathname, href.pathname);
        }
        return false;
    }, [href, matchPath, router.pathname]);

    return (
        <Link
            {...props}
            href={href}
            className={`${matches ? 'bg-primary-active' : ''} ${
                collapsed ? 'justify-center' : ''
            } inline-flex rounded-md px-2 py-1 text-primary-darker hover:cursor-pointer hover:bg-primary-hover active:bg-primary-active ${className}`}
        >
            <span className={`material-symbols-outlined ${iconClass}`}>
                {icon}
            </span>
            <span
                className={`${collapsed ? 'hidden' : ''} ml-2 font-extrabold ${
                    labelClass ?? ''
                }`}
            >
                {children}
            </span>
        </Link>
    );
}

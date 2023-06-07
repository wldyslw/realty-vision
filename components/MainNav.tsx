import {
    useEffect,
    useMemo,
    useState,
    useCallback,
    type MouseEvent,
} from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import IconLink from './IconLink';
import { Menu, MenuItem } from './Menu';

const links = [
    { href: '/', icon: 'home', label: 'home', className: '' },
    { href: '/search', icon: 'search', label: 'search', className: '' },
    {
        href: '/about',
        icon: 'info',
        label: 'about',
        className: 'hidden lg:flex',
    },
    { href: '/gallery', icon: 'image', label: 'gallery', className: '' },
    { href: '/map', icon: 'location_on', label: 'map', className: '' },
    { href: '#contacts', icon: 'call', label: 'contacts', className: '' },
];

export default function MainNav() {
    const { t, lang } = useTranslation('common');
    const router = useRouter();
    const [settingsOpen, openSettings] = useState(false);
    const { pathname, asPath, query } = router;

    const handleLangSwitch = useCallback(() => {
        document.documentElement.dir = lang === 'he' ? 'ltr' : 'rtl';
        router.push({ pathname, query }, asPath, {
            locale: lang === 'he' ? 'en' : 'he',
        });
    }, [asPath, lang, pathname, query, router]);

    const handleDarkModeSwitch = useCallback(() => {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
    }, []);

    const handleLightModeSwitch = useCallback(() => {
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark');
    }, []);

    const toggleSettings = useCallback((e: MouseEvent) => {
        e.stopPropagation();
        openSettings((v) => !v);
    }, []);

    useEffect(() => {
        const listener = () => {
            openSettings(false);
        };

        if (typeof window !== 'undefined') {
            document.body.addEventListener('click', listener, {});
        }

        return () => {
            if (typeof window !== 'undefined') {
                document.body.removeEventListener('click', listener, {});
            }
        };
    }, []);

    const itemsCollapsed = useMemo(
        () => router.pathname !== '/',
        [router.pathname]
    );

    return (
        <nav className="flex h-full justify-evenly overflow-y-auto p-2 lg:flex-col lg:justify-start">
            <img
                src="/logo-bg-black.png"
                alt="Company logo"
                className="mx-auto mb-8 mt-4 hidden w-full max-w-[10rem] lg:dark:block"
            />
            <img
                src="/logo-bg-white.png"
                alt="Company logo"
                className="mx-auto mb-8 mt-4 hidden w-full max-w-[10rem] lg:block lg:dark:hidden"
            />

            {links.map(({ href, icon, label, className }) => {
                return (
                    <IconLink
                        matchPath
                        key={icon}
                        href={href}
                        icon={icon}
                        className={`flex-col  lg:my-1 ${
                            itemsCollapsed ? 'lg:flex-col' : 'lg:flex-row'
                        } ${className}`}
                        labelClass={`ms-0 text-[0.5rem] ${
                            itemsCollapsed
                                ? 'lg:ms-0 lg:text-[0.6rem]'
                                : 'lg:ms-1 lg:text-[1rem]'
                        }`}
                    >
                        {t('navigation.' + label)}
                    </IconLink>
                );
            })}

            <IconLink
                onClick={toggleSettings}
                icon="menu"
                className={`flex-col  lg:hidden`}
                labelClass="ms-0 text-[0.5rem]"
            >
                {t('navigation.more')}
            </IconLink>

            <Menu
                className={`absolute bottom-[4.5rem] origin-bottom transition-transform ltr:right-3 rtl:left-3 ${
                    settingsOpen
                        ? 'translate-x-0 translate-y-0 scale-100'
                        : 'translate-y-10 scale-0 ltr:translate-x-10 rtl:-translate-x-16'
                }`}
            >
                <MenuItem onClick={handleLangSwitch} icon="language">
                    {t('general.lang')}
                </MenuItem>
                <MenuItem
                    onClick={handleDarkModeSwitch}
                    icon="dark_mode"
                    className="dark:hidden"
                >
                    {t('general.dark_mode')}
                </MenuItem>
                <MenuItem
                    onClick={handleLightModeSwitch}
                    icon="light_mode"
                    className="hidden dark:flex"
                >
                    {t('general.light_mode')}
                </MenuItem>
                <MenuItem href="/about" icon="info">
                    {t('navigation.about')}
                </MenuItem>
            </Menu>

            <div className="h-full"></div>

            <div className={`hidden flex-col lg:flex`}>
                <IconLink
                    className={`flex-col justify-center lg:my-1 ${
                        itemsCollapsed
                            ? 'lg:flex-col lg:justify-center'
                            : 'lg:flex-row lg:justify-start '
                    }`}
                    labelClass={`ms-0 text-[0.5rem] ${
                        itemsCollapsed
                            ? 'lg:ms-0 lg:text-[0.6rem]'
                            : 'lg:ms-1 lg:text-[1rem]'
                    }`}
                    icon="language"
                    onClick={handleLangSwitch}
                >
                    {t('general.lang')}
                </IconLink>
                <IconLink
                    className={`flex-col justify-center dark:hidden lg:my-1 ${
                        itemsCollapsed
                            ? 'lg:flex-col lg:justify-center'
                            : 'lg:flex-row lg:justify-start '
                    }`}
                    labelClass={`ms-0 text-[0.5rem] ${
                        itemsCollapsed
                            ? 'lg:ms-0 lg:text-[0.6rem]'
                            : 'lg:ms-1 lg:text-[1rem]'
                    }`}
                    icon="dark_mode"
                    onClick={handleDarkModeSwitch}
                >
                    {t('general.dark_mode')}
                </IconLink>
                <IconLink
                    className={`hidden flex-col justify-center dark:flex lg:my-1 ${
                        itemsCollapsed
                            ? 'lg:flex-col lg:justify-center'
                            : 'lg:flex-row lg:justify-start '
                    }`}
                    labelClass={`ms-0 text-[0.5rem] ${
                        itemsCollapsed
                            ? 'lg:ms-0 lg:text-[0.6rem]'
                            : 'lg:ms-1 lg:text-[1rem]'
                    }`}
                    icon="light_mode"
                    onClick={handleLightModeSwitch}
                >
                    {t('general.light_mode')}
                </IconLink>
            </div>
        </nav>
    );
}

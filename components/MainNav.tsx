import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import IconLink from './IconLink';

const links = [
    { href: '/', icon: 'home', label: 'home' },
    { href: '/search', icon: 'search', label: 'search' },
    { href: '/about', icon: 'info', label: 'about' },
    { href: '/gallery', icon: 'image', label: 'gallery' },
    { href: '/map', icon: 'location_on', label: 'map' },
    { href: '#contacts', icon: 'call', label: 'contacts' },
];

export default function MainNav() {
    const { t, lang } = useTranslation('common');
    const router = useRouter();
    const { pathname, asPath, query } = router;

    return (
        <nav className="flex h-full justify-center overflow-y-auto p-2 lg:flex-col lg:justify-start">
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

            {links.map(({ href, icon, label }) => {
                return (
                    <IconLink
                        matchPath
                        key={icon}
                        href={href}
                        icon={icon}
                        labelClass="hidden md:inline"
                        collapsed={router.pathname !== '/'}
                        className="mx-2 my-0 lg:mx-0 lg:my-1"
                    >
                        {t('navigation.' + label)}
                    </IconLink>
                );
            })}

            <div className="h-full"></div>

            <div className="hidden flex-col md:flex">
                <IconLink
                    icon="language"
                    labelClass="hidden md:inline"
                    collapsed={router.pathname !== '/'}
                    className="mx-2 my-0 lg:mx-0 lg:my-1"
                    onClick={() => {
                        document.documentElement.dir =
                            lang === 'he' ? 'ltr' : 'rtl';
                        router.push({ pathname, query }, asPath, {
                            locale: lang === 'he' ? 'en' : 'he',
                        });
                    }}
                >
                    {lang.toUpperCase()}
                </IconLink>
                <IconLink
                    icon="light_mode"
                    labelClass="hidden md:inline"
                    collapsed={router.pathname !== '/'}
                    className="mx-2 my-0 dark:hidden lg:mx-0 lg:my-1"
                    onClick={() => {
                        localStorage.theme = 'dark';
                        document.documentElement.classList.add('dark');
                    }}
                >
                    Light
                </IconLink>
                <IconLink
                    icon="dark_mode"
                    labelClass="hidden md:inline"
                    collapsed={router.pathname !== '/'}
                    className="mx-2 my-0 hidden dark:flex lg:mx-0 lg:my-1"
                    onClick={() => {
                        localStorage.theme = 'light';
                        document.documentElement.classList.remove('dark');
                    }}
                >
                    Dark
                </IconLink>
            </div>
        </nav>
    );
}

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
    const { t } = useTranslation('common');
    const router = useRouter();

    return (
        <nav className="flex justify-center overflow-y-auto p-2 lg:flex-col lg:justify-start">
            <picture>
                <source
                    srcSet="/logo-bg-black.png"
                    media="(prefers-color-scheme: dark)"
                />
                <img
                    src="/logo-bg-white.png"
                    alt="Company logo"
                    className="mx-auto mb-8 mt-4 hidden w-full max-w-[10rem] lg:block"
                />
            </picture>

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
        </nav>
    );
}

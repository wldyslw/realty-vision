import { useRouter } from 'next/router';
import IconLink from './IconLink';

const links = [
    { href: '/', icon: 'home', label: 'Home' },
    { href: '/search', icon: 'search', label: 'Search' },
    { href: '/about', icon: 'info', label: 'About' },
    { href: '/gallery', icon: 'image', label: 'Gallery' },
    { href: '/map', icon: 'location_on', label: 'Map' },
    { href: '#contacts', icon: 'call', label: 'Contacts' },
];

export default function MainNav() {
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
                        {label}
                    </IconLink>
                );
            })}
        </nav>
    );
}

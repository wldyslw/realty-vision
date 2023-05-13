import { useRouter } from 'next/router';
import IconLink from './IconLink';

const links = [
    { href: '/', icon: 'home', label: 'Home' },
    { href: '/search', icon: 'search', label: 'Search' },
    { href: '/', icon: 'info', label: 'About' },
    { href: '/', icon: 'image', label: 'Gallery' },
    { href: '/', icon: 'location_on', label: 'Map' },
    { href: '/', icon: 'call', label: 'Contact Us' },
];

export default function MainNav() {
    const router = useRouter();

    return (
        <nav className="flex overflow-y-scroll md:flex-col">
            {links.map(({ href, icon, label }) => {
                return (
                    <IconLink
                        key={icon}
                        href={href}
                        icon={icon}
                        collapsed={router.pathname !== '/'}
                    >
                        {label}
                    </IconLink>
                );
            })}
        </nav>
    );
}

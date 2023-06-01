import { useRouter } from 'next/router';
import { memo, useCallback } from 'react';
import IconLink from './IconLink';

function Contacts() {
    const rounter = useRouter();

    const handleDissmiss = useCallback(() => {
        rounter.push({ hash: null });
    }, [rounter]);

    return (
        <div
            id="backdrop"
            className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-32 lg:justify-start"
        >
            <div
                onClick={handleDissmiss}
                className="absolute inset-0 cursor-pointer bg-base-darker/70 text-typo-secondary backdrop-blur-md transition-colors hover:text-typo-primary"
            >
                <span className="absolute right-0 top-0 p-8">
                    <span className="material-symbols-rounded">close</span>
                </span>
            </div>
            <div
                id="modal"
                className="z-10 min-h-[50%] w-full max-w-3xl overflow-hidden rounded-3xl bg-base"
            >
                <a href="https://goo.gl/maps/Gdz98yEjqY2pp3YN8?coh=178571&entry=tt">
                    <img src="/map.png" alt="" className="cursor-pointer" />
                </a>
                <div className="p-8">
                    <h1 className="text-3xl font-bold">Contact Us</h1>
                    <p className="mb-2 mt-1 text-typo-secondary">
                        <span className="material-symbols-rounded mr-2 text-[1rem]">
                            location_on
                        </span>
                        1 City Hall Square #500, Boston, MA 02201, United States
                    </p>
                    <IconLink
                        icon="mail"
                        href="mailto:user@example.com"
                        className="mr-2"
                    >
                        user@example.com
                    </IconLink>
                    <IconLink icon="phone" href="tel:+1234567890">
                        +1 234 567 890
                    </IconLink>
                </div>
            </div>
        </div>
    );
}

export default memo(Contacts);

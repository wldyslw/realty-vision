import { type AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import useSWR from 'swr';
import { useSpring, a } from '@react-spring/web';
import { Leva } from 'leva';

import Viewer from '@/components/Viewer';
import MainNav from '@/components/MainNav';
import Contacts from '@/components/Contacts';
import fetcher from '@/utils/fetcher';
import { ComplexInfoContext } from '@/utils/contexts';
import type { Complex } from '@/types';

import '@/styles/globals.css';
import { useCallback, useEffect, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

const font = Roboto({ weight: ['400'], subsets: ['latin'] });

let interval: number | null = null;

export default function App({ Component, pageProps, router }: AppProps) {
    const { t } = useTranslation('common');
    const { data, isValidating, error } = useSWR<Complex>('/api/meta', fetcher);
    const [buttonActive, setActive] = useState(false);
    const [splashVisible, setSplashVisible] = useState(true);

    const [style] = useSpring(
        {
            width: router.pathname === '/' ? '15rem' : '4rem',
        },
        [router.pathname]
    );

    useEffect(() => {
        interval = setTimeout(() => {
            setActive(true);
        }, 3000) as unknown as number;
        return () => {
            if (interval !== null) {
                clearInterval(interval);
            }
        };
    }, []);

    const openSplash = useCallback(() => {
        setSplashVisible(false);
    }, []);

    return (
        <ComplexInfoContext.Provider
            value={{ data: data ?? null, isLoading: isValidating, error }}
        >
            <div
                className={`absolute inset-0 z-[100000005] overflow-hidden transition-transform ${
                    splashVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <video
                    autoPlay
                    muted
                    loop
                    className="h-full w-full object-cover object-center"
                >
                    <source src="/promo.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/60 px-4">
                    <img src="/logo-bg-black.png" alt="Yanay Group Logo" />
                    <button
                        onClick={openSplash}
                        disabled={!buttonActive}
                        className={`mt-8 flex items-center rounded-xl bg-primary/30 px-4 py-2 text-xl drop-shadow-md backdrop-blur transition-transform hover:scale-105 disabled:hover:scale-100`}
                    >
                        <span
                            className={`spinner ${
                                buttonActive ? 'hidden' : 'inline-block'
                            }`}
                        ></span>
                        <span
                            className={`ms-2 transition-colors ${
                                buttonActive
                                    ? 'text-primary-darker'
                                    : 'cursor-not-allowed text-primary-darker/50'
                            }`}
                        >
                            {t('general.start')}
                        </span>
                    </button>
                </div>
            </div>
            <main
                className={`absolute inset-0 flex flex-col-reverse lg:flex-row ${font.className}`}
            >
                <a.div
                    style={style}
                    className={`relative min-w-full shrink-0 bg-base lg:min-w-0`}
                >
                    <MainNav />
                </a.div>
                <div className="relative flex h-full min-h-0 w-full min-w-0 flex-col-reverse overflow-hidden lg:flex-row">
                    {router.asPath.includes('#contacts') && <Contacts />}
                    <Component {...pageProps} />
                    <Viewer />
                </div>
            </main>
            <Leva
                hidden={
                    typeof window !== 'undefined' &&
                    !window.location.hash.includes('#debug')
                }
            />
        </ComplexInfoContext.Provider>
    );
}

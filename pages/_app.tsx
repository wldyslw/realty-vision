import { type AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import useSWR from 'swr';
import { useSpring, a } from '@react-spring/web';

import Viewer from '@/components/Viewer';
import MainNav from '@/components/MainNav';
import fetcher from '@/utils/fetcher';
import { ComplexInfoContext } from '@/utils/contexts';
import type { Complex } from '@/types';

import '@/styles/globals.css';

const font = Roboto({ weight: ['400'], subsets: ['latin'] });

export default function App({ Component, pageProps, router }: AppProps) {
    const { data, isLoading, error } = useSWR<Complex>('/api/meta', fetcher);

    const [style] = useSpring(
        {
            width: router.pathname === '/' ? '15rem' : '4rem',
        },
        [router.pathname]
    );

    return (
        <ComplexInfoContext.Provider
            value={{ data: data ?? null, isLoading, error }}
        >
            <main
                className={`absolute inset-0 flex flex-col-reverse lg:flex-row ${font.className}`}
            >
                <a.div
                    style={style}
                    className={`relative min-w-full shrink-0 bg-base lg:min-w-0`}
                >
                    <MainNav />
                </a.div>
                <div className="flex h-full min-h-0 w-full min-w-0 flex-col-reverse lg:flex-row">
                    <Component {...pageProps} />
                    <Viewer />
                </div>
            </main>
        </ComplexInfoContext.Provider>
    );
}

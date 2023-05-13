import { type AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import useSWR from 'swr';

import Viewer from '@/components/Viewer';
import MainNav from '@/components/MainNav';
import fetcher from '@/utils/fetcher';
import { ComplexInfoContext } from '@/utils/globalContext';
import type { Complex } from '@/types';

import '@/styles/globals.css';

const font = Roboto({ weight: ['400'], subsets: ['latin'] });

export default function App({ Component, pageProps, router }: AppProps) {
    const { data, isLoading, error } = useSWR<Complex>('/api/meta', fetcher);

    return (
        <ComplexInfoContext.Provider
            value={{ data: data ?? null, isLoading, error }}
        >
            <main
                className={`absolute inset-0 flex flex-col-reverse md:flex-row ${font.className}`}
            >
                <div
                    className={`${
                        router.pathname === '/' ? 'md:w-60' : 'md:w-16'
                    } relative w-full shrink-0 dark:bg-gray-800`}
                >
                    <MainNav />
                </div>
                <div className="flex h-full min-h-0 w-full min-w-0 flex-col-reverse md:flex-row">
                    <Component {...pageProps} />
                    <Viewer />
                </div>
            </main>
        </ComplexInfoContext.Provider>
    );
}

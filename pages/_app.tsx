import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';

const font = Roboto({ weight: ['400'], subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={`flex min-h-screen ${font.className}`}>
            <div className="w-0 shrink-0 bg-white"></div>
            <div className="w-full">
                <Component {...pageProps} />
            </div>
        </main>
    );
}

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/icon.png" type="image/png" />
                <script
                    id="dark-mode"
                    dangerouslySetInnerHTML={{ __html: process.env.darkMode }}
                ></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

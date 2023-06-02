import {
    Html,
    Head,
    Main,
    NextScript,
    type DocumentProps,
} from 'next/document';

export default function Document(props: DocumentProps) {
    console.log(`Current locale: ${props.locale}`);
    return (
        <Html lang={props.locale} dir={props.locale === 'he' ? 'rtl' : 'ltr'}>
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

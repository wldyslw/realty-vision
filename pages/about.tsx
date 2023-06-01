import Head from 'next/head';
import { memo } from 'react';

function About() {
    return (
        <>
            <Head>
                <title>About | The Building</title>
            </Head>
        </>
    );
}

export default memo(About);

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        darkMode: fs.readFileSync('./public/dark-mode.js').toString(),
    },
};

module.exports = nextConfig;

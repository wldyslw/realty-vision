/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const nextTranslate = require('next-translate-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        darkMode: fs.readFileSync('./dark-mode.js').toString(),
    },
};

module.exports = nextTranslate(nextConfig);

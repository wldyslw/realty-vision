/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                base: 'rgb(var(--color-base) / <alpha-value>)',
                'base-darker': 'rgb(var(--color-base-darker) / <alpha-value>)',
                'typo-primary':
                    'rgb(var(--color-typo-primary) / <alpha-value>)',
                'typo-secondary':
                    'rgb(var(--color-typo-secondary) / <alpha-value>)',
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                'primary-darker':
                    'rgb(var(--color-primary-darker) / <alpha-value>)',
                'primary-hover':
                    'rgb(var(--color-primary-hover) / <alpha-value>)',
                'primary-active':
                    'rgb(var(--color-primary-active) / <alpha-value>)',
            },
            width: {
                128: '32rem',
            },
        },
    },
    plugins: [],
};

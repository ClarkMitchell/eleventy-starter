module.exports = {
    future: 'all',
    purge: ['./src/**/*.html', './src/**/*.md'],
    theme: {
        extend: {
            inset: {
                '-20': '-5rem',
            },
            margin: {
                '-1px': '-1px',
            },
        },
    },
    variants: {
        inset: ['responsive', 'focus'],
    },
    plugins: [require('@tailwindcss/typography')],
};

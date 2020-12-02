const purgecss = require('@fullhuman/postcss-purgecss');

const plugins = [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-100vh-fix'),
    require('cssnano')({
        preset: 'default',
    }),
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(
        purgecss({
            content: ['./dist/**/*.html'],
            extractors: [
                {
                    extractor: class TailwindExtractor {
                        static extract(content) {
                            return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
                        }
                    },
                    extensions: ['css', 'html', 'vue'],
                },
            ],
        }),
    );
}

module.exports = { plugins };

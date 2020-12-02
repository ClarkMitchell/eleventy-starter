const fs = require('fs');
const CleanCSS = require('clean-css');

module.exports = function (config) {
    config.setLiquidOptions({
        dynamicPartials: true,
    });

    // Static assets to pass through
    config.addPassthroughCopy('./src/fonts');
    config.addPassthroughCopy('./src/images');
    config.addPassthroughCopy('./src/styles');
    config.addPassthroughCopy('./src/favicon.ico');
    config.addPassthroughCopy('./src/manifest.json');
    config.addPassthroughCopy('./src/robots.txt');

    config.addFilter('cssmin', (code) => new CleanCSS({}).minify(code).styles);

    // 404
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync('dist/404.html');

                browserSync.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    return {
        dir: {
            input: 'src',
            output: 'build',
            data: 'data',
            includes: 'includes',
        },
        passthroughFileCopy: true,
        templateFormats: ['html', 'md', 'liquid'],
        htmlTemplateEngine: 'liquid',
        dataTemplateEngine: 'liquid',
        markdownTemplateEngine: 'liquid',
    };
};

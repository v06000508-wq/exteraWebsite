const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl({
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader',
        });
        return config;
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
            },
        ],
        dangerouslyAllowSVG: true
    }
});

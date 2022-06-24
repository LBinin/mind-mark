/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.module.rules[3].oneOf.forEach((moduleLoader) => {
      if (Array.isArray(moduleLoader.use)) {
        moduleLoader.use.forEach((item) => {
          if (item.loader?.includes('css-loader') && !item.loader?.includes('postcss-loader')) {
            item.options.modules.exportLocalsConvention = 'camelCaseOnly'
          }
        })
      }
    })
    return config
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  distDir: 'build',
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
    };
  },
}

module.exports = nextConfig

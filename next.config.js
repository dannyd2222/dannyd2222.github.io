/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  distDir: 'build',
  /** Con `output: 'export'` non c’è server di ottimizzazione: `next/image` richiede `unoptimized` (o un loader custom). */
  images: {
    unoptimized: true,
  },
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
    };
  },
}

module.exports = nextConfig

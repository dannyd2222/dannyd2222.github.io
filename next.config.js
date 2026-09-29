/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  // Dev uses default `.next`. CI sets STATIC_EXPORT=1 so the static site lands in `build/` for Pages.
  ...(process.env.STATIC_EXPORT === '1' ? { distDir: 'build' } : {}),
  /** Con `output: 'export'` non c’è server di ottimizzazione: `next/image` richiede `unoptimized` (o un loader custom). */
  images: {
    unoptimized: true,
  },
  exportPathMap: function () {
    return {
      '/': { page: '/' },
      '/portfolio': { page: '/portfolio' },
      '/login': { page: '/login' },
      '/admin': { page: '/admin' },
      '/auth/callback': { page: '/auth/callback' },
    };
  },
}

module.exports = nextConfig

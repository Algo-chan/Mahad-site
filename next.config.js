/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-rendered app: requires a Node runtime (next start / next build).
  // Do NOT switch this back to output: 'export' — the admin panel and live
  // news publishing depend on runtime API routes + a writable filesystem.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

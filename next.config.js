/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/dashboard/tests',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig

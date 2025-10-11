/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
        port: '',
        pathname: '/**',
      }, 
      {
        protocol: 'https',
        hostname: 'shutterstock.com',
        port: '',
        pathname: '/**',
      }
      
    ]
  }
};

export default nextConfig;

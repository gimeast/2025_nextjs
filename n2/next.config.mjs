/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', // 이미지 프로토콜 (http, https)
        hostname: 'localhost', // 이미지 호스트 이름 (IP 주소 또는 도메인)
        port: '8080', // 포트 번호 (필요한 경우)
        pathname: '/**', // 허용할 경로 패턴 (모든 경로 허용 시 '/**')
      },
    ],
  },
};

export default nextConfig;

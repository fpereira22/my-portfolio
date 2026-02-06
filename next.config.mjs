/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración actual
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // 👇 AÑADIR ESTA SECCIÓN 👇
  async headers() {
    return [
      {
        // Aplicamos el header de tipo XML estrictamente al sitemap
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8', 
          },
        ],
      },
    ];
  },
  // 👆 FIN DE LA SECCIÓN AÑADIDA 👆
}

export default nextConfig

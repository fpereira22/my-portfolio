// app/sitemap.js

// 🚨 AÑADE ESTAS LÍNEAS AL INICIO DEL ARCHIVO 🚨
export const dynamic = 'force-dynamic'; 
export const revalidate = 0; // Desactiva completamente la caché para este endpoint
export const dynamicParams = true;
// -----------------------------------------------------

export default function sitemap() {
  return [
    {
      url: 'https://fpereiradev.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}

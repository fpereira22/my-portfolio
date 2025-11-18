// app/sitemap.js

export default function sitemap() {
  return [
    {
      url: 'https://fpereiradev.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Si tienes otras páginas, agrégalas aquí:
    /*
    {
      url: 'https://fpereiradev.vercel.app/proyectos',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    */
  ]
}

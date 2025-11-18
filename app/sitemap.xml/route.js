// pages/sitemap.xml.js

const SITEMAP_CONTENT = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fpereiradev.vercel.app/</loc>
    <lastmod>2025-11-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

// Esta función es necesaria para que Next.js compile la página
function Sitemap() {
  // El contenido se genera y envía directamente abajo, así que no necesitamos renderizar nada.
}

// Esta función corre en el servidor y nos permite enviar directamente la respuesta XML.
export async function getServerSideProps({ res }) {
  // 1. Forzar el Content-Type a XML (lo que fallaba antes)
  res.setHeader('Content-Type', 'application/xml');
  
  // 2. Escribir el contenido XML limpio
  res.write(SITEMAP_CONTENT);
  
  // 3. Finalizar la respuesta
  res.end();

  return {
    props: {}, // Siempre debe retornar props
  };
}

export default Sitemap;

import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
}

const defaultSEO = {
  title: 'Charl!deas — Productos digitales para negocios reales',
  description: 'Digitalizamos negocios y creamos landing pages claras para marcas y servicios. Sistemas web, PWAs y landings que organizan pedidos, finanzas, nutrición y productividad en la vida real.',
  image: '/logo-charlideas.svg',
  url: 'https://charlideas.com', // TODO: Actualizar con URL real
  type: 'website',
  siteName: 'Charl!deas',
};

export const SEO = ({ 
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
  siteName = defaultSEO.siteName,
}: SEOProps) => {
  const fullTitle = title === defaultSEO.title ? title : `${title} | ${defaultSEO.siteName}`;
  const fullImage = image.startsWith('http') ? image : `${defaultSEO.url}${image}`;
  const fullUrl = url.startsWith('http') ? url : `${defaultSEO.url}${url}`;

  useEffect(() => {
    // Actualizar título
    document.title = fullTitle;

    // Función helper para crear o actualizar meta tags
    const setMetaTag = (attr: string, value: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, value);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Meta tags básicos
    setMetaTag('name', 'description', description);
    
    // Open Graph
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:image', fullImage);
    setMetaTag('property', 'og:site_name', siteName);
    
    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:url', fullUrl);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImage);
    
    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // Structured Data JSON-LD
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Charl!deas',
      description: defaultSEO.description,
      url: defaultSEO.url,
      logo: `${defaultSEO.url}/logo-charlideas.svg`,
      sameAs: [
        // TODO: Agregar URLs de redes sociales
      ],
    };

    // Remover script anterior si existe
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Agregar nuevo script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [fullTitle, description, fullImage, fullUrl, type, siteName]);

  return null;
};

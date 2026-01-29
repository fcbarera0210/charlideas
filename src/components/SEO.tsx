import { useEffect } from 'react';

export const SEO = () => {
  useEffect(() => {
    // Actualizar título si es necesario
    document.title = 'Charl!deas - Digitalización de negocios y landings';
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Charl!deas - Digitalizamos tu negocio y tu marca. Sistemas web, aplicaciones de gestión y landing pages de alto impacto.';
      document.head.appendChild(meta);
    } else {
      metaDescription.setAttribute('content', 'Charl!deas - Digitalizamos tu negocio y tu marca. Sistemas web, aplicaciones de gestión y landing pages de alto impacto.');
    }
  }, []);

  return null;
};

import { useEffect } from "react";
import { useLocation } from "wouter";

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
}

export function SEO({ title, description, schema }: SEOProps) {
  const [location] = useLocation();

  useEffect(() => {
    // Update Title
    const fullTitle = `${title} | JJ Plumbing Services and Tree Felling`;
    document.title = fullTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update Open Graph tags if they exist (simplification for brevity)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    // Fire GA Pageview
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: location,
        page_title: fullTitle
      });
    }

    // Handle Schema Injection
    let schemaScript = document.getElementById('page-schema');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'page-schema';
        schemaScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [title, description, schema, location]);

  return null;
}

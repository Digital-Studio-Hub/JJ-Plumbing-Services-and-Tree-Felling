import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SEO } from "@/components/seo/SEO";

export default function Gallery() {
  const images = [
    { src: "/images/hero.png", alt: "Contractor Team" },
    { src: "/images/plumbing-installations.png", alt: "Plumbing Installation" },
    { src: "/images/plumbing-maintenance.png", alt: "Plumbing Maintenance" },
    { src: "/images/tree-felling.png", alt: "Tree Felling" },
    { src: "/images/site-clearing.png", alt: "Site Clearing" },
    { src: "/images/farm-clearing.png", alt: "Farm Clearing" },
    { src: "/images/about.png", alt: "Team Equipment" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Our Work Gallery" 
        description="View our recent projects across plumbing, tree felling, and site clearing."
      />
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gray-900 text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Work</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Visual proof of our capabilities in the field.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((img, i) => (
                <div key={i} className="aspect-video relative rounded-xl overflow-hidden shadow-sm group">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-bold">{img.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

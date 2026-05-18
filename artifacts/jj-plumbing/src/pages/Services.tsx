import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SEO } from "@/components/seo/SEO";
import { Link } from "wouter";
import { Droplet, Wrench, Trees, Map, Tractor, ArrowRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      id: "plumbing-installations",
      title: "Plumbing Installations",
      desc: "Professional installation of geysers, pipes, bathrooms, and full residential/commercial systems.",
      icon: <Droplet className="w-8 h-8" />,
      color: "blue",
      img: "/images/plumbing-installations.png"
    },
    {
      id: "plumbing-maintenance",
      title: "Plumbing Maintenance",
      desc: "Fast, reliable repairs for leaks, blockages, burst pipes, and general system upkeep.",
      icon: <Wrench className="w-8 h-8" />,
      color: "blue",
      img: "/images/plumbing-maintenance.png"
    },
    {
      id: "tree-felling",
      title: "Tree Felling",
      desc: "Safe removal of trees of any size. Hazardous tree management and precision dropping.",
      icon: <Trees className="w-8 h-8" />,
      color: "green",
      img: "/images/tree-felling.png"
    },
    {
      id: "site-clearing",
      title: "Site Clearing",
      desc: "Heavy machinery clearing for construction sites, vacant plots, and property development.",
      icon: <Map className="w-8 h-8" />,
      color: "green",
      img: "/images/site-clearing.png"
    },
    {
      id: "farm-clearing",
      title: "Farm Clearing",
      desc: "Large-scale agricultural clearing, invasive species removal, and land preparation.",
      icon: <Tractor className="w-8 h-8" />,
      color: "brown",
      img: "/images/farm-clearing.png"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Our Services" 
        description="Comprehensive plumbing, tree felling, and land clearing services. We handle residential, commercial, and agricultural projects."
      />
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-gray-300">
              Specialized divisions for distinct needs. From precise indoor plumbing to heavy-duty outdoor clearing.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s) => (
                <Link key={s.id} href={`/services/${s.id}`} className="group block h-full">
                  <div className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col border-t-4 ${
                    s.color === 'blue' ? 'border-[#2563EB]' : s.color === 'green' ? 'border-[#1F5E3B]' : 'border-[#7A4E2A]'
                  }`}>
                    <div className="h-56 relative overflow-hidden">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="p-8 flex-grow flex flex-col">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${
                        s.color === 'blue' ? 'bg-blue-50 text-[#2563EB]' : s.color === 'green' ? 'bg-green-50 text-[#1F5E3B]' : 'bg-orange-50 text-[#7A4E2A]'
                      }`}>
                        {s.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">{s.title}</h2>
                      <p className="text-gray-600 mb-6 flex-grow">{s.desc}</p>
                      <span className={`font-bold flex items-center gap-2 group-hover:gap-3 transition-all ${
                        s.color === 'blue' ? 'text-[#2563EB]' : s.color === 'green' ? 'text-[#1F5E3B]' : 'text-[#7A4E2A]'
                      }`}>
                        Learn More <ArrowRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </Link>
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

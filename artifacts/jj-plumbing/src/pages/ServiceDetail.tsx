import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SEO } from "@/components/seo/SEO";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { QuoteRequestInputService } from "@workspace/api-client-react";
import { useParams } from "wouter";
import NotFound from "./not-found";
import { CheckCircle } from "lucide-react";

const serviceData: Record<string, any> = {
  "plumbing-installations": {
    title: "Plumbing Installations",
    enumValue: QuoteRequestInputService["plumbing-installations"],
    theme: "blue",
    img: "/images/plumbing-installations.png",
    heroText: "Expert plumbing installations for new builds and renovations.",
    content: [
      "We provide comprehensive plumbing installation services for residential and commercial properties. Our team ensures that every pipe, fixture, and geyser is installed perfectly to code.",
      "A poor installation can cost thousands in future water damage. We do it right the first time."
    ],
    bullets: ["Geyser installations & replacements", "Bathroom renovations", "Kitchen plumbing setups", "Main water supply lines", "Commercial plumbing systems"]
  },
  "plumbing-maintenance": {
    title: "Plumbing Maintenance",
    enumValue: QuoteRequestInputService["plumbing-maintenance"],
    theme: "blue",
    img: "/images/plumbing-maintenance.png",
    heroText: "Fast, reliable repairs to keep your water systems flowing.",
    content: [
      "Plumbing emergencies don't wait for convenient times. We handle routine maintenance and urgent repairs with speed and professionalism.",
      "From a dripping tap to a burst main, our diagnostic tools and experienced plumbers will find the fault and fix it permanently."
    ],
    bullets: ["Leak detection and repair", "Drain unblocking", "Geyser element repairs", "Valve replacements", "Preventative maintenance contracts"]
  },
  "tree-felling": {
    title: "Tree Felling",
    enumValue: QuoteRequestInputService["tree-felling"],
    theme: "green",
    img: "/images/tree-felling.png",
    heroText: "No matter how big the tree is, we can handle it.",
    content: [
      "Tree felling is dangerous work that requires immense precision, specialized equipment, and strict safety protocols. We drop trees safely, avoiding damage to nearby structures.",
      "Whether it's a dead tree threatening your roof or clearing space for a new development, our chainsaw operators are masters of their craft."
    ],
    bullets: ["Large hazardous tree removal", "Precision dropping in tight spaces", "Stump poisoning/removal", "Branch trimming and shaping", "Post-felling cleanup"]
  },
  "site-clearing": {
    title: "Site Clearing",
    enumValue: QuoteRequestInputService["site-clearing"],
    theme: "green",
    img: "/images/site-clearing.png",
    heroText: "Heavy-duty clearing for construction and development.",
    content: [
      "Before you can build, you need a clean slate. Our site clearing division brings the heavy machinery needed to strip a plot of vegetation, rubble, and obstacles.",
      "We serve property developers, construction companies, and private owners looking to prepare land rapidly."
    ],
    bullets: ["Vegetation and scrub removal", "Rubble and debris clearing", "Levelling preparation", "Machinery operator services", "Waste removal from site"]
  },
  "farm-clearing": {
    title: "Farm Clearing",
    enumValue: QuoteRequestInputService["farm-clearing"],
    theme: "brown",
    img: "/images/farm-clearing.png",
    heroText: "Massive scale agricultural land clearing.",
    content: [
      "Farmers and estate managers need serious firepower to clear large tracts of land. We tackle invasive alien vegetation, old orchards, and overgrown bushveld.",
      "Our agricultural clearing returns useless land to productive use, improving grazing capacity and land value."
    ],
    bullets: ["Alien vegetation eradication", "Large scale bush clearing", "Firebreak creation", "Fence line clearing", "Post-harvest field prep"]
  }
};

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  
  if (!id || !serviceData[id]) {
    return <NotFound />;
  }

  const service = serviceData[id];
  const isPlumbing = service.theme === "blue";
  const themeColor = isPlumbing ? "bg-[#2563EB]" : service.theme === "green" ? "bg-[#1F5E3B]" : "bg-[#7A4E2A]";
  const textColor = isPlumbing ? "text-[#2563EB]" : service.theme === "green" ? "text-[#1F5E3B]" : "text-[#7A4E2A]";

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={service.title} 
        description={service.heroText}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": service.title,
          "provider": {
            "@type": "LocalBusiness",
            "name": "JJ Plumbing Services and Tree Felling"
          }
        }}
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero */}
        <section className={`py-20 text-white relative overflow-hidden ${themeColor}`}>
          <div className="absolute inset-0 z-0">
            <img 
              src={service.img} 
              alt={service.title} 
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
              loading="eager"
            />
          </div>
          <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-xl md:text-2xl font-medium opacity-90">{service.heroText}</p>
          </div>
        </section>

        {/* Content & Form */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-7 space-y-8">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full rounded-xl shadow-lg mb-8"
                  loading="lazy"
                />
                
                <div className="prose prose-lg max-w-none text-gray-700">
                  {service.content.map((p: string, i: number) => (
                    <p key={i} className="mb-6 leading-relaxed">{p}</p>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 mt-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Do</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className={`w-6 h-6 shrink-0 ${textColor}`} />
                        <span className="font-medium text-gray-800">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <QuoteForm 
                  defaultService={service.enumValue} 
                  buttonText={`Request ${service.title} Quote`}
                  className="shadow-2xl border-t-8"
                />
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}

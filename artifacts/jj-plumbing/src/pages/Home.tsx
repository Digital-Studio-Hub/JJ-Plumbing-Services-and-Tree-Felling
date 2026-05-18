import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { TrustStrip } from "@/components/ui/TrustStrip";
import { SEO } from "@/components/seo/SEO";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Wrench, Trees, Map, Droplet, ArrowRight, ShieldCheck, Clock, CheckCircle } from "lucide-react";

export default function Home() {
  const handleCTAClick = (cta: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "cta_click", { cta });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Plumbing & Tree Felling Contractors" 
        description="Professional plumbing installations, tree felling, and site clearing services for homes, businesses, and farms in South Africa. Trusted contractors."
      />
      <Navbar />
      
      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative bg-gray-900 text-white py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero.png" 
              alt="Professional contractor team with service truck" 
              className="w-full h-full object-cover opacity-30"
              loading="eager"
              decoding="sync"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 mb-6 text-sm font-semibold tracking-wide">
                <ShieldCheck className="w-4 h-4" /> Fully Insured & Certified
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Plumbing, Tree Felling & Site Clearing Services <span className="text-primary">You Can Trust</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed">
                From delicate residential plumbing repairs to heavy-duty farm clearing. We bring workshop confidence and contractor-grade execution to every job.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full font-bold text-lg py-6" onClick={() => handleCTAClick('hero_quote')}>
                    Request a Free Quote
                  </Button>
                </Link>
                <Link href="/services" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full font-bold text-lg py-6 bg-white/10 hover:bg-white/20 border-white/20 text-white" onClick={() => handleCTAClick('hero_services')}>
                    View Our Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <TrustStrip />

        {/* SERVICES OVERVIEW */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contractor-Grade Capabilities</h2>
              <p className="text-gray-600 text-lg">We manage both sides of your property maintenance: internal plumbing systems and external site clearing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Plumbing Section */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-gray-50 rounded-xl p-8 border-t-4 border-[#2563EB] h-full transition-transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="w-14 h-14 bg-blue-100 text-[#2563EB] rounded-lg flex items-center justify-center mb-6">
                    <Droplet className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Plumbing Division</h3>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-gray-900">Installations</strong>
                        <span className="text-sm text-gray-600">Geysers, pipes, bathrooms</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-gray-900">Maintenance</strong>
                        <span className="text-sm text-gray-600">Leaks, blocks, diagnostics</span>
                      </div>
                    </li>
                  </ul>
                  <Link href="/services/plumbing-installations" className="text-[#2563EB] font-bold flex items-center gap-2 hover:gap-3 transition-all" onClick={() => handleCTAClick('plumbing_card_link')}>
                    Explore Plumbing <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Clearing Section */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link href="/services/tree-felling" className="group block h-full">
                  <div className="bg-gray-50 rounded-xl overflow-hidden border-t-4 border-[#1F5E3B] h-full transition-transform hover:-translate-y-1 hover:shadow-lg flex flex-col" onClick={() => handleCTAClick('tree_felling_card')}>
                    <div className="h-48 relative overflow-hidden">
                      <img src="/images/tree-felling.png" alt="Tree Felling" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#1F5E3B] transition-colors">Tree Felling</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">No tree is too big. Safe, professional removal of hazardous or unwanted trees.</p>
                      <span className="text-[#1F5E3B] font-bold text-sm flex items-center gap-2">View Details <ArrowRight className="w-4 h-4" /></span>
                    </div>
                  </div>
                </Link>

                <Link href="/services/site-clearing" className="group block h-full">
                  <div className="bg-gray-50 rounded-xl overflow-hidden border-t-4 border-[#1F5E3B] h-full transition-transform hover:-translate-y-1 hover:shadow-lg flex flex-col" onClick={() => handleCTAClick('site_clearing_card')}>
                    <div className="h-48 relative overflow-hidden">
                      <img src="/images/site-clearing.png" alt="Site Clearing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#1F5E3B] transition-colors">Site & Farm Clearing</h3>
                      <p className="text-gray-600 text-sm mb-4 flex-grow">Heavy machinery clearing for construction sites, plots, and large agricultural land.</p>
                      <span className="text-[#1F5E3B] font-bold text-sm flex items-center gap-2">View Details <ArrowRight className="w-4 h-4" /></span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-20 bg-[#F5F7FA]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <img src="/images/about.png" alt="Contractor Team" className="rounded-xl shadow-xl w-full" loading="lazy" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Built on Reliability and Hard Work</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  We don't do half-measures. Whether we're fixing a leak in your home or bringing in the heavy machinery to clear a hectare of bush, our approach is the same: show up on time, do the job right, and clean up afterwards.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-[#1F5E3B]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Prompt Response</h4>
                      <p className="text-sm text-gray-600 mt-1">We know delays cost money.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white shadow flex items-center justify-center shrink-0">
                      <Wrench className="w-6 h-6 text-[#2563EB]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Right Equipment</h4>
                      <p className="text-sm text-gray-600 mt-1">Proper tools for every scale.</p>
                    </div>
                  </div>
                </div>
                <Link href="/about">
                  <Button variant="outline" className="font-bold" onClick={() => handleCTAClick('home_about_link')}>
                    Read Our Story
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER & FORM */}
        <section className="py-20 bg-gray-900 text-white relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Need plumbing work, tree removal, or site clearing done properly?</h2>
                <p className="text-xl text-gray-300 mb-8">Get a fast, no-obligation quote from our experienced team. We service residential, commercial, and agricultural properties.</p>
                <div className="flex items-center gap-4 text-gray-300">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                  <span>Licensed • Insured • Guaranteed Workmanship</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-3xl"></div>
                <QuoteForm className="relative z-10 text-left text-gray-900" />
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

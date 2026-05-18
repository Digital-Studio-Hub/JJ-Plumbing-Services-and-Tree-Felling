import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SEO } from "@/components/seo/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="About Us" 
        description="Learn more about JJ Plumbing Services and Tree Felling. A trusted multi-service contractor serving South Africa with reliable execution."
      />
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About JJ Plumbing & Tree Felling</h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                We are a dedicated team of professionals who believe in getting our hands dirty to get the job done right. We handle the heavy lifting so you don't have to.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story & Approach</h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    JJ Plumbing Services and Tree Felling was built on a simple premise: property owners need contractors they can actually rely on. Whether it's an emergency pipe burst in the middle of the night or clearing acres of invasive bush on a farm, execution is everything.
                  </p>
                  <p>
                    We bring together specialized teams. Our plumbing division handles intricate installations and diagnostics with precision. Meanwhile, our clearing division brings heavy machinery, chainsaws, and raw manpower to tackle massive outdoor projects safely.
                  </p>
                  <p>
                    <strong>We don't cut corners.</strong> We respect your property, your time, and your budget. When you hire us, you're hiring a team that takes immense pride in their craftsmanship and work ethic.
                  </p>
                </div>
                
                <div className="mt-10">
                  <Link href="/contact">
                    <Button size="lg" className="font-bold">Work With Us</Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-primary/10 translate-x-4 translate-y-4 rounded-xl -z-10"></div>
                <img src="/images/about.png" alt="Our Team" className="w-full h-auto rounded-xl shadow-lg relative z-10" loading="lazy" />
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

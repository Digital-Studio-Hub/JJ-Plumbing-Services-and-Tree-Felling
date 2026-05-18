import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SEO } from "@/components/seo/SEO";
import { MapPin } from "lucide-react";
import { QuoteForm } from "@/components/forms/QuoteForm";

export default function Areas() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Areas We Serve" 
        description="Looking for plumbing, tree felling, or site clearing near you? We operate across major regions in South Africa."
      />
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gray-900 text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Areas We Serve</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Providing contractor-grade services across the region.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Coverage</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We deploy our teams quickly and efficiently. Whether you need a plumber near you or a heavy machinery team dispatched to a remote farm, we have the logistics to execute.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-bold text-gray-900">Residential Areas</span>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-bold text-gray-900">Commercial & Industrial Parks</span>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#7A4E2A] shrink-0" />
                    <span className="font-bold text-gray-900">Agricultural Land & Farms</span>
                  </div>
                </div>
              </div>
              <div>
                <QuoteForm buttonText="Check Availability" />
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

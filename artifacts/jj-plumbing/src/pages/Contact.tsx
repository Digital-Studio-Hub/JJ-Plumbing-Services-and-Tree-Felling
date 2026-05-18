import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { SEO } from "@/components/seo/SEO";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const handlePhoneClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "phone_click");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Contact Us" 
        description="Request a free quote for plumbing, tree felling, or site clearing. Contact JJ Plumbing Services today."
      />
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gray-900 text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to start your project? Get in touch for a fast, no-obligation quote.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
              
              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Direct Contact</h3>
                  
                  <div className="space-y-6">
                    <a 
                      href="tel:+27820754713" 
                      onClick={handlePhoneClick}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors text-primary group-hover:text-white">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Call Us</p>
                        <p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">082 075 4713</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Operating Area</p>
                        <p className="text-base font-bold text-gray-900">South Africa</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-8 text-white shadow-xl">
                  <h3 className="text-xl font-bold mb-4">Emergency Plumbing?</h3>
                  <p className="text-gray-300 mb-6 text-sm">Don't wait for an email reply. Call us directly for urgent plumbing matters.</p>
                  <a 
                    href="tel:+27820754713" 
                    onClick={handlePhoneClick}
                    className="block w-full py-4 bg-white text-gray-900 text-center font-bold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              <div className="lg:col-span-8">
                <QuoteForm buttonText="Submit Request" />
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

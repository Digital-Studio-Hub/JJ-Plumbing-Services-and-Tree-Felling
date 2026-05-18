import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Terms & Conditions" description="Terms & Conditions for JJ Plumbing Services and Tree Felling" />
      <Navbar />
      <WhatsAppButton />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-3xl prose prose-gray">
        <h1>Terms & Conditions</h1>
        <p>Last updated: {new Date().getFullYear()}</p>
        
        <h2>1. Services</h2>
        <p>JJ Plumbing Services and Tree Felling provides contracting services as agreed upon in formal quotes. All work is subject to site inspection.</p>
        
        <h2>2. Quotes and Estimates</h2>
        <p>Quotes provided via the website form are estimates based on provided information. Final pricing may be adjusted after physical site inspection.</p>
        
        <h2>3. Liability</h2>
        <p>While we are fully insured and take utmost care, we require clients to clearly mark underground services (cables, hidden pipes) before heavy site clearing or stump removal commences.</p>
        
        <h2>4. Payment</h2>
        <p>Payment terms will be stipulated on the official invoice. Standard contracting terms apply.</p>
      </main>
      <Footer />
    </div>
  );
}

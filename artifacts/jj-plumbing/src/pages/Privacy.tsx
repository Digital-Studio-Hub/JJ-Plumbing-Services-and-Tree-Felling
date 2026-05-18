import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/seo/SEO";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Privacy Policy" description="Privacy Policy for JJ Plumbing Services and Tree Felling" />
      <Navbar />
      <WhatsAppButton />
      <main className="flex-grow container mx-auto px-4 py-20 max-w-3xl prose prose-gray">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>At JJ Plumbing Services and Tree Felling, we respect your privacy and are committed to protecting your personal data.</p>
        
        <h2>Information We Collect</h2>
        <p>We may collect basic contact information (name, phone number, email address, physical address) when you request a quote or contact us for services.</p>
        
        <h2>How We Use Your Information</h2>
        <p>We use your data solely to:</p>
        <ul>
          <li>Provide the requested quotes and services</li>
          <li>Communicate with you regarding jobs</li>
          <li>Send administrative information (invoices, receipts)</li>
        </ul>
        
        <h2>Analytics</h2>
        <p>This website uses Google Analytics to track generalized traffic data to improve our site structure. This data is anonymized.</p>
        
        <h2>Data Protection</h2>
        <p>We implement security measures to maintain the safety of your personal information. We do not sell or trade your data to outside parties.</p>
      </main>
      <Footer />
    </div>
  );
}

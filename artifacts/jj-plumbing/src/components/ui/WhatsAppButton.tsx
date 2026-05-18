import { FaWhatsapp } from "react-icons/fa6";
import { useEffect, useState } from "react";

export function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "whatsapp_click");
    }
  };

  return (
    <a
      href="https://wa.me/27000000000?text=Hi%20JJ%20Plumbing%2C%20I%27d%20like%20a%20quote"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="fixed z-50 rounded-full bg-[#25D366] text-white p-4 shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 print:hidden group"
      style={{
        bottom: "max(16px, env(safe-area-inset-bottom, 16px))",
        right: "16px",
      }}
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40 motion-reduce:hidden" />
      <FaWhatsapp className="w-8 h-8 relative z-10" />
    </a>
  );
}

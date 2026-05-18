import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 mb-12">
          {/* Column 1: Business Info */}
          <div className="lg:col-span-1 space-y-4">
            <img
              src="/brand/main-logo.png"
              alt="JJ Plumbing Services Logo"
              className="h-12 w-auto bg-white p-2 rounded"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional plumbing installations, maintenance, tree felling, and site clearing services across South Africa.
            </p>
            <p className="text-sm font-medium text-gray-300">
              © {new Date().getFullYear()} JJ Plumbing Services and Tree Felling. All rights reserved.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Lekker Network (Center) */}
          <div className="lg:col-span-1 flex flex-col items-center justify-center text-center space-y-2 lg:border-l lg:border-r lg:border-gray-800 py-4 lg:py-0">
            <a
              href="https://lekker.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2"
            >
              <img
                src="/brand/lekker-logo.png"
                alt="Lekker Network"
                className="h-10 w-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest group-hover:text-gray-400 transition-colors">
                Powered by Lekker Network
              </span>
            </a>
          </div>

          {/* Column 4: Verified Badge */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start justify-center text-center lg:text-left space-y-2 lg:pl-4">
            <a
              href="https://lekker.network/the-lekker-network-verified"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center lg:items-start gap-2"
            >
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Verified Badge
              </span>
              <img
                src="/brand/lekker-badge.png"
                alt="Lekker Network Verified Badge"
                className="h-12 w-auto"
              />
              <span className="text-[11px] text-gray-500 font-medium group-hover:text-gray-400 transition-colors">
                Lekker Network Verified
              </span>
            </a>
          </div>

          {/* Column 5: Legal Links */}
          <div className="lg:col-span-1 lg:text-right">
            <h3 className="text-lg font-bold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile bottom row visual alignment check */}
        <div className="md:hidden border-t border-gray-800 pt-6 mt-6 flex flex-col gap-4 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} JJ Plumbing Services and Tree Felling</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { CheckCircle2 } from "lucide-react";

export function TrustStrip() {
  return (
    <div className="bg-gray-900 text-white py-4 border-b-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm md:text-base font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Residential Properties</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Commercial Sites</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#7A4E2A]" />
            <span>Farms & Estates</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Fully Insured & Capable</span>
          </div>
        </div>
      </div>
    </div>
  );
}

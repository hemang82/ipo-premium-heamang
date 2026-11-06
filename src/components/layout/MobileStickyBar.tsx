import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface MobileStickyBarProps {
  registrarUrl?: string;
  ipoName?: string;
}

export function MobileStickyBar({ registrarUrl = "https://allotmentstatus.com", ipoName }: MobileStickyBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-line p-3 px-4 flex items-center justify-between gap-3 shadow-2xl">
      <Link
        href="/"
        className="flex items-center justify-center gap-1.5 h-11 px-4 rounded-btn bg-card2 border border-line text-xs font-semibold text-tx active:scale-95 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" />
        All IPOs
      </Link>

      <a
        href={registrarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 h-11 px-4 rounded-btn bg-accent text-accent-foreground text-xs font-semibold active:scale-95 transition-transform shadow-md"
      >
        <CheckCircle2 className="w-4 h-4" />
        Check Allotment
      </a>
    </div>
  );
}

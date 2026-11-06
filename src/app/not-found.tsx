import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-card2 border border-line flex items-center justify-center font-heading font-extrabold text-2xl text-accent mb-6 shadow-inner">
        404
      </div>
      <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-tx tracking-tightest mb-2">
        Page Not Found
      </h1>
      <p className="text-sm text-mut max-w-md mx-auto mb-6">
        The IPO or page you are looking for does not exist or has been moved to another URL.
      </p>
      <Link href="/">
        <Button variant="primary" size="md" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Return to Live IPOs
        </Button>
      </Link>
    </div>
  );
}

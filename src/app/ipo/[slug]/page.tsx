import { notFound, redirect } from "next/navigation";
import { getIpoBySlug } from "@/lib/ipo-service";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function IpoSlugRedirectPage({ params }: PageProps) {
  const resolved = await params;
  const ipo = await getIpoBySlug(resolved.slug);

  if (!ipo) {
    notFound();
  }

  // Canonical 308 permanent redirect to /ipo/[slug]/[symbol]/
  redirect(`/ipo/${ipo.slug}/${ipo.symbol}/`);
}

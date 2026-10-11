import { readdirSync } from "node:fs";
import { join } from "node:path";
import { Deck } from "@/components/Deck";
import { siteUrls } from "@/lib/links";

/** Photos already uploaded to `public/fotos/`: every other slot shows its placeholder. */
function uploadedPhotos(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public", "fotos")).filter((f) => /\.(jpe?g|png|webp|avif|svg)$/i.test(f));
  } catch {
    return [];
  }
}

export default function Page() {
  return <Deck photos={uploadedPhotos()} urls={siteUrls()} />;
}

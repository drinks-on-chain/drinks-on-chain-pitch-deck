/**
 * Outbound links to the other sites of the ecosystem. Never hard-code a host in
 * a component: each environment points elsewhere through `NEXT_PUBLIC_URL_*`.
 */

const clean = (value: string | undefined, fallback: string) => {
  const raw = value?.trim();
  return (raw && /^https?:\/\/[^/\s]+/i.test(raw) ? raw : fallback).replace(/\/+$/, "");
};

export interface SiteUrls {
  /** Landing principal. */
  landing: string;
  /** S2 Marketplace: the bottle passport lives at `/b/{code}`. */
  app: string;
  /** Passport the jury can scan from the deck. */
  passport: string;
}

/** Lot of the demonstration catalogue whose passport is public. */
const DEMO_LOT = "CVJ-2026-SINGANI-004";

export function siteUrls(): SiteUrls {
  const landing = clean(process.env.NEXT_PUBLIC_URL_LANDING, "https://www.drinksonchain.com");
  const app = clean(process.env.NEXT_PUBLIC_URL_APP, "https://app.drinksonchain.com");
  return { landing, app, passport: `${app}/b/${DEMO_LOT}` };
}

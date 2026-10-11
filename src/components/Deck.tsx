"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { UI, type L, type Lang } from "@/content/deck";
import type { SiteUrls } from "@/lib/links";
import { SLIDES } from "./slides";

/**
 * The deck: one 16:9 stage that scales as a piece, keyboard / click / swipe
 * navigation, ES-EN switch, speaker notes and a print view.
 *
 * URL: `#7` opens a slide · `?lang=en` · `?hide=stellar,negocio` drops slides ·
 * `?print` lays every slide on its own page (Ctrl+P saves the PDF).
 */

interface DeckValue {
  lang: Lang;
  photos: ReadonlySet<string>;
  urls: SiteUrls;
  t: (text: L) => string;
}
const DeckContext = createContext<DeckValue | null>(null);
export function useDeck(): DeckValue {
  const value = useContext(DeckContext);
  if (!value) throw new Error("useDeck outside <Deck>");
  return value;
}

/** True while the slide is on screen: its drawings start then. */
const ActiveContext = createContext(false);
export const useSlideActive = () => useContext(ActiveContext);

const PORTRAIT = "(orientation: portrait) and (max-width: 900px)";
const noop = () => () => {};

function usePortrait() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(PORTRAIT);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(PORTRAIT).matches,
    () => false,
  );
}

export function Deck(props: { photos: string[]; urls: SiteUrls }) {
  // The deck reads its state from the URL, so it renders on the client only.
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  return hydrated ? <DeckClient {...props} /> : null;
}

function DeckClient({ photos, urls }: { photos: string[]; urls: SiteUrls }) {
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const print = params.has("print");
  const slides = useMemo(() => {
    const hidden = new Set((params.get("hide") ?? "").split(",").map((s) => s.trim()).filter(Boolean));
    return SLIDES.filter((s) => !hidden.has(s.id));
  }, [params]);
  const last = slides.length - 1;

  const [lang, setLang] = useState<Lang>(() => (params.get("lang") === "en" ? "en" : "es"));
  const [index, setIndex] = useState(() => {
    const n = Number.parseInt(window.location.hash.slice(1), 10);
    return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), last) : 0;
  });
  const [notes, setNotes] = useState(false);
  const [seen, setSeen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const portrait = usePortrait();
  const mode = print ? "print" : portrait ? "stack" : "present";
  const stageRef = useRef<HTMLDivElement>(null);

  const go = useCallback((to: number) => setIndex(Math.min(Math.max(to, 0), last)), [last]);
  const step = useCallback((by: number) => setIndex((i) => Math.min(Math.max(i + by, 0), last)), [last]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (mode === "present") window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${index + 1}`);
  }, [index, mode]);

  useEffect(() => {
    const onHash = () => {
      const n = Number.parseInt(window.location.hash.slice(1), 10);
      if (Number.isFinite(n)) go(n - 1);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [go]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key === "l") setLang((v) => (v === "es" ? "en" : "es"));
      else if (key === "n") setNotes((v) => !v);
      else if (key === "f") void (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen());
      else if (mode !== "present") return;
      else if (["arrowright", "arrowdown", "pagedown", " ", "enter"].includes(key)) step(1);
      else if (["arrowleft", "arrowup", "pageup", "backspace"].includes(key)) step(-1);
      else if (key === "home") go(0);
      else if (key === "end") go(last);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, step, last, mode]);

  // Stack (phone upright): a slide plays its entrance the first time it is scrolled to.
  useEffect(() => {
    if (mode !== "stack" || !stageRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        const found = entries.filter((e) => e.isIntersecting).map((e) => Number((e.target as HTMLElement).dataset.n));
        if (found.length) setSeen((prev) => new Set([...prev, ...found]));
      },
      { threshold: 0.25 },
    );
    stageRef.current.querySelectorAll(".slide").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode, slides]);

  const touch = useRef<{ x: number; y: number } | null>(null);
  const value = useMemo<DeckValue>(() => ({ lang, photos: new Set(photos), urls, t: (text) => text[lang] }), [lang, photos, urls]);
  const t = value.t;
  const isActive = (i: number) => (mode === "print" ? true : mode === "stack" ? seen.has(i) : i === index);
  const printHref = `?${new URLSearchParams({ print: "1", lang, ...(params.get("hide") ? { hide: params.get("hide")! } : {}) })}`;

  return (
    <DeckContext.Provider value={value}>
      <main className="deck" data-mode={mode} data-lang={lang}>
        <div className="viewport">
          <div
            ref={stageRef}
            className="stage"
            onClick={(e) => {
              if (mode === "present" && !(e.target as HTMLElement).closest("a, button")) step(1);
            }}
            onTouchStart={(e) => {
              touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }}
            onTouchEnd={(e) => {
              if (mode !== "present" || !touch.current) return;
              const dx = e.changedTouches[0].clientX - touch.current.x;
              const dy = e.changedTouches[0].clientY - touch.current.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
              touch.current = null;
            }}
          >
            {slides.map((slide, i) => {
              const active = isActive(i);
              const Body = slide.Body;
              return (
                <section
                  key={slide.id}
                  id={slide.id}
                  data-n={i}
                  className={`slide ${slide.className ?? ""}`}
                  data-active={active ? "" : undefined}
                  aria-hidden={mode === "present" && !active}
                  aria-label={`${i + 1} / ${slides.length} · ${t(slide.section)}`}
                >
                  <header className="slide-head">
                    <span className="mark">
                      Drinks <i>on</i> Chain
                    </span>
                    <span>{t(slide.section)}</span>
                  </header>
                  <div className="slide-body">
                    <ActiveContext.Provider value={active}>
                      <Body />
                    </ActiveContext.Provider>
                  </div>
                  <footer className="slide-foot">
                    <span>
                      {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                    </span>
                    <span className="rule rv-line" />
                  </footer>
                </section>
              );
            })}
          </div>
        </div>

        {mode === "present" ? (
          <div className="progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${(index + 1) / slides.length})` }} />
          </div>
        ) : null}

        <nav className="controls" aria-label="Deck">
          {mode === "present" ? (
            <>
              <button type="button" onClick={() => step(-1)} disabled={index === 0} aria-label={t(UI.prev)}>
                ←
              </button>
              <button type="button" onClick={() => step(1)} disabled={index === last} aria-label={t(UI.next)}>
                →
              </button>
              <span className="sep" />
              <button type="button" onClick={() => setNotes((v) => !v)} aria-pressed={notes}>
                {t(UI.notes)}
              </button>
              <span className="sep" />
            </>
          ) : null}
          <button type="button" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label={lang === "es" ? "English" : "Español"}>
            {lang === "es" ? "EN" : "ES"}
          </button>
          <span className="sep" />
          {mode === "print" ? (
            <button type="button" onClick={() => window.print()}>
              {t(UI.pdf)} ↓
            </button>
          ) : (
            <a href={printHref} target="_blank" rel="noreferrer">
              {t(UI.pdf)}
            </a>
          )}
        </nav>

        {notes && mode === "present" ? (
          <aside className="notes">
            <b>{t(UI.notes)}</b>
            {t(slides[index].notes)}
          </aside>
        ) : null}
      </main>
    </DeckContext.Provider>
  );
}

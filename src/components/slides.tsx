"use client";

import qrcode from "qrcode-generator";
import { useMemo, type ComponentType, type CSSProperties, type ReactNode } from "react";
import { BRAND, DECK, PENDING, PHOTOS, UI, type L } from "@/content/deck";
import { useDeck, useSlideActive } from "./Deck";
import { HeroVine } from "./HeroVine";
import { LetterSplit } from "./LetterSplit";

/* Layout of every slide. The words live in src/content/deck.ts. */

export interface SlideDef {
  id: string;
  section: L;
  notes: L;
  className?: string;
  Body: ComponentType;
}

/** Entrance order of a piece inside its slide. */
const d = (n: number) => ({ "--d": n }) as CSSProperties;

const ROMAN = ["I", "II", "III", "IV", "V"];

/* ------------------------------------------------------------------ */
/* Pieces                                                               */
/* ------------------------------------------------------------------ */

function Title({ text, as: Tag = "h2", className = "h2" }: { text: L; as?: "h1" | "h2"; className?: string }) {
  const { t, lang } = useDeck();
  return (
    <Tag className={`${className} rv-title`}>
      <LetterSplit key={lang} text={t(text)} />
    </Tag>
  );
}

function Text({ value, className }: { value: L; className?: string }) {
  const { t } = useDeck();
  if (value === PENDING) return <span className={`pending ${className ?? ""}`}>{t(value)}</span>;
  return className ? <span className={className}>{t(value)}</span> : <>{t(value)}</>;
}

/** A photo of `public/fotos/`, or its labelled blank while it has not been uploaded. */
function Photo({ file, what, className = "", style }: { file: string; what: string; className?: string; style?: CSSProperties }) {
  const { photos, t } = useDeck();
  return (
    <figure className={`photo ${className}`} style={style}>
      {photos.has(file) ? (
        // eslint-disable-next-line @next/next/no-img-element -- static deck: no image optimiser needed
        <img src={`/fotos/${file}`} alt={what} />
      ) : (
        <div className="photo-empty">
          <span className="tag">{t(UI.photo)}</span>
          <span className="what">{what}</span>
          <span className="file mono">public/fotos/{file}</span>
        </div>
      )}
    </figure>
  );
}

function Qr({ url }: { url: string }) {
  const { path, size } = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();
    const n = qr.getModuleCount();
    let p = "";
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) p += `M${c} ${r}h1v1h-1z`;
    return { path: p, size: n };
  }, [url]);
  return (
    <div className="qr">
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={url} shapeRendering="crispEdges">
        <path d={path} fill="#000" />
      </svg>
    </div>
  );
}

function Logo() {
  const { t } = useDeck();
  return (
    <span className="logo">
      <span className="l-eyebrow">{t(BRAND.eyebrow)}</span>
      <span className="l-rule" />
      <span className="l-name">Drinks on Chain</span>
      <span className="l-rule" />
      <span className="l-tag">{t(BRAND.tagline)}</span>
    </span>
  );
}

const ICONS: Record<string, ReactNode> = {
  notebook: (
    <>
      <path d="M12 6h24v36H12z M17 6v36" />
      <path d="M22 15h10 M22 21h10 M22 27h6" strokeWidth="0.9" />
      <path d="M9 12h5 M9 20h5 M9 28h5 M9 36h5" strokeWidth="0.9" />
    </>
  ),
  barrel: (
    <>
      <path d="M14 7h20c5 10 5 24 0 34H14c-5-10-5-24 0-34z" />
      <path d="M11 17h26 M11 31h26 M24 7v34" strokeWidth="0.9" />
      <circle cx="24" cy="24" r="2.2" />
    </>
  ),
  label: (
    <>
      <path d="M8 26 26 8h14v14L22 40z" />
      <circle cx="33" cy="15" r="2.4" />
      <path d="M17 27l6 6 M21 23l6 6" strokeWidth="0.9" />
    </>
  ),
  seal: (
    <>
      <circle cx="24" cy="19" r="11" />
      <circle cx="24" cy="19" r="6.5" strokeWidth="0.9" />
      <path d="M17 28l-3 14 10-5 10 5-3-14" />
      <path d="M20 15l8 8 M28 15l-8 8" strokeWidth="0.9" />
    </>
  ),
  lens: (
    <>
      <circle cx="21" cy="21" r="12" />
      <path d="M30 30l11 11" />
      <path d="M21 15v5 M21 25v1" strokeWidth="1.1" />
    </>
  ),
  mountain: (
    <>
      <path d="M4 40 18 14l8 12 5-7 13 21z" />
      <path d="M18 14l-3 9 4-2 3 4" strokeWidth="0.9" />
      <path d="M8 44h32" strokeWidth="0.9" />
    </>
  ),
  ledger: (
    <>
      <path d="M8 10h32v24H8z" />
      <path d="M14 17h8 M14 22h14 M14 27h10" strokeWidth="0.9" />
      <path d="M31 27l3 3 5-7" />
      <path d="M18 34v6 M30 34v6 M14 40h20" />
    </>
  ),
  qr: (
    <>
      <path d="M8 8h12v12H8z M28 8h12v12H28z M8 28h12v12H8z" />
      <path d="M12 12h4v4h-4z M32 12h4v4h-4z M12 32h4v4h-4z" strokeWidth="0.9" />
      <path d="M28 28h5v5h-5z M36 28h4 M28 37h4v3 M36 34v6h4" strokeWidth="0.9" />
    </>
  ),
  bottle: (
    <>
      <path d="M20 4h8v5h-8z" />
      <path d="M21 9v9c0 4-6 6-6 12v12c0 1.5 1 2.5 2.5 2.5h13c1.500 0 2.500-1 2.500-2.500V30c0-6-6-8-6-12V9" />
      <path d="M18 29h12v9H18z" strokeWidth="0.9" />
    </>
  ),
  compass: (
    <>
      <circle cx="24" cy="24" r="17" />
      <path d="M30 18l-3 9-9 3 3-9z" />
      <path d="M24 7v3 M24 38v3 M7 24h3 M38 24h3" strokeWidth="0.9" />
    </>
  ),
  cellar: (
    <>
      <path d="M6 42V22c0-10 8-16 18-16s18 6 18 16v20z" />
      <circle cx="17" cy="24" r="4" strokeWidth="0.9" />
      <circle cx="31" cy="24" r="4" strokeWidth="0.9" />
      <circle cx="24" cy="34" r="4" strokeWidth="0.9" />
      <circle cx="13" cy="35" r="3" strokeWidth="0.9" />
      <circle cx="35" cy="35" r="3" strokeWidth="0.9" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg viewBox="0 0 48 48" className="icon" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

function Lock({ order }: { order: number }) {
  return (
    <svg viewBox="0 0 32 36" className="lock" style={d(order)} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path className="shackle" d="M9 16V10a7 7 0 0 1 14 0v6" />
      <path d="M5 16h22v16H5z" />
      <path d="M16 22v5" />
    </svg>
  );
}

/** Three statements side by side under a hairline (problem slides, marketplace). */
function Statements({ items, icons, from = 3 }: { items: ReadonlyArray<{ head: L; body: L }>; icons: Array<keyof typeof ICONS>; from?: number }) {
  const { t } = useDeck();
  return (
    <ul className="cols-3 mt-4">
      {items.map((item, i) => (
        <li key={i} className="item">
          <span className="hair rv-line" style={d(from + i * 2)} />
          <div className="rv" style={d(from + i * 2)}>
            <span className="roman">{ROMAN[i]}</span>
            <Icon name={icons[i]} />
            <h3 className="h3">{t(item.head)}</h3>
            <p className="body">{t(item.body)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Dash({ items, from = 4 }: { items: ReadonlyArray<L>; from?: number }) {
  const { t } = useDeck();
  return (
    <ul className="dash">
      {items.map((item, i) => (
        <li key={i} className="rv" style={d(from + i)}>
          {t(item)}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Slides                                                               */
/* ------------------------------------------------------------------ */

function Portada() {
  const { t } = useDeck();
  const active = useSlideActive();
  const c = DECK.portada;
  return (
    <div className="cover-grid">
      <div className="stack" style={{ "--gap": "2em" } as CSSProperties}>
        <div className="rv-fade">
          <Logo />
        </div>
        <Title as="h1" className="h1" text={c.title} />
        <p className="lead rv" style={d(8)}>
          {t(c.lead)}
        </p>
        <ul className="pills rv" style={d(11)}>
          {c.pills.map((p, i) => (
            <li key={i}>{t(p)}</li>
          ))}
        </ul>
      </div>
      <div className="cover-vine">
        <HeroVine draw={active} />
      </div>
    </div>
  );
}

function ProblemaBodega() {
  const c = DECK.problemaBodega;
  return (
    <>
      <Title text={c.title} />
      <Statements items={c.items} icons={["notebook", "barrel", "label"]} />
    </>
  );
}

function ProblemaComprador() {
  const c = DECK.problemaComprador;
  return (
    <>
      <Title text={c.title} />
      <Statements items={c.items} icons={["seal", "lens", "mountain"]} />
    </>
  );
}

function Solucion() {
  const { t } = useDeck();
  const c = DECK.solucion;
  const icons = ["ledger", "qr", "bottle"] as const;
  return (
    <>
      <Title text={c.title} />
      <p className="lead mt-2 rv" style={d(4)}>
        {t(c.lead)}
      </p>
      <ul className="thread mt-4">
        <li className="thread-line rv-line" style={d(8)} aria-hidden="true" />
        {c.nodes.map((node, i) => (
          <li key={i} className="node" style={d(9 + i * 4)}>
            <div className="rv" style={d(10 + i * 4)}>
              <Icon name={icons[i]} />
              <span className="kicker">{t(node.kicker)}</span>
              <h3 className="h3 mt-1">{t(node.head)}</h3>
              <p className="body mt-1">{t(node.body)}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Erp() {
  const { t } = useDeck();
  const c = DECK.erp;
  return (
    <div className="split">
      <div className="stack" style={{ "--gap": "2em" } as CSSProperties}>
        <Title text={c.title} />
        <p className="lead rv" style={d(4)}>
          {t(c.lead)}
        </p>
        <Dash items={c.points} from={6} />
      </div>
      <Photo file={PHOTOS.erp} what="ERP" className="shot rv-fade" style={{ aspectRatio: "16 / 11" }} />
    </div>
  );
}

function Recorrido() {
  const { t } = useDeck();
  const c = DECK.recorrido;
  return (
    <>
      <Title text={c.title} />
      <ol className="journey mt-4">
        {c.steps.map((s, i) => (
          <li key={i}>
            <span className="hair gold rv-line" style={d(4 + i * 2)} />
            <div className="rv" style={d(4 + i * 2)}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h3">{t(s.head)}</h3>
              <span className="small">{t(s.body)}</span>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

function Reglas() {
  const { t } = useDeck();
  const c = DECK.reglas;
  return (
    <div className="split">
      <div className="stack" style={{ "--gap": "2em" } as CSSProperties}>
        <Title text={c.title} />
        <p className="lead rv" style={d(5)}>
          {t(c.lead)}
        </p>
      </div>
      <ul className="rules">
        {c.rules.map((rule, i) => (
          <li key={i} className="rv" style={d(5 + i * 2)}>
            <Lock order={5 + i * 2} />
            <span>{t(rule)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Expediente() {
  const { t } = useDeck();
  const c = DECK.expediente;
  return (
    <>
      <Title text={c.title} />
      <ul className="cols-3 mt-4" style={{ gap: "2em" }}>
        {c.blocks.map((b, i) => (
          <li key={i} className="seal rv" style={d(4 + i * 2)}>
            <span className="eyebrow">{t(b.label)}</span>
            <p className={`value mono ${i === 0 ? "sm" : ""}`}>{b.value}</p>
            <span className="hair gold rv-line" style={d(6 + i * 2)} />
            <p className="body mt-1">{t(b.body)}</p>
          </li>
        ))}
      </ul>
      <p className="lead mt-3 rv" style={{ ...d(11), maxWidth: "none" }}>
        {t(c.foot)}
      </p>
    </>
  );
}

function Pasaporte() {
  const { t, urls } = useDeck();
  const c = DECK.pasaporte;
  return (
    <div className="split">
      <div className="stack" style={{ "--gap": "1.8em" } as CSSProperties}>
        <Title text={c.title} />
        <p className="lead rv" style={d(4)}>
          {t(c.lead)}
        </p>
        <Dash items={c.rows} from={6} />
      </div>
      <div className="phone-wrap">
        <div className="phone rv" style={d(3)}>
          <div className="phone-screen">
            <span className="p-brand">Drinks on Chain</span>
            <p className="p-lot">{c.phone.lot}</p>
            <span className="p-sub">{t(c.phone.winery)}</span>
            <span className="p-ok rv-fade" style={d(10)}>
              {t(c.phone.ok)}
            </span>
            <span className="p-bottle">{t(c.phone.bottle)}</span>
            <ul className="p-rows">
              {c.rows.map((row, i) => (
                <li key={i} className="rv" style={d(11 + i)}>
                  {t(row).split(" · ")[0]}
                </li>
              ))}
            </ul>
            <span className="p-hash mono">ea261238…7d27c1bb</span>
          </div>
        </div>
        <a className="qr-card rv" style={d(9)} href={urls.passport} target="_blank" rel="noreferrer">
          <Qr url={urls.passport} />
          <span className="eyebrow">{t(c.qr)}</span>
          <span className="small mono">{urls.passport.replace(/^https?:\/\//, "").split("/")[0]}</span>
        </a>
      </div>
    </div>
  );
}

function Marketplace() {
  const { t } = useDeck();
  const c = DECK.marketplace;
  return (
    <>
      <div className="split even" style={{ alignItems: "end" }}>
        <Title text={c.title} />
        <p className="lead rv" style={d(4)}>
          {t(c.lead)}
        </p>
      </div>
      <Statements items={c.steps} icons={["compass", "bottle", "cellar"]} from={6} />
    </>
  );
}

function Stellar() {
  const { t } = useDeck();
  const c = DECK.stellar;
  return (
    <>
      <div className="split even" style={{ alignItems: "end" }}>
        <Title text={c.title} />
        <p className="lead rv" style={d(4)}>
          {t(c.lead)}
        </p>
      </div>
      <ul className="cols-3 mt-3">
        {c.stats.map((s, i) => (
          <li key={i} className="stat rv" style={d(5 + i * 2)}>
            <span className="num md">{t(s.value)}</span>
            <span className="small">{t(s.label)}</span>
          </li>
        ))}
      </ul>
      <div className="flow mt-3">
        {c.flow.map((f, i) => (
          <div key={i} style={{ display: "contents" }}>
            {i > 0 ? <span className="arrow rv-line" style={d(11 + i * 2)} /> : null}
            <div className="box rv" style={d(12 + i * 2)}>
              <h3 className="h3">{t(f.head)}</h3>
              <span className="small">{t(f.body)}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="small mt-2 rv" style={d(18)}>
        {t(c.foot)}
      </p>
    </>
  );
}

function Traccion() {
  const { t } = useDeck();
  const c = DECK.traccion;
  return (
    <div className="split even">
      <div className="stack" style={{ "--gap": "2em" } as CSSProperties}>
        <Title text={c.title} />
        <p className="lead rv" style={d(4)}>
          {t(c.lead)}
        </p>
        <ul className="cols-3" style={{ gap: "2em", paddingTop: "1em" }}>
          {c.stats.map((s, i) => (
            <li key={i} className="stat rv" style={d(6 + i * 2)}>
              <span className="num">{s.value}</span>
              <span className="small">{t(s.label)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mosaic">
        {PHOTOS.tarija.map((file, i) => (
          <Photo key={file} file={file} what={`Tarija · ${i + 1}`} style={d(2 + i * 2)} />
        ))}
      </div>
    </div>
  );
}

function Aprendizajes() {
  const { t } = useDeck();
  const c = DECK.aprendizajes;
  return (
    <>
      <blockquote className="quote rv">{t(c.quote)}</blockquote>
      <p className="kicker mt-2 rv" style={d(5)}>
        {t(c.source)}
      </p>
      <ul className="cols-3 mt-4">
        {c.items.map((item, i) => (
          <li key={i} className="item">
            <span className="hair rv-line" style={d(7 + i * 2)} />
            <p className="body rv" style={d(7 + i * 2)}>
              {t(item)}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Aliado({ c, photo, logo, flip = false }: { c: typeof DECK.daroca | typeof DECK.ucb; photo: string; logo: string; flip?: boolean }) {
  const { t } = useDeck();
  const picture = <Photo file={photo} what={t(c.title)} style={{ height: "36em" }} />;
  return (
    <div className={`split ${flip ? "" : "photo-left"}`}>
      {flip ? null : picture}
      <div className="stack" style={{ "--gap": "1.4em" } as CSSProperties}>
        <Photo file={logo} what="Logo" className="contain rv-fade" style={{ width: "8em", height: "5em" }} />
        <Title text={c.title} />
        <p className="kicker rv" style={d(3)}>
          {t(c.kicker)}
        </p>
        <p className="lead rv" style={d(5)}>
          {t(c.lead)}
        </p>
        <Dash items={c.facts} from={7} />
      </div>
      {flip ? picture : null}
    </div>
  );
}

const Daroca = () => <Aliado c={DECK.daroca} photo={PHOTOS.daroca} logo={PHOTOS.darocaLogo} />;
const Ucb = () => <Aliado c={DECK.ucb} photo={PHOTOS.ucb} logo={PHOTOS.ucbLogo} flip />;

function Lanzamiento() {
  const { t } = useDeck();
  const c = DECK.lanzamiento;
  return (
    <div className="split">
      <div className="stack" style={{ "--gap": "1.5em" } as CSSProperties}>
        <p className="kicker rv">{t(UI.tentative)}</p>
        <p className="date rv" style={d(2)}>
          {t(c.date)}
        </p>
        <span className="hair gold rv-line" style={d(4)} />
        <Title text={c.title} />
        <p className="lead rv" style={d(7)}>
          {t(c.lead)}
        </p>
      </div>
      <div className="stack" style={{ "--gap": "2.4em" } as CSSProperties}>
        <Photo file={PHOTOS.launch} what="Tarija" style={{ height: "17em" }} />
        <Dash items={c.items} from={8} />
      </div>
    </div>
  );
}

function Negocio() {
  const { t } = useDeck();
  const c = DECK.negocio;
  return (
    <>
      <Title text={c.title} />
      <ul className="cols-3 mt-4" style={{ gap: "2em" }}>
        {c.cards.map((card, i) => (
          <li key={i} className="card rv" style={d(3 + i * 2)}>
            <span className="roman kicker">{ROMAN[i]}</span>
            <h3 className="h3 mt-1">{t(card.head)}</h3>
            <Text value={card.body} />
          </li>
        ))}
      </ul>
    </>
  );
}

function Ruta() {
  const { t } = useDeck();
  const c = DECK.ruta;
  const state = ["done", "done", "next", ""];
  return (
    <>
      <Title text={c.title} />
      <ol className="road mt-4">
        <li className="road-line rv-line" style={d(4)} aria-hidden="true" />
        {c.points.map((p, i) => (
          <li key={i} className={state[i]} style={d(5 + i * 3)}>
            <div className="rv" style={d(6 + i * 3)}>
              <span className="eyebrow">{t(p.when)}</span>
              <h3 className="h3">{t(p.head)}</h3>
              <p className="body">{t(p.body)}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

function Equipo() {
  const { t } = useDeck();
  const c = DECK.equipo;
  return (
    <>
      <div className="split even" style={{ alignItems: "end" }}>
        <Title text={c.title} />
        <p className="kicker rv" style={d(3)}>
          {t(c.founders)}
        </p>
      </div>
      <ul className="team mt-3">
        {c.people.map((person, i) => (
          <li key={person.name} className={`rv ${person.founder ? "" : "guest"}`} style={d(3 + i * 2)}>
            <Photo file={person.photo} what={person.name} style={d(4 + i * 2)} />
            <p className="name">{person.name}</p>
            <Text value={person.role} className="role" />
          </li>
        ))}
      </ul>
    </>
  );
}

function Cierre() {
  const { t, urls } = useDeck();
  const c = DECK.cierre;
  return (
    <div className="close-grid">
      <div className="stack" style={{ "--gap": "2.6em" } as CSSProperties}>
        <div className="rv-fade">
          <Logo />
        </div>
        <Title text={c.title} />
        <div className="rv" style={d(9)}>
          <span className="eyebrow">{t(c.ask.label)}</span>
          <p className="lead mt-1">
            <Text value={c.ask.body} />
          </p>
        </div>
      </div>
      <div className="stack rv" style={{ ...d(11), "--gap": "1.6em" } as CSSProperties}>
        <Qr url={urls.landing} />
        <p className="contact">
          <a href={urls.landing} target="_blank" rel="noreferrer">
            {c.site}
          </a>
        </p>
        <p className="contact">
          <a href={`mailto:${c.contact}`}>{c.contact}</a>
        </p>
      </div>
    </div>
  );
}

export const SLIDES: SlideDef[] = [
  { id: "portada", section: DECK.portada.section, notes: DECK.portada.notes, className: "cover", Body: Portada },
  { id: "problema-bodega", section: DECK.problemaBodega.section, notes: DECK.problemaBodega.notes, Body: ProblemaBodega },
  { id: "problema-comprador", section: DECK.problemaComprador.section, notes: DECK.problemaComprador.notes, Body: ProblemaComprador },
  { id: "solucion", section: DECK.solucion.section, notes: DECK.solucion.notes, Body: Solucion },
  { id: "erp", section: DECK.erp.section, notes: DECK.erp.notes, Body: Erp },
  { id: "recorrido", section: DECK.recorrido.section, notes: DECK.recorrido.notes, Body: Recorrido },
  { id: "reglas", section: DECK.reglas.section, notes: DECK.reglas.notes, Body: Reglas },
  { id: "expediente", section: DECK.expediente.section, notes: DECK.expediente.notes, Body: Expediente },
  { id: "pasaporte", section: DECK.pasaporte.section, notes: DECK.pasaporte.notes, Body: Pasaporte },
  { id: "marketplace", section: DECK.marketplace.section, notes: DECK.marketplace.notes, Body: Marketplace },
  { id: "stellar", section: DECK.stellar.section, notes: DECK.stellar.notes, Body: Stellar },
  { id: "traccion", section: DECK.traccion.section, notes: DECK.traccion.notes, Body: Traccion },
  { id: "aprendizajes", section: DECK.aprendizajes.section, notes: DECK.aprendizajes.notes, Body: Aprendizajes },
  { id: "daroca", section: DECK.daroca.section, notes: DECK.daroca.notes, Body: Daroca },
  { id: "ucb", section: DECK.ucb.section, notes: DECK.ucb.notes, Body: Ucb },
  { id: "lanzamiento", section: DECK.lanzamiento.section, notes: DECK.lanzamiento.notes, Body: Lanzamiento },
  { id: "negocio", section: DECK.negocio.section, notes: DECK.negocio.notes, Body: Negocio },
  { id: "ruta", section: DECK.ruta.section, notes: DECK.ruta.notes, Body: Ruta },
  { id: "equipo", section: DECK.equipo.section, notes: DECK.equipo.notes, Body: Equipo },
  { id: "cierre", section: DECK.cierre.section, notes: DECK.cierre.notes, Body: Cierre },
];

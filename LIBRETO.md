# Drinks on Chain · Libreto del pitch deck

> Versión construida · 11-10-2026. Aprobado por Kevin con los cambios de esa fecha.
> Los textos viven en `src/content/deck.ts`; este documento explica el hilo y lo que falta.

## El hilo

**Problema → Solución → ERP → Sello y pasaporte → Marketplace → Stellar → Tracción → Lanzamiento → Negocio → Ruta → Equipo → Pedido.**

Llega hasta el Marketplace; el punto de canje (POS) queda fuera.

## Las 20 láminas

| # | id | Mensaje |
|---|---|---|
| 01 | `portada` | Cada botella, con su lugar y su historia |
| 02 | `problema-bodega` | La bodega produce sin sistema, no puede rastrear un problema ni demostrar su origen |
| 03 | `problema-comprador` | Falsificación, cero trazabilidad, territorio invisible (más de 1.800 msnm) |
| 04 | `solucion` | Un solo hilo: ERP → pasaporte → Marketplace |
| 05 | `erp` | El ERP hecho para una bodega de altura |
| 06 | `recorrido` | Los 10 pasos del lote, de la parcela al expediente |
| 07 | `reglas` | Reglas que el sistema no deja saltarse |
| 08 | `expediente` | Código de lote, código por botella y huella del expediente |
| 09 | `pasaporte` | Escanea la etiqueta; QR real a un pasaporte de la plataforma |
| 10 | `marketplace` | Descubre, adquiere, colecciona |
| 11 | `stellar` | Un NFT por botella, 3–5 s, menos de US$ 0,001 |
| 12 | `traccion` | Tarija, primera semana de octubre: 5 bodegas, 1 primera bodega, 1 alianza |
| 13 | `aprendizajes` | Lo que dijeron las bodegas: rastrear una barrica hasta su lote |
| 14 | `daroca` | Bodega Daroca (Tarija, desde 1920), primera bodega |
| 15 | `ucb` | Alianza con Enología de la Universidad Católica; firma en noviembre |
| 16 | `lanzamiento` | 21-11-2026 (tentativa), lanzamiento oficial en Tarija |
| 17 | `negocio` | Modelo de negocio — **por definir** |
| 18 | `ruta` | Hecho · octubre · noviembre · 2027 |
| 19 | `equipo` | Kevin, Vanessa, Diego y Clara Bottler (sommelier) |
| 20 | `cierre` | Llamado y pedido — **por definir** |

Una lámina se oculta con `?hide=id,id` (por ejemplo `?hide=negocio` mientras no esté definido).

## Decisiones tomadas

- **Blockchain en presente.** El deck dice "un NFT por botella" y "huella anclada en Stellar", como el deck de Vanessa, porque la conexión con la red se hace en los próximos días y el deck se presenta en dos semanas. **Antes de presentarlo hay que confirmar que la Ola 3 está conectada**; si no, se suavizan las láminas 04, 09, 10 y 11 en `deck.ts`.
- **Bodega Daroca** aparece con nombre y logo (autorizado). Datos tomados de su sitio: Tarija, desde 1920, vinos (Syrah, Tannat, Oporto, Blend) y singani.
- **UCB:** acuerdo de palabra; el deck dice "alianza" y "firma del convenio: noviembre de 2026", no "convenio firmado".
- **Otras bodegas visitadas** (Barbacana, El Cañón Escondido) solo en las notas del orador, no en pantalla.
- **1.800 msnm** como cifra de altura.
- Fuera el "lanzamiento piloto Q1 2026".
- Español e inglés; enlace abierto pero sin indexar en buscadores.

## Falta

**Datos** (en `src/content/deck.ts`)
1. Cargo y nombre completo de Vanessa.
2. Confirmar cómo se escribe el apellido de Clara (el deck anterior dice "Bottler").
3. Modelo de negocio: fuentes de ingreso y precios.
4. El pedido de la lámina final (cambia según dónde se presente).
5. Correo de contacto: hoy `contacto@drinksonchain.bo`, el mismo de la landing.
6. Cifras de mercado con fuente, si se quiere una lámina de oportunidad.
7. Hitos de 2027.

**Fotos** (en `public/fotos/`, nombres en el `README.md`)
- Viaje a Tarija (5), Bodega Daroca (1 y logo), UCB (1 y logo), lanzamiento o Tarija (1), equipo (4), captura del ERP (1).

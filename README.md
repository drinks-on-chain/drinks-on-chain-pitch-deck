# Drinks on Chain · Pitch deck

Deck web de Drinks on Chain: 20 láminas 16:9 en español e inglés, con el sistema de diseño de las landings (papel, tinta y un solo oro; Cormorant Garamond + EB Garamond). Sitio estático en Next.js 16, sin backend.

El guion y las decisiones están en [`LIBRETO.md`](LIBRETO.md).

## Uso

```bash
pnpm install
pnpm dev        # http://localhost:3010
```

| Acción | Cómo |
|---|---|
| Avanzar / retroceder | `→` `←`, espacio, clic o deslizar |
| Ir a una lámina | `#7` en la dirección |
| Idioma | tecla `L`, botón `EN / ES` o `?lang=en` |
| Notas del orador | tecla `N` |
| Pantalla completa | tecla `F` |
| Ocultar láminas | `?hide=stellar,negocio` (ids de `src/components/slides.tsx`) |
| PDF | botón `PDF` (abre `?print=1`) y luego `Ctrl+P` → Guardar como PDF, sin márgenes |

En un teléfono en vertical las láminas se leen como una sola columna.

## Cambiar el contenido

- **Textos, cifras y nombres:** `src/content/deck.ts`. Lo marcado con `PENDING` se ve en la lámina como "Por definir".
- **Fotos:** se suben a `public/fotos/` con el nombre exacto que muestra cada espacio reservado; al volver a desplegar aparecen solas.

| Archivo | Lámina |
|---|---|
| `tarija-01.jpg` … `tarija-05.jpg` | Tracción (la 01 es la grande, vertical) |
| `daroca-01.jpg`, `daroca-logo.png` | Bodega Daroca |
| `ucb-01.jpg`, `ucb-logo.png` | Alianza académica |
| `lanzamiento-01.jpg` | Lanzamiento |
| `kevin-perfil2026.png`, `equipo-vanessa.jpg`, `diego-perfil.jpeg`, `equipo-clara.jpg` | Equipo (retrato vertical 4:5) |
| `captura-erp.png` | ERP (captura de pantalla 16:11) |

- **Diseño de una lámina:** `src/components/slides.tsx`; estilos en `src/app/globals.css` (todo en `em`: la lámina escala como una pieza).

## Enlaces

Los hosts de los otros sitios salen de `NEXT_PUBLIC_URL_LANDING` y `NEXT_PUBLIC_URL_APP` (`src/lib/links.ts`); sin ellas se usan los dominios oficiales.

## Git

Vercel: producción desde `main`, previews desde `dev`. El flujo completo (etiqueta de restauración al iniciar sesión, Conventional Commits y publicación según la rama) está en [`AGENTS.md`](AGENTS.md).

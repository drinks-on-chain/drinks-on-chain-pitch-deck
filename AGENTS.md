# Drinks on Chain · Pitch deck — guía para agentes

Deck web de 20 láminas 16:9 (ES/EN). Sitio estático en Next.js 16 + React 19 + TypeScript estricto, con pnpm. Sin backend, sin autenticación. Producción: Vercel desde `main`.

Los cambios habituales aquí son pequeños: **añadir fotos, cambiar o quitar texto y, como mucho, añadir animaciones**. Hazlos de la forma más simple posible.

En este repositorio, estas reglas mandan sobre la guía general del ecosistema (`../CLAUDE.md`) en lo que toca a Git.

## Dónde se cambia cada cosa

| Quiero… | Archivo |
|---|---|
| Cambiar texto, cifras, nombres o cargos | `src/content/deck.ts` |
| Añadir o cambiar una foto | `public/fotos/` + su nombre en `src/content/deck.ts` |
| Cambiar el diseño de una lámina | `src/components/slides.tsx` |
| Cambiar estilos o animaciones | `src/app/globals.css` |
| Navegación, idioma, notas, PDF | `src/components/Deck.tsx` |
| Enlaces a otros sitios | `src/lib/links.ts` (variables `NEXT_PUBLIC_URL_*`) |

El guion y las decisiones de contenido están en `LIBRETO.md`; el uso del deck, en `README.md`.

## Reglas de contenido

- **Todo texto va en los dos idiomas**: `l("español", "English")` en `src/content/deck.ts`. Nunca escribas texto visible dentro de un componente.
- Lo que aún no se sabe se deja como `PENDING` (se ve "Por definir"); no inventes cifras, cargos ni nombres.
- La única marca que aparece es **Drinks on Chain**.
- **Fotos**: se guardan en `public/fotos/` y se referencian solo por nombre de archivo. Una foto que no está en la carpeta muestra su espacio reservado, no rompe nada. Antes de subir una, mírala: los retratos del equipo se recortan a 4:5 centrados y la captura del ERP a 16:11. Evita archivos de más de ~1 MB.
- Si cambias el nombre de un archivo de foto, actualiza la tabla de fotos del `README.md`.

## Reglas de código

- Next.js 16 tiene cambios incompatibles con versiones anteriores: consulta `node_modules/next/dist/docs/` antes de usar una API que no esté ya en el repo.
- TypeScript estricto: sin `any` ni `@ts-ignore`.
- Sigue el estilo del código que rodea al cambio; no añadas dependencias para algo que se resuelve con CSS o con lo que ya hay.
- Estilos en `em` (la lámina escala como una pieza) y con las variables de color existentes: papel, tinta y un solo oro (`--accent` para trazos, `--accent-deep` para texto pequeño). No añadas colores ni tipografías.
- **Animaciones**: solo `transform` y `opacity`, con las curvas (`--ease-*`) y el retraso escalonado (`--d`) que ya existen; siempre con su alternativa en `prefers-reduced-motion`. Comprueba que el modo PDF (`?print=1`) y el modo columna del móvil siguen viéndose bien.
- Accesibilidad: `alt` en las imágenes, navegación completa por teclado, foco visible.
- Nunca subas secretos ni archivos `.env`.

## Comprobar antes de publicar

```bash
pnpm typecheck
```

```bash
pnpm lint
```

Si tocaste componentes, estilos o animaciones, además `pnpm build` y mira la lámina en `http://localhost:3010/#<número>` (`pnpm dev`; si el puerto 3010 ya está en uso, no arranques otro servidor: usa el que está abierto). Para un cambio que solo es de texto o de fotos basta con `typecheck` y `lint`.

Si una comprobación falla, arréglala antes de publicar. No publiques en rojo.

## Git: flujo completo

### 1. Al empezar la sesión: punto de restauración

Antes del primer cambio, marca el estado actual de producción con una etiqueta:

```bash
git fetch origin --tags
```

```bash
git tag -a sesion/AAAA-MM-DD-HHmm origin/main -m "Punto de restauracion: inicio de sesion"
```

```bash
git push origin sesion/AAAA-MM-DD-HHmm
```

Una etiqueta por sesión (fecha y hora reales). Si no hay conexión con el remoto, crea la etiqueta sobre `HEAD` y súbela cuando se pueda.

### 2. Commits: Conventional Commits

Formato `<tipo>(<alcance>): <descripción>`, en español, en imperativo, en minúsculas, sin punto final y con un máximo de 72 caracteres. Un commit por cambio lógico.

| Tipo | Cuándo |
|---|---|
| `feat` | Contenido o función nueva: una foto, una lámina, una animación |
| `fix` | Corrección de un error: una errata, un dato equivocado, algo que se ve mal |
| `style` | Cambios visuales sin cambio de contenido ni de comportamiento |
| `refactor` | Reorganizar código sin cambiar lo que se ve |
| `docs` | README, LIBRETO, AGENTS, CLAUDE |
| `chore` | Dependencias, configuración, mantenimiento |
| `perf` | Rendimiento (p. ej. optimizar imágenes) |

Alcances habituales: el id de la lámina (`equipo`, `traccion`, `cierre`…), `deck`, `fotos`, `estilos`.

```
feat(equipo): foto y cargo de Kevin Gomez
fix(traccion): corrige la cifra de bodegas visitadas
style(cierre): suaviza la entrada del código QR
```

Añade un cuerpo solo si hace falta explicar el porqué. Un cambio incompatible se marca con `!` (`feat(deck)!: …`) y un pie `BREAKING CHANGE:`. Añade al índice solo los archivos del cambio (`git add <archivos>`, no `git add .` a ciegas).

### 3. Publicar: elige el camino según la rama

Al terminar un cambio y con las comprobaciones en verde, **haz commit y publícalo sin pedir permiso**. Mira primero en qué rama estás (`git branch --show-current`) y si `gh` tiene sesión (`gh auth status`).

**A. Estás en `main`** → push directo; Vercel despliega producción.

```bash
git push origin main
```

**B. Estás en `dev` y `gh` tiene sesión** → sube `dev`, abre el PR a `main` y fusiónalo en el momento.

```bash
git push origin dev
```

```bash
gh pr create --base main --head dev --title "<título en Conventional Commits>" --body "<resumen de los cambios>"
```

```bash
gh pr merge --merge
```

Después deja `dev` igual que `main`:

```bash
git pull --ff-only origin main
```

```bash
git push origin dev
```

GitHub no permite que el autor apruebe su propio PR: "aprobarlo" aquí es fusionarlo directamente. Si ya hay un PR abierto de `dev` a `main`, reutilízalo.

**C. No hay `gh` (o no tiene sesión)** → trabaja en `main` y haz push directo, como en A. Si estabas en `dev`:

```bash
git checkout main
```

```bash
git pull --ff-only origin main
```

```bash
git merge --ff-only dev
```

```bash
git push origin main
```

Para subir se usa la cuenta `BrianKGR01` de `gh`. Si no es la activa, `gh auth switch --user BrianKGR01` y restaura la anterior al terminar.

### 4. Verificar

Tras publicar, confirma que el commit está en `origin/main` (`git log origin/main --oneline -1`) y avisa de que Vercel tarda alrededor de un minuto en mostrarlo en `https://drinks-on-chain-pitch-deck.vercel.app`.

### 5. Si algo salió mal: volver al punto de restauración

Deshaz con un commit nuevo, sin reescribir la historia:

```bash
git revert --no-edit sesion/AAAA-MM-DD-HHmm..HEAD
```

```bash
git push origin main
```

(Si entre medias hay un commit de fusión de PR, reviértelo con `git revert -m 1 <sha>`.)

**Prohibido sin que el usuario lo pida de forma explícita**: `git push --force`, `git reset --hard` sobre commits ya subidos y borrar etiquetas `sesion/*`.

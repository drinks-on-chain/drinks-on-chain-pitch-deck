# Drinks on Chain · Pitch deck — instrucciones para Claude

Las reglas del repositorio (contenido, código, comprobaciones y Git) están en `AGENTS.md`; son de obligado cumplimiento:

@AGENTS.md

## Commit y publicación automáticos

En este repositorio el usuario ya autorizó hacer commit y publicar sin preguntar. En cada sesión:

1. **Al empezar, antes del primer cambio**: crea y sube la etiqueta `sesion/AAAA-MM-DD-HHmm` sobre `origin/main` (AGENTS.md → Git, paso 1). Una por sesión.
2. **Haz el cambio** que se pide, lo más simple posible, y pasa `pnpm typecheck` y `pnpm lint` (y `pnpm build` si tocaste componentes, estilos o animaciones).
3. **Haz commit** con Conventional Commits, un commit por cambio lógico, solo con los archivos del cambio.
4. **Publica en el mismo turno**, según la rama:
   - en `main` → `git push origin main`;
   - en `dev` con `gh` → push de `dev`, `gh pr create` a `main`, `gh pr merge --merge` y deja `dev` al día;
   - sin `gh` → trabaja en `main` y haz push directo.
5. **Informa** en una o dos frases: qué cambió, el commit y que ya está en camino a producción. Di también el nombre de la etiqueta de la sesión, por si hay que volver atrás.

No preguntes "¿lo subo?": súbelo. Solo se pregunta antes de un `push --force`, de un `reset --hard` sobre commits ya subidos, de borrar etiquetas o ramas, o si una comprobación falla y no sabes arreglarla.

Si el usuario dice que algo quedó mal, ofrece volver a la etiqueta de la sesión con `git revert` (AGENTS.md → Git, paso 5).

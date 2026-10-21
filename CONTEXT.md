# Q'filo — contexto del proyecto

Leer esto primero. Mantenerlo al día al cambiar algo relevante (sustituye releer todo `index.html`).

## Negocio
- **Q'filo** — restaurante peruano de fusión **chifa + criollo** en Getafe (Madrid).
- Dirección: Calle Castellón de la Plana 6, 28903 Getafe, Madrid. Tel: +34 918 32 47 95.
- Horario, WhatsApp y redes: **sin datos todavía** (no inventar).
- Platos destacados: arroz chaufa especial, chaufa de mariscos, aeropuerto, tallarín saltado, lomo saltado, caldo de gallina. Postres: tres leches, cheesecake, chocolate.
- Idioma de la web: español (es-ES). Tono: cercano, peruano ("¿Ya se te antojó?").

## Stack
- Una sola página estática: `index.html` (≈1200 líneas) + `assets/js/main.js` (vanilla).
- Tailwind v4 **vía CDN** (`@tailwindcss/browser@4`) con `<style type="text/tailwindcss">` inline en el `<head>`.
- `src/input.css` → `assets/css/styles.css` (build con `npm run build`) **NO está enlazado** en `index.html`. Cualquier CSS que deba funcionar va en el `<style>` inline.
- Servir: `npm run serve` (http-server :4173). Preview: `.claude/launch.json` → "qfilo".

## Diseño
- **Paleta oficial (2026-10-14): `#301617` marrón (ink), `#bb0e1b` rojo (blood), `#e8ad21` dorado (gold), `#fff`.** Hover rojo `#8f0a15`. Derivados: clay `#4a2224`, ember = gold, crust `#6b3a33`; neutros claros crema `#FAF5EB` y paper `#f4ede1`.
- En secciones oscuras (marrón: CTA, footer, menú móvil) los acentos van en `text-gold`; en claras, `text-blood`.
- Fuentes (solo se cargan estas 2): **Lilita One** (`font-chunky`: títulos, etiquetas, botones destacados) y **Manrope** (`font-sans`: texto, menús, botones). Anton/Fraunces/Nunito eliminadas del `<link>`; `.display` y `font-serif` ya no se usan.
- Hero: banner rojo con doodles blancos, onda crema `#FAF5EB` abajo, título 3D blanco, plato `hero-plato-broaster.webp` (pollo broaster + chaufa + papas, recorte transparente) centrado sobre la onda (sin platos laterales ni elementos flotantes). Referencia: plantilla tipo "Taste the difference" (burger).
- Header: cápsula blanca fija, sin fondo oscuro al hacer scroll.
- Sección `#por-que` (tras el hero, crema): etiqueta, título "Fuego de wok, sazón de casa", 4 valores con iconos y fila de 7 platos `.picks/.pick` (incluye Chaufa de pollo, activo, y Pollo a la brasa) (activo = rojo; hover cambia el activo).
- Sección `#sabores` (tras `#por-que`): foto real `cocina-salsa.webp` (salsa cayendo sobre el plato, sello "Hecho al momento") + "Un mundo de sabor en cada bocado" con checks dorados; debajo tarjeta blanca "Los favoritos de la casa" (lista `.fav`, 2 columnas Chifa (4) / Criollo & postres (5, con Pollo a la brasa), etiquetas en vez de precios) sobre banda dorada, con bowl flotante `chifa-dragon-plate.webp`.
- Tras `#sabores`: sección `#experiencia` = "Vive la experiencia": 4 tarjetas 9:16 `.exp-card` = 3 videos reales del cliente (`assets/video/experiencia-1..3.mp4`: gracias por el apoyo, momentos sin prisa, ¡Dímelo!; `preload=metadata` + `#t=0.1` para mostrar el primer fotograma; hover/tap reproduce) + 1 foto `aniversario.webp` (tarjeta destacada "¡Feliz aniversario!"), título "Lo que se cuenta en la mesa" y slider de reseñas `[data-reviews]` en tarjeta-bocadillo `.review-card` (avatar con inicial, flechas + puntos debajo) con 3 reseñas de RELLENO + botón rojo a Google Maps. Luego `#ofertas` (fondo dorado): CTA "Únete y recibe ofertas calientes" con 3 botones (Pedir por WhatsApp `data-whatsapp`, Reservar mesa `tel:`, Ver la carta). Ya NO hay formulario de newsletter (el JS `[data-newsletter]` queda inactivo).
- Footer: marrón con onda dorada arriba (continúa `#ofertas`), 3 tarjetas de contacto `.foot-card` (dirección, teléfono, horario), logo BLANCO `logo.png` (sin cápsula) + redes `.foot-social`, Explora `.foot-link`, bloque "¿Se te antojó?" con Reservar + WhatsApp (`data-whatsapp`), wordmark gigante translúcido y barra de copyright.
- **Orden actual (2026-10-14):** `#inicio` → `#por-que` → `#sabores` (la tarjeta de favoritos tiene `id="carta"`) → `#experiencia` → `#ofertas` → footer `#contacto`. Eliminadas: CTA "¿Ya se te antojó?", identidad ("Chifa y criollo en Getafe"), carta ("Los que siempre provocan"), nosotros ("Dos mundos") y postres ("El final más dulce"). Nav: Inicio, Menú, Nosotros(#por-que) | Experiencia, Ofertas, Contacto.
- Breakpoint extra `xs` = 30rem (definido en `@theme`).

## Variante `index2.html` (2026-10-14)
- Copia completa de `index.html` con **otro hero**: foto a pantalla completa `hero-qfilo-plato.webp` (plato + Inca Kola sobre piedra beige; en móvil, texto arriba y foto recortada al plato debajo); texto a la izquierda: "Bienvenido a" (Kaushan Script, rojo, con rayitas `.hero2-spark`), "Q'filo" (Knewave, casi negro `#1d1011`, subrayado de pincel rojo), "Chifa & criollo" (Manrope) entre líneas rojas, "# Sabor que provoca." (Kaushan) + botones Ver la carta / Reservar mesa.
- Adornos estáticos en rojo (`.hero2-ornament`): farolillo chino arriba-izquierda y esquinas de greca (no flotan).
- Fuentes extra solo en index2: `--font-script` Kaushan Script, `--font-brush` Knewave.
- **Al cambiar el resto de la página, mantener index.html e index2.html sincronizados** (todo igual salvo el hero).

## Archivos de imagen (`assets/img`)
- `logo-qfilo.webp` 1733×907, marrón oscuro + ají rojo, fondo transparente — logo actual (sobre blanco; en fondos oscuros va dentro de una cápsula blanca).
- `logo.png` 500×251 blanco — se usa en el footer.
- `hero-plato-broaster.webp` 1672×940, recorte transparente (pollo broaster, chaufa, papas) — imagen del hero de **index.html**.
- `hero-qfilo-plato.webp` 1673×940 — foto con fondo e Inca Kola — hero de **index2.html**.
- Fotos reales del cliente (originales en Downloads/"fotos platos fondo"): `lomo-saltado(.webp|-sq.webp)` = IMG-59, `pollo-a-la-brasa(...)` = IMG-30, `chaufa-de-pollo(...)` = IMG-27. `.webp` vertical 900×1351, `-sq.webp` recorte cuadrado 640 para círculos.
- `hero-chaufa-bowl.png` 700×700 PNG transparente — antiguo bowl del hero (ya sin usar).
- `chaufa-especial.webp`, `chaufa-de-mariscos.webp`, `aeropuerto.jpg`, `tallarin-saltado.jpg`, `caldo-de-gallina.jpg`, `wok-cooking.jpg`.
- `chifa-dragon-plate.webp` = bowl de chaufa sin fondo (usado en #sabores). Sin usar: `hero-wok-chifa.jpg`. Solo Tres leches y Cheesecake (lista de favoritos) siguen con fotos de Unsplash.

## Hecho (2026-10-14)
- Hero rehecho: título "Sabor que provoca" (`.hero-title`), etiqueta `.hero-label`, bowl `hero-chaufa-bowl.png` (luego sustituido por `hero-plato-broaster.webp`).
- **Decisión del cliente:** NO usar elementos flotantes dibujados con código (ingredientes SVG `.fly`, ajíes, migas). Todos eliminados junto con su sprite y CSS. Tampoco bloque de datos/contadores.
- Logo del header visible (`max-w-none`), breakpoint `xs` definido, un único `<h1>` (el de #identidad pasó a `<h2>`).

## Pendientes conocidos (revisión 2026-10-14)
- Videos de 2,6–6,2 MB sin comprimir (sin ffmpeg en el equipo); conviene optimizarlos antes de publicar.
- Sustituir las 3 reseñas de relleno por reseñas reales.
- Precios de la carta: sin datos (la lista de favoritos no los muestra).
- WhatsApp vacío en `CONFIG.whatsapp` (`main.js`).
- Redes sociales `href="#"`; horario "Por confirmar".
- Valoración "4.9/5 · 1.800 platos" sin verificar (estaba en el hero antiguo; quitada).
- CSS sin uso tras borrar secciones: `.dish*`, `.marquee*`, `.img-reveal`, `[data-parallax]` en JS.
- Favicon con "F" (marca antigua "Fuego & Sabor"); `package.json` aún `fuego-sabor`.
- CSS sobrante de otra plantilla (`.btn-pill`, `.bob`, 2º `.nav-link`, `.line-mask`).
- Imágenes externas (og:image incluida) → sustituir por fotos propias.
- JSON-LD sin `openingHours`, `url`, `image`, `priceRange`.
- `assets.zip` (1 MB) suelto en la raíz.

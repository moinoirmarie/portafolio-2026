# Andrea Blasco — Portafolio

Sitio estático en HTML, CSS y JavaScript, sin dependencias de compilación. Las fuentes Red Hat Mono y Outfit se cargan desde Google Fonts (con fuentes de respaldo si no hay conexión).

## Edición local

1. Descomprime el ZIP y abre la carpeta en VS Code (Archivo > Abrir carpeta).
2. Abre index.html en tu navegador o instala Live Server y selecciona Open with Live Server.
3. Edita los archivos y guarda los cambios.

## Dónde editar

- `index.html`: textos de inicio, introducciones, biografía, contacto y navegación.
- `css/styles.css`: colores (variables en :root), tipografías, espaciado y responsive.
- `js/content.js`: proyectos, portadas, galería, cronología y enlaces personales.
- `js/main.js`: navegación, ventanas de detalle y renderizado de tarjetas.
- `assets/images/`: imágenes propias organizadas por disciplina.
- `assets/documents/`: CV en PDF.

### Reemplazar una imagen

Copia, por ejemplo, `lluvia-suspendida.webp` a `assets/images/audiovisual/`. En el objeto correspondiente de `js/content.js`, cambia:

```js
"image": "assets/images/audiovisual/lluvia-suspendida.webp",
"alt": "Descripción del fotograma",
"placeholder": false,
```

Para añadir un proyecto, duplica un objeto dentro de `films`, `designs` o `drawings` y edita sus campos. Respeta las comas entre objetos. `sections` permite agregar bloques de texto; `gallery` admite objetos con `image`, `alt` y `placeholder`; `url` permite enlazar un video o proyecto externo. El campo `ratio` controla la proporción de las ilustraciones. Elimina las tarjetas provisionales que no necesites.

### Perfil y CV

En `profile` dentro de `js/content.js`, configura `portrait` con la ruta de tu foto, `email` con tu correo sin mailto:, `linkedin` e `instagram` con sus URL completas, y `cvDesign` y `cvFilm` con rutas como `assets/documents/cv-diseno.pdf`. Copia los PDF reales a esa carpeta. Los enlaces vacíos aparecen deshabilitados.

## Publicar en GitHub Pages

1. Crea un repositorio público en GitHub (por ejemplo `portafolio`).
2. Sube el contenido de esta carpeta a la raíz del repositorio, incluido index.html. No subas el ZIP como único archivo.
3. En Settings > Pages, selecciona Deploy from a branch, rama main, carpeta / (root), y guarda.
4. Cuando finalice el despliegue, GitHub mostrará la URL. Normalmente será `https://TU-USUARIO.github.io/portafolio/`.

Alternativamente, desde la terminal de VS Code, en la carpeta del proyecto (repositorio remoto vacío):

```bash
git init
git add .
git commit -m "Publicar portafolio inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/portafolio.git
git push -u origin main
```

Para cambios posteriores: `git add .`, `git commit -m "Actualizar portafolio"`, `git push`.

## Antes de publicar

- Reemplaza imágenes y textos provisionales; verifica fechas, roles y créditos.
- Publica solo trabajos y materiales autorizados. Evita información interna y datos de clientes.
- Usa imágenes WebP o JPEG optimizadas, nombres en minúsculas sin espacios y rutas relativas (sin `/` inicial).
- Comprueba navegación, enlaces, CV, móvil y textos alternativos.
- No subas datos privados ni claves: el repositorio y el sitio serán públicos.

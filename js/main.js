// Funcionalidades del sitio. El contenido se edita en content.js.
const $ = s => document.querySelector(s);
const make = (tag, text, cls) => { const el = document.createElement(tag); if(text) el.textContent=text; if(cls) el.className=cls; return el; };
function artwork(item, detail=false) {
  const box=make('div','', 'art'+(detail?' detail-image':''));
  if(item.ratio) box.style.setProperty('--ratio',item.ratio);
  const img=make('img'); img.src=item.image; img.alt=item.alt||''; img.loading='lazy'; img.decoding='async';
  box.append(img); if(item.placeholder) box.append(make('span','Imagen provisional')); return box;
}
const dialog=$('#detail');
function show(item){
  const body=$('#detailbody'); body.replaceChildren();
  const title=make('h2',item.title); title.id='detail-title';
  body.append(make('div',item.meta,'eyebrow'),title,artwork(item,true),make('p',item.description));
  for(const section of item.sections||[]) body.append(make('h3',section.title),make('p',section.text));
  for(const photo of item.gallery||[]) body.append(artwork(photo,true));
  if(item.url){const link=make('a','Ver proyecto ↗','cta');link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';body.append(link);}
  dialog.showModal();
}
for(const item of CONTENT.home){const a=make('a','','tile');a.href='#'+item.route;a.append(artwork(item),make('h3',item.title+' ↗'),make('p',item.description));$('#homecards').append(a);}
for(const [id,items] of [['films',CONTENT.films],['designs',CONTENT.designs],['drawings',CONTENT.drawings]]){
  for(const item of items){const b=make('button','','tile');b.type='button';b.append(artwork(item));if(id!=='drawings')b.append(make('h3',item.title+' ↗'),make('div',item.meta,'eyebrow'),make('p',item.description));else b.setAttribute('aria-label','Ampliar '+item.title);b.addEventListener('click',()=>show(item));$('#'+id).append(b);}
}

// ========================================
// TIMELINE — Trayectoria profesional
// ========================================

const timelineTypes = {
  academic: "Formación académica",
  work: "Experiencia laboral",
  creative: "Experiencia creativa",
  training: "Formación complementaria"
};

const timeline = $("#timeline");

// Limpiar contenido anterior
timeline.replaceChildren();

// Crear leyenda de categorías
const legend = make("div", "", "timeline-legend");

for (const [type, label] of Object.entries(timelineTypes)) {
  const tag = make("span", label, "timeline-tag");
  tag.dataset.type = type;
  legend.append(tag);
}

timeline.parentElement.querySelector(".timeline-sidebar").append(legend);

// Generar experiencias
for (const item of CONTENT.timeline) {

  const type = Object.hasOwn(timelineTypes, item.type)
    ? item.type
    : "other";

  const event = make("article", "", "event");
  event.dataset.type = type;

  // Columna izquierda: año
  const date = make(
    "div",
    item.date,
    "event-date"
  );

  // Columna central: línea y marcador
  const marker = make("div", "", "event-marker");
  marker.setAttribute("aria-hidden", "true");

  // Columna derecha: contenido
  const content = make("div", "", "event-content");

  const category = make(
    "span",
    timelineTypes[type] || "Sin categoría",
    "timeline-tag"
  );

  category.dataset.type = type;

  const title = make("h3", item.title);

  const description = make(
    "p",
    item.description,
    "event-description"
  );

  content.append(category, title, description);
  event.append(date, marker, content);

  timeline.append(event);
}

if(CONTENT.profile.portrait) document.querySelectorAll('.portrait').forEach(el=>{const img=make('img');img.src=CONTENT.profile.portrait;img.alt='Retrato de Andrea Blasco';img.loading='lazy';el.replaceChildren(img);});
let missing=false;
document.querySelectorAll('[data-profile]').forEach(b=>{const key=b.dataset.profile;const value=CONTENT.profile[key];if(!value){b.disabled=true;missing=true;return;}const a=make('a',b.textContent.trim(),'cta');a.href=key==='email'?'mailto:'+value:value;if(key.startsWith('cv'))a.download='';else if(key!=='email'){a.target='_blank';a.rel='noopener noreferrer';}b.replaceWith(a);});
if(!missing) $('#links-notice').hidden=true;
if(CONTENT.drawings.every(x=>!x.placeholder)) $('#ilustracion .notice').hidden=true;
function route(){let id=location.hash.slice(1)||'inicio';if(id==='main'){ $('#main').focus();return;}const anchor=id==='especialidades';if(anchor)id='inicio';if(!document.getElementById(id)?.classList.contains('page'))id='inicio';document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('.links a').forEach(a=>{const active=a.hash==='#'+id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});if(anchor)$('#especialidades').scrollIntoView();else window.scrollTo(0,0);}
window.addEventListener('hashchange',route);route();$('#close-detail').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});

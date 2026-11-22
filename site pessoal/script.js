
const CONFIG = {
  siteName: "André Vitor",                 
  
  
  colors: {},

  social: [
    { label: "Instagram", url: "https://www.instagram.com/andrzxqy/" },
    { label: "Linkedin",  url: "https://www.linkedin.com/in/andré-vitor-souza-pereira-60319b3a9" },
    { label: "E-mail",    url: "mailto:andrevitorsouzapereira8@gmail.com" },
  ],


  timeline: [
    { title: "Formatura Segundo Período", text: "Formei-me no segundo período.", img: "img/formaturaprezinho.jpeg" },
    { title: "Formatura 9º ano", text: "Formei-me no Ensino Fundamental.", img: "img/formatura9ano.jpeg" },
    { date: "Hoje",              title: "Estou na faculdade",              text: "Como sou hoje em dia", img: "img/principal.jpeg" },
  ],

  
};

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="#cfd8df"/>
   <text x="50%" y="50%" font-family="sans-serif" font-size="30" fill="#5b6875" text-anchor="middle">Adicione uma fotografia</text></svg>`);
document.addEventListener("error", e => {
  if (e.target.tagName === "IMG" && e.target.src !== PLACEHOLDER) e.target.src = PLACEHOLDER;
}, true);

for (const [k, v] of Object.entries(CONFIG.colors)) document.documentElement.style.setProperty("--" + k, v);
$("#brandName").textContent = CONFIG.siteName;
document.title = CONFIG.siteName + " — Minha história";
CONFIG.social.forEach(s => {
  const a = document.createElement("a");
  a.href = s.url; a.textContent = s.label; a.target = "_blank"; a.rel = "noopener";
  $("#social").append(a);
});

CONFIG.timeline.forEach(t => {
  const el = document.createElement("article");
  el.className = "tl-item";
  el.innerHTML = `<div class="tl-card"><img alt=""><div class="tl-body">
    <span class="tl-date"></span><h3></h3><p></p></div></div>`;
  $("img", el).src = t.img || PLACEHOLDER;
  $(".tl-date", el).textContent = t.date;
  $("h3", el).textContent = t.title;
  $("p", el).textContent = t.text;
  $("#timeline").append(el);
});

/* ---------- Galeria ---------- */
CONFIG.gallery.forEach(g => {
  const el = document.createElement("figure");
  el.className = "g-item";
  el.innerHTML = `<img alt=""><figcaption></figcaption>`;
  $("img", el).src = g.src || PLACEHOLDER;
  $("img", el).alt = g.caption;
  $("figcaption", el).textContent = g.caption;
  $("#gallery").append(el);
});

const lb = $("#lightbox");
$("#gallery").addEventListener("click", e => {
  const g = e.target.closest(".g-item"); if (!g) return;
  $("img", lb).src = $("img", g).src; $("p", lb).textContent = $("figcaption", g).textContent;
  lb.classList.add("open");
});
lb.onclick = () => lb.classList.remove("open");
addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("open"); });

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
}), { threshold: .12 });
$$(".section > *, .card, .tl-item, .g-item, .split > *").forEach(el => { el.classList.add("reveal"); io.observe(el); });

const nav = $("#nav"), menu = $("#menu");
addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 20), { passive: true });
$("#burger").onclick = () => menu.classList.toggle("open");
menu.onclick = () => menu.classList.remove("open");
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) $$("a", menu).forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("section[id]").forEach(s => spy.observe(s));

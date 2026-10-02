/* =====================================================
   CONFIGURAÇÕES DO PROPRIETÁRIO — edite apenas este bloco
   ===================================================== */
const WHATSAPP_NUMBER = "5586999007360";          // DDI + DDD + número, só dígitos
const WHATSAPP_MESSAGE = "Olá! Gostaria de agendar um atendimento na Naldex Car.";
const PHONE_DISPLAY   = "(86) 99900-7360";        // telefone exibido no site
const ADDRESS         = "R. Mil e Cinco - Planalto Formosa, Timon - MA, 65634-055";             // TROQUE pelo endereço completo da oficina
const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/NALDEXCAR/@-5.1107066,-42.8310087,17z/data=!3m1!4b1!4m6!3m5!1s0x78e37d7cc752b77:0xc8877340fddc9bf4!8m2!3d-5.1107066!4d-42.8310087!16s%2Fg%2F11y5vm5gq3?entry=ttu&g_ep=EgoyMDI2MDkyOS4wIKXMDSoASAFQAw%3D%3D" + encodeURIComponent(ADDRESS);
const INSTAGRAM_URL   = "https://instagram.com/naldexcar";

/* Galeria: troque os arquivos em /images ou edite esta lista */
const GALLERY = [
  { src: "img/motor.img.png", alt: "Revisão de motor" },
  { src: "img/trocar-oleo-carro.jpg", alt: "Troca de óleo" },
  { src: "img/cuidados-freio.jpg", alt: "Manutenção de freios" },
  { src: "img/suspensao.jpg", alt: "Suspensão" },
  { src: "img/diagnostico.png", alt: "Diagnóstico" },
  { src: "img/naldexcar.png", alt: "Oficina Naldex Car" }
];
/* ===================================================== */

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// Links dinâmicos
const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
$$("[data-wa]").forEach(a => a.href = waUrl);
$$("[data-maps]").forEach(a => a.href = GOOGLE_MAPS_URL);
$$("[data-ig]").forEach(a => a.href = INSTAGRAM_URL);
$$("[data-wa-text]").forEach(a => a.textContent = PHONE_DISPLAY);
$$("[data-ig-text]").forEach(a => a.textContent = "@" + INSTAGRAM_URL.split("/").filter(Boolean).pop());
$$("[data-phone]").forEach(a => { a.textContent = PHONE_DISPLAY; a.href = "tel:+" + WHATSAPP_NUMBER; });
$$("[data-addr]").forEach(el => el.textContent = ADDRESS);
$("#map").src = "https://www.google.com/maps?q=" + encodeURIComponent(ADDRESS) + "&output=embed";

// Header sólido ao rolar
const header = $(".site-header");
const onScroll = () => header.classList.toggle("solid", scrollY > 40);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// Menu mobile
const burger = $(".burger"), menu = $("#menu");
const setMenu = open => { menu.classList.toggle("open", open); burger.setAttribute("aria-expanded", open); };
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("#menu a").forEach(a => a.addEventListener("click", () => setMenu(false)));

// Galeria + lightbox
const gal = $("#gallery"), lb = $("#lightbox"), lbImg = $("img", lb);
GALLERY.forEach(({ src, alt }) => {
  const b = document.createElement("button");
  b.className = "shot"; b.type = "button"; b.setAttribute("aria-label", "Ampliar: " + alt);
  const img = new Image(); img.src = src; img.alt = alt; img.loading = "lazy";
  img.onerror = () => { img.remove(); b.classList.add("empty"); b.dataset.label = alt; };
  b.append(img);
  b.addEventListener("click", () => { if (b.classList.contains("empty")) return; lbImg.src = src; lbImg.alt = alt; lb.hidden = false; $(".lb-x").focus(); });
  gal.append(b);
});
const closeLb = () => { lb.hidden = true; lbImg.src = ""; };
lb.addEventListener("click", e => { if (e.target !== lbImg) closeLb(); });
addEventListener("keydown", e => { if (e.key === "Escape") { closeLb(); setMenu(false); } });

// Entrada suave dos cards
if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
  $$(".plate, .why-list li, .shot").forEach(el => { el.classList.add("reveal"); io.observe(el); });
}

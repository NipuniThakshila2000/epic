const nav = document.querySelector(".nav__inner");
const toggle = document.querySelector(".nav__toggle");
const menu = document.querySelector(".nav__menu");

window.addEventListener("scroll", () => {
  if (!nav) return;
  nav.classList.toggle("nav__inner--scrolled", window.scrollY > 16);
});

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    menu.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  menu.querySelectorAll("a").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

const revealTargets = document.querySelectorAll(
  ".hero__copy, .hero__visual, .panel, .experience, .gallery__grid figure, .timeline article, .membership__grid article, .contact__inner"
);

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealTargets.forEach((node) => {
  node.classList.add("will-reveal");
  observer.observe(node);
});

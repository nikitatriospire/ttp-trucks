// sticky Header scroll
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("shadow-lg");
  } else {
    header.classList.remove("shadow-lg");
  }
});

// Mobile Menu
const btn = document.getElementById("menuBtn");
const nav = document.getElementById("mobileNav");
const navLinks = nav.querySelector("ul");
const body = document.body;

// Toggle mobile menu
btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  const opening = nav.classList.contains("opacity-0");

  if (opening) {
    // OPEN MENU
    nav.classList.remove(
      "opacity-0",
      "-translate-y-200",
      "pointer-events-none"
    );
    nav.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");

    navLinks.classList.add("opacity-100", "translate-y-0");
    navLinks.classList.remove("opacity-0", "translate-y-10");

    body.classList.add("overflow-hidden");
  } else {
    // CLOSE MENU (both animate together – no jerk)
    nav.classList.add("opacity-0", "-translate-y-200", "pointer-events-none");
    nav.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");

    navLinks.classList.add("opacity-0", "translate-y-10");
    navLinks.classList.remove("opacity-100", "translate-y-0");

    btn.classList.remove("open");
    body.classList.remove("overflow-hidden");
  }
});

// Nav links click
document.querySelectorAll(".navlink").forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetID = link.getAttribute("href");
    const target = document.querySelector(targetID);

    // If ID doesn't exist → redirect
    if (!target) {
      window.location.href = "/" + targetID;
      return;
    }

    // MOBILE ONLY
    if (window.innerWidth < 1024) {
      e.preventDefault();

      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;
      const position = target.getBoundingClientRect().top + window.scrollY;

      setTimeout(() => {
        window.scrollTo({ top: position - headerHeight, behavior: "smooth" });
      }, 100);

      // Smooth close same as above — NO TIMEOUT, NO JUMP
      nav.classList.add("opacity-0", "-translate-y-200", "pointer-events-none");
      nav.classList.remove(
        "opacity-100",
        "translate-y-0",
        "pointer-events-auto"
      );

      navLinks.classList.add("opacity-0", "translate-y-10");
      navLinks.classList.remove("opacity-100", "translate-y-0");

      btn.classList.remove("open");
      body.classList.remove("overflow-hidden");
      return;
    }
  });
});

// Card title height alignment
function setEqualHeightsFor(selector) {
  const items = document.querySelectorAll(selector);

  // If screen width is below 600px → reset and exit
  if (window.innerWidth < 600) {
    items.forEach((item) => (item.style.height = "auto"));
    return;
  }

  // Reset height first
  items.forEach((item) => (item.style.height = "auto"));

  // Find max height
  let maxH = 0;
  items.forEach((item) => {
    const h = item.offsetHeight;
    if (h > maxH) maxH = h;
  });

  // Apply max height
  items.forEach((item) => (item.style.height = maxH + "px"));
}

function updateAllHeights() {
  setEqualHeightsFor(".card-title");
  setEqualHeightsFor(".card-title1");
}

// Run on load
window.addEventListener("load", updateAllHeights);

// Run on resize (with a slight delay)
window.addEventListener("resize", () => {
  setTimeout(updateAllHeights, 150);
});

//  Contact title in 3lines
// document.addEventListener("DOMContentLoaded", () => {
//   const title = document.querySelector(".contact-title");
//   if (!title) return;

//   const text = [
//     "Sie haben noch Fragen?",
//     "Schreiben Sie uns eine Nachricht",
//     "[Kontakt]",
//   ];

//   title.innerHTML = text.join("<br>");
// });

// Map js (Safe – No Console Error If Element Missing)
const mapPlaceholder = document.getElementById("mapPlaceholder");
const mapContainer   = document.getElementById("mapContainer");

if (mapPlaceholder && mapContainer) {

  mapPlaceholder.addEventListener("click", loadMap);
  mapPlaceholder.addEventListener("keypress", (e) => {
    if (e.key === "Enter") loadMap();
  });

  function loadMap() {
    const mapURL =
      "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d96479.42034098943!2d13.441293948866406!3d52.484529560817144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sMusterstra%C3%9Fe%20123%E2%80%A812345%20Berlin%2C%20Deutschland!5e1!3m2!1sen!2sin!4v1764823956291!5m2!1sen!2sin";

    mapContainer.innerHTML = `
      <iframe 
        title="Google Maps Standort Berlin"
        aria-label="Google Maps Standort Berlin"
        src="${mapURL}"
        width="100%"
        height="500"
        loading="lazy"
        style="border:0;"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    `;

    mapPlaceholder.classList.add("hidden");
    mapContainer.classList.remove("hidden");
  }
}


// back to top
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  backToTopButton.classList.toggle("hidden", window.scrollY < 100);
}, { passive: true });

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/*==============================
= Sticky Header
==============================*/
const header = document.querySelector("header");
if (header) {
  window.addEventListener("scroll", () => {
    header.classList.toggle("shadow-lg", window.scrollY > 10);
  });
}


/*==============================
= Mobile Menu
==============================*/
const btn = document.getElementById("menuBtn");
const nav = document.getElementById("mobileNav");

if (btn && nav) {
  const navLinks = nav.querySelector("ul");
  const body = document.body;

  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    const opening = nav.classList.contains("opacity-0");

    if (opening) {
      nav.classList.remove("opacity-0","-translate-y-200","pointer-events-none");
      nav.classList.add("opacity-100","translate-y-0","pointer-events-auto");

      navLinks && navLinks.classList.add("opacity-100","translate-y-0");
      navLinks && navLinks.classList.remove("opacity-0","translate-y-10");

      body.classList.add("overflow-hidden");

    } else {
      nav.classList.add("opacity-0","-translate-y-200","pointer-events-none");
      nav.classList.remove("opacity-100","translate-y-0","pointer-events-auto");

      navLinks && navLinks.classList.add("opacity-0","translate-y-10");
      navLinks && navLinks.classList.remove("opacity-100","translate-y-0");

      btn.classList.remove("open");
      body.classList.remove("overflow-hidden");
    }
  });


  // Smooth Scroll Links (Mobile-enabled)
  document.querySelectorAll(".navlink").forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      if (window.innerWidth < 1024) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const position = target.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({ top: position - headerHeight, behavior:"smooth" });

        nav.classList.add("opacity-0","-translate-y-200","pointer-events-none");
        nav.classList.remove("opacity-100","translate-y-0","pointer-events-auto");

        btn.classList.remove("open");
        document.body.classList.remove("overflow-hidden");
      }
    });
  });
}


/*==============================
= Equal Card Heights
==============================*/
function setEqualHeightsFor(selector){
  const items=document.querySelectorAll(selector);
  if(items.length===0) return;  // prevent console error

  if(window.innerWidth < 600){
    items.forEach(i=>i.style.height="auto");
    return;
  }

  let maxH=0;
  items.forEach(i=>{ i.style.height="auto"; if(i.offsetHeight>maxH) maxH=i.offsetHeight; });
  items.forEach(i=>i.style.height=maxH+"px");
}

function updateAllHeights(){
  setEqualHeightsFor(".card-title");
  setEqualHeightsFor(".card-title1");
}

window.addEventListener("load", updateAllHeights);
window.addEventListener("resize", ()=>setTimeout(updateAllHeights,150));


/*==============================
= Contact Title — only if exists
==============================*/
const contactTitle=document.querySelector(".contact-title");
if(contactTitle){
  contactTitle.innerHTML =
    "Sie haben noch Fragen?<br>Schreiben Sie uns eine Nachricht<br>[Kontakt]";
}


/*==============================
= MAP — runs only if placeholder exists
==============================*/
const mapPlaceholder=document.getElementById("mapPlaceholder");
const mapContainer=document.getElementById("mapContainer");

if(mapPlaceholder && mapContainer){
  const loadMap=()=>{
    mapContainer.innerHTML=`<iframe
      src="https://www.google.com/maps/embed?pb=!1m16!... "
      width="100%" height="500" style="border:0;" loading="lazy"></iframe>`;
    mapPlaceholder.classList.add("hidden");
    mapContainer.classList.remove("hidden");
  };

  mapPlaceholder.addEventListener("click",loadMap);
  mapPlaceholder.addEventListener("keypress",e=>{ if(e.key==="Enter") loadMap(); });
}


/*==============================
= Back to Top — safe execution
==============================*/
const backToTopButton=document.getElementById("back-to-top");
if(backToTopButton){
  window.addEventListener("scroll",()=>backToTopButton.classList.toggle("hidden",window.scrollY<100),{passive:true});
  backToTopButton.addEventListener("click",()=> window.scrollTo({top:0,behavior:"smooth"}));
}

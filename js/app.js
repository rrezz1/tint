const DEADLINE = new Date("2026-09-05T14:00:00");
const LINKS = [
  ["index.html", "Kryesore"],
  ["python.html", "Python"],
  ["live.html", "Live kod"],
  ["detyra.html", "Detyra"],
  ["detyra-python.html", "20 Python"],
  ["detyra-sql.html", "16 SQL"],
  ["detyra-web.html", "16 Web"],
  ["frameworks.html", "Django / FastAPI"],
  ["api.html", "REST"],
  ["sql.html", "SQL"],
  ["frontend.html", "Frontend"],
  ["git.html", "Git"],
  ["debug.html", "Debug"],
  ["sjellja.html", "Sjellja"],
  ["anglisht.html", "English"],
  ["kuiz.html", "Kuiz"],
];

(function nav() {
  const nav = document.querySelector("header.top nav");
  if (!nav) return;
  const here = (location.pathname.split("/").pop() || "index.html").replace(/^\s*$/, "index.html");
  const file = here || "index.html";
  nav.innerHTML = LINKS.map(([href, label]) => {
    const active = file === href || (file === "" && href === "index.html");
    return '<a class="' + (active ? "active" : "") + '" href="' + href + '">' + label + "</a>";
  }).join("");
})();

function pad(n) {
  return String(n).padStart(2, "0");
}

function tickClock() {
  const el = document.querySelector("[data-countdown]");
  if (!el) return;
  const now = new Date();
  let ms = DEADLINE - now;
  if (ms < 0) {
    el.textContent = "Afati i mesimit ka mbaruar — shko te intervista.";
    return;
  }
  const h = Math.floor(ms / 3600000);
  ms -= h * 3600000;
  const m = Math.floor(ms / 60000);
  ms -= m * 60000;
  const s = Math.floor(ms / 1000);
  el.innerHTML = "Kane mbetur <b>" + h + "</b> ore <b>" + pad(m) + "</b>:" + pad(s);
}

tickClock();
setInterval(tickClock, 1000);

const PLAN_KEY = "tint-plan";
function loadPlan() {
  const saved = JSON.parse(localStorage.getItem(PLAN_KEY) || "{}");
  document.querySelectorAll("[data-plan]").forEach((box) => {
    box.checked = Boolean(saved[box.dataset.plan]);
    box.addEventListener("change", () => {
      saved[box.dataset.plan] = box.checked;
      localStorage.setItem(PLAN_KEY, JSON.stringify(saved));
    });
  });
}
loadPlan();

document.querySelectorAll("[data-reveal]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.reveal);
    if (target) target.classList.toggle("show");
  });
});

document.querySelectorAll("[data-quiz]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const correct = form.dataset.quiz;
    const picked = new FormData(form).get("a");
    const out = form.querySelector(".result");
    if (!picked) {
      out.textContent = "Zgjidh nje pergjigje.";
      out.className = "result bad";
      return;
    }
    if (picked === correct) {
      out.textContent = "Sakt. Kjo eshte pergjigja qe pret nje tech lead.";
      out.className = "result good";
    } else {
      out.textContent = "Jo sakte. Hap shpjegimin poshte dhe provo perseri.";
      out.className = "result bad";
    }
  });
});

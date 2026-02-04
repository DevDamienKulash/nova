const pageTopVarByPage = {
  home: "var(--page-top-home)",
  about: "var(--page-top-about)",
  contact: "var(--page-top-contact)",
};

function setPage(page) {
  // Active page
  document.querySelectorAll(".page").forEach((el) => {
    el.classList.toggle("active", el.dataset.page === page);
  });

  // Active nav button
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.target === page);
  });

  // Gradient
  const top = pageTopVarByPage[page] ?? pageTopVarByPage.home;
  document.documentElement.style.setProperty("--page-top", top);
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn[data-target]");
  if (!btn) return;
  setPage(btn.dataset.target);
  location.hash = btn.dataset.target;
});

// Prevent form submits from reloading page (Home chat + Contact input)
document.addEventListener("submit", (e) => {
  if (e.target.matches(".chat-input, .contact-input")) {
    e.preventDefault();
    e.target.querySelector("input")?.focus();
  }
});

// Optional: set initial page based on URL hash (#home/#about/#contact)
function initFromHash() {
  const hash = (location.hash || "#home").replace("#", "");
  if (hash === "home" || hash === "about" || hash === "contact") setPage(hash);
}
window.addEventListener("hashchange", initFromHash);
initFromHash();
// Chat box loading symbol
function setChatLoading(isLoading) {
  const el = document.querySelector(".chat-loading");
  if (!el) return;
  el.hidden = !isLoading;
}

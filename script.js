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

// Chat box loading symbol
function setChatLoading(isLoading) {
  const el = document.querySelector(".chat-loading");
  if (!el) return;
  el.hidden = !isLoading;
}

// ---- CHAT: Nova backend integration ----
const API_URL = "http://localhost:3000/api/chat";
let chatHistory = []; // [{role:'user'|'assistant', content:string}]

function addMessage(role, text) {
  const messages = document.querySelector(".chat-messages");
  if (!messages) return;

  const div = document.createElement("div");
  div.className = `msg ${role}`;
  div.textContent = text;
  messages.appendChild(div);

  // Keep latest messages visible
  messages.scrollTop = messages.scrollHeight;
}

async function sendToNova(userText) {
  const persona = document.querySelector("#persona")?.value || "calm";

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: userText,
      persona,
      history: chatHistory,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to get response.");
  }

  return res.json();
}

document.addEventListener("submit", async (e) => {
  // Contact form stays “prevent reload” for now
  if (e.target.matches(".contact-input")) {
    e.preventDefault();
    e.target.querySelector("input")?.focus();
    return;
  }

  // Home chat
  if (e.target.matches(".chat-input")) {
    e.preventDefault();

    const input = e.target.querySelector(".chat-text");
    const text = (input?.value || "").trim();
    if (!text) return;

    // UI: add user message
    addMessage("user", text);
    chatHistory.push({ role: "user", content: text });
    input.value = "";

    // UI: loading dots
    setChatLoading(true);

    try {
      const data = await sendToNova(text);
      const reply = (data.reply || "").trim() || "…";
      addMessage("assistant", reply);
      chatHistory.push({ role: "assistant", content: reply });
    } catch (err) {
      addMessage(
        "assistant",
        "Nova couldn’t respond. Check the server console.",
      );
      console.error(err);
    } finally {
      setChatLoading(false);
      input?.focus();
    }
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

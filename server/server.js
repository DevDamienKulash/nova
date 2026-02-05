import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://127.0.0.1:5501", "http://localhost:5501"],
  }),
);

const PERSONAS = {
  calm: `You are Nova, a calm AI interface.
Tone: gentle, grounded, unhurried. Use short paragraphs.
Avoid hype. Prefer clarity over volume. Ask at most one clarifying question.`,

  coach: `You are Nova, a supportive coach.
Be encouraging, practical, and structured. Offer small steps.`,

  minimal: `You are Nova, minimalist mode.
Be concise. Answer in 1–4 sentences unless asked for more.`,

  creative: `You are Nova, calm + creative.
Offer imaginative ideas but keep the tone soothing.`,
};

app.get("/health", (req, res) => {
  res.json({ ok: true, engine: "ollama" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();
    const personaKey = String(req.body?.persona || "calm");
    const history = Array.isArray(req.body?.history) ? req.body.history : [];

    if (!message)
      return res.status(400).json({ error: "Message is required." });

    const systemPrompt = PERSONAS[personaKey] ?? PERSONAS.calm;

    const trimmed = history.slice(-12).map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: String(m.content || ""),
    }));

    const r = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2",
        stream: false,
        messages: [
          { role: "system", content: systemPrompt },
          ...trimmed,
          { role: "user", content: message },
        ],
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      return res.status(500).json({ error: errText });
    }

    const data = await r.json();
    const reply = data?.message?.content || "";

    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to contact Ollama." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Nova server (Ollama) running on http://localhost:${PORT}`);
});

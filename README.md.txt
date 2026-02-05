Nova

Nova is a calm AI interface exploration focused on clarity, restraint, and intentional interaction.
Rather than optimizing for speed or volume, Nova is designed to create space for thought — treating conversation as something to be experienced, not rushed.

This project combines a minimal, glass-based UI with a local AI backend powered by Ollama.

Features

Calm, distraction-free chat interface

Subtle motion and glassmorphism UI

Local AI chatbot with personality modes

No API keys, no usage limits

Fully offline-capable once set up

Tech Stack
Frontend

HTML

CSS

Vanilla JavaScript

Spline (3D background)

Backend

Node.js

Express

Ollama (local LLM runtime)

AI

Local LLMs via Ollama (e.g. llama3.2)

Persona-driven system prompts (Calm, Coach, Minimal, Creative)

Project Structure
nova/
├─ index.html
├─ styles.css
├─ script.js
├─ server/
│  ├─ server.js
│  ├─ package.json
│  ├─ package-lock.json
│  └─ .gitignore
└─ README.md

Running Nova Locally
1. Install prerequisites

Node.js (v18 or newer)

Ollama (https://ollama.com
)

2. Download an AI model

In a terminal:

ollama pull llama3.2


You can substitute other models if desired (e.g. mistral, gemma).

3. Start the backend server

From the project root:

cd server
npm install
npm run dev


You should see:

Nova server (Ollama) running on http://localhost:3000


Optional health check:

Open http://localhost:3000/health

4. Start the frontend

Open index.html using:

VS Code Live Server
or

Any static file server of your choice

The frontend communicates with the local backend at:

http://localhost:3000/api/chat

Personality Modes

Nova supports multiple conversation styles, selectable in the UI:

Calm — gentle, grounded, unhurried

Coach — supportive, structured guidance

Minimal — concise, low-verbosity responses

Creative — imaginative but restrained

Each mode adjusts the system prompt sent to the local model.

Why Local AI?

Nova intentionally uses a local LLM instead of a hosted API to:

Avoid usage limits and billing complexity

Keep experimentation friction-free

Allow offline development

Emphasize thoughtful interaction over scale

The backend is designed so hosted models can be swapped in later if needed.

Status

Nova is an ongoing exploration.
The current focus is on:

interaction quality

visual calm

system restraint

Future improvements may include streaming responses, session memory controls, and expanded personality tuning.

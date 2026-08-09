<div align="center">

# 🏙️ InsightEdge

### AI-powered career guidance for Smart Cities and urban technology

[![Live App](https://img.shields.io/badge/Live%20App-Vercel-black?logo=vercel)](https://insightedge-app.vercel.app)
[![Career API](https://img.shields.io/badge/Career%20API-Render-46E3B7?logo=render)](https://insightedge-career-api-1c5u.onrender.com)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)](https://fastapi.tiangolo.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#)

InsightEdge helps students and professionals discover careers in **Smart Cities and urban development** — parse your resume, find your skill gaps, match with real career paths, and chat with an AI career advisor.

[**🔗 Try it live**](https://insightedge-app.vercel.app) · [Report a bug](../../issues) · [Request a feature](../../issues)

</div>

---

## 📋 Table of Contents

- [Live Deployment](#-live-deployment)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Deployment Guide](#-deployment-guide)
- [Troubleshooting](#-troubleshooting)
- [Helpful Commands](#-helpful-commands)

---

## 🚀 Live Deployment

| Service | URL | Hosted on |
|---|---|---|
| 🌐 **App** (frontend + AI chat) | [insightedge-app.vercel.app](https://insightedge-app.vercel.app) | Vercel |
| ⚙️ **Career API** (backend) | [insightedge-career-api-1c5u.onrender.com](https://insightedge-career-api-1c5u.onrender.com) | Render |

> **⏱️ Heads up:** The Career API runs on Render's free tier, which sleeps after periods of inactivity. The **first request** after idle time may take 30–60 seconds to wake it up — this is expected, not a bug.

---

## ✨ Key Features

| | Feature | Description |
|---|---|---|
| 📄 | **Resume Parsing** | Upload a PDF resume and get AI-powered skill and experience extraction |
| 🔗 | **LinkedIn Analysis** | Link a LinkedIn profile for the same analysis, no PDF needed |
| 🎯 | **Career Matching** | Discover Smart City roles that match your current skill set |
| 📊 | **Skill Gap Analysis** | See exactly what's missing between you and your target role |
| 🤝 | **Peer Network** | Connect with peers who can teach you what you're missing |
| 🌍 | **Global Skill Arbitrage** | Compare opportunities and salaries across regions |
| 💬 | **AI Career Chatbot** | Chat with a Gemini-powered assistant for career guidance |
| 📰 | **Industry News** | Curated Smart Cities and urban tech news |

---

## 🛠️ Tech Stack

```
Frontend        React 18 · Vite · TypeScript · Tailwind CSS
Auth            Firebase Authentication
Career Backend  FastAPI (Python) · PyMuPDF → deployed on Render
AI Chatbot      Gemini API → Vercel Serverless Function (prod) / Express (local dev)
```

---

## ⚡ Quick Start

### 1. Clone and install

```bash
git clone https://github.com/BhavikaSainani/insightEdge.git
cd insightEdge
npm install
```

### 2. Set up the Python backend

```bash
cd career_api
python -m pip install -r requirements.txt
cd ..
```

### 3. Add environment variables

Create a `.env` file in the project root — see [Environment Variables](#-environment-variables) below for the full list.

### 4. Run everything

Open **three terminals**:

```bash
# Terminal 1 — Career API (Python)
cd career_api && python main.py
# → http://localhost:8000

# Terminal 2 — AI Chat server (Node)
npm run server
# → http://localhost:3001

# Terminal 3 — Frontend
npm run dev
# → http://localhost:8080
```

Open **http://localhost:8080** and you're good to go. 🎉

---

## 🔑 Environment Variables

Create a `.env` file in the project root:

```env
# ── Gemini API (for ChatBot) ──────────────────────────────
GEMINI_API_KEY=your_gemini_api_key_here

# ── Firebase (from Firebase Console → Project Settings) ──
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# ── NewsAPI (for live news) ───────────────────────────────
# Note: NewsAPI's free tier only allows requests from localhost
VITE_NEWSAPI_KEY=your_newsapi_key_here

# ── Optional (local only) ─────────────────────────────────
# Point the frontend at a deployed Career API instead of localhost:8000
# VITE_CAREER_API_URL=https://insightedge-career-api-1c5u.onrender.com
```

<details>
<summary>Where do I get these keys?</summary>

<br>

| Key | Where to get it |
|---|---|
| `GEMINI_API_KEY` | [Google AI Studio → API Keys](https://aistudio.google.com/app/apikey) (free) |
| `VITE_FIREBASE_*` | [Firebase Console](https://console.firebase.google.com) → your project → Project Settings → Your apps → SDK config |
| `VITE_NEWSAPI_KEY` | [NewsAPI.org](https://newsapi.org/register) (free tier, localhost only) |

</details>

---

## 📁 Project Structure

```
insightEdge/
├── api/
│   └── chat.ts              # Vercel Serverless Function (production chatbot)
├── career_api/               # Python FastAPI backend
│   ├── main.py
│   └── requirements.txt
├── src/
│   ├── pages/                # Route-level components (ChatBot, Upload, etc.)
│   └── services/
│       └── careerService.ts  # Talks to the Career API
├── server.ts                  # Express chatbot server (local dev only)
├── vite.config.ts             # Dev proxy: /api/chat → :3001, /api → :8000
├── vercel.json                 # SPA rewrite for production routing
└── render.yaml                 # Render Blueprint config
```

---

## 🌍 Deployment Guide

<details>
<summary><b>1. Deploy the Career API → Render</b></summary>

<br>

Create a new **Web Service** on [Render](https://render.com):

| Setting | Value |
|---|---|
| Root Directory | `career_api` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| Instance Type | Free |

Copy the live URL once deployed — you'll need it in the next step.

</details>

<details>
<summary><b>2. Deploy the Frontend + Chatbot → Vercel</b></summary>

<br>

Vercel auto-detects the Vite frontend and hosts `api/chat.ts` as a Serverless Function automatically. `vercel.json` handles SPA routing so client-side routes don't 404 on refresh.

**Add these environment variables** in Vercel → Settings → Environment Variables:

- `GEMINI_API_KEY`
- `VITE_CAREER_API_URL` — the Render URL from step 1
- All `VITE_FIREBASE_*` variables
- `VITE_NEWSAPI_KEY` *(optional)*

> ⚠️ **After adding or changing env vars, trigger a Redeploy.** Vercel does not apply variable changes to existing builds.

</details>

<details>
<summary><b>3. Authorize your domain with Firebase & Google Cloud</b></summary>

<br>

- **Firebase Console** → Authentication → Settings → Authorized domains → add your Vercel domain
- **Google Cloud Console** → APIs & Services → Credentials → (the Firebase-created API key) → HTTP referrer restrictions → add your Vercel domain (`https://your-app.vercel.app/*`)

Without this, login/signup will fail with a `requests-from-referer` error.

</details>

---

## 🩺 Troubleshooting

| Problem | Fix |
|---|---|
| Career API unavailable *(local)* | Make sure `python main.py` is running from `career_api/` on port **8000** |
| Career API unavailable *(production)* | Render free tier sleeps after inactivity — first request can take 30–60s |
| AI Chat fails *(local)* | Make sure `npm run server` is running and `GEMINI_API_KEY` is set in `.env` |
| AI Chat fails *(production)* | Check `GEMINI_API_KEY` in Vercel env vars, then redeploy |
| Login fails with a referer error | Add your domain to Firebase Authorized Domains **and** the API key's HTTP referrer restrictions |
| Career features 404 in production | `VITE_CAREER_API_URL` missing or not picked up — check it's set in Vercel, then redeploy |
| Frontend errors *(local)* | Restart `npm run dev` after both backends are running |

---

## 🧰 Helpful Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the frontend dev server |
| `npm run server` | Start the local Node AI chat backend |
| `python main.py` | Start the Python Career API (from `career_api/`) |
| `npm run build` | Build the frontend for production |
| `npm run test` | Run the test suite |

---

<div align="center">

Built with ❤️ for future Smart City builders.

</div>
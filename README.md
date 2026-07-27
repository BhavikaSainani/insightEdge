# InsightEdge 

> **AI-Powered Career Navigator for the Smart City Ecosystem**

InsightEdge is a premium career guidance platform specifically designed for professionals and students entering the **Smart Cities & Urban Technology** domain. It combines traditional resume parsing with modern AI intelligence to provide a holistic career growth experience.

---

## Key Features

- **Multi-Source Entry**: Upload traditional **PDF Resumes** or link your **LinkedIn Profile** for instant analysis.
- **Smart Career Match**: Discover 10+ specialized Smart City roles (e.g., Urban Data Scientist, GIS Analyst, IoT Engineer) with deterministic relevancy scoring.
- **Skill Gap Visualization**: High-fidelity Radar charts comparing your current skills against industry-standard requirements.
- **AI Career Chatbot**: A Gemini-powered companion for career advice, supporting both **Text and Voice** input.
- **Real-Time News Hub**: Live industry updates aggregated from NewsAPI and curated Smart City RSS feeds.
- **Learning Roadmaps**: Direct links to free Indian Government courses (**SWAYAM**) and specialized Udemy paths.

---

## Tech Stack

### Frontend
- **Framework**: React 18 (Vite) + TypeScript
- **Styling**: Tailwind CSS + Framer Motion (Animations)
- **Viz**: Recharts (Radar/Progress)

### Backend Services (Dual-Stack)
- **Career Backend**: FastAPI (Python) - *Resume parsing & Matching*
- **AI Middleware**: Node.js (Express) - *Gemini AI integration*

### AI & Data
- **LLM**: Google Gemini 1.5/2.0
- **Parsing**: PyMuPDF (fitz)
- **External**: NewsAPI, SWAYAM/NPTEL API

---

## Setup & Local Development

Follow these steps to get the full platform running on your machine.

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/BhavikaSainani/insightEdge.git
cd insightEdge

# Install Frontend & Node dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# AI Middleware (Node)
GEMINI_API_KEY=AIzaSyCmHHEFcueKK_OTL87MjG-jP_T8YTpEzLs

# Frontend (Vite)
VITE_NEWSAPI_KEY=b196ecf403174c82857f0b691c6c119c
```

### 3. Start the Backend Services
You need to run **two** backend servers for full functionality:

**A. Python Career API (Port 8001)**
```bash
cd career_api
pip install -r requirements.txt
python main.py
```

**B. Node.js AI Server (Port 3001)**
```bash
# From the project root
npm run dev:server
# OR
node server.ts
```

### 4. Start the Frontend
```bash
# From the project root
npm run dev
```
Open [http://localhost:8080](http://localhost:8080) to view the app!

---

##  Test Credentials
InsightEdge currently uses a local session-based approach and does not require a database login for the primary features. 
- **User Access**: Guest access enabled by default.
- **Mock Data**: For LinkedIn integration tests, you can use any valid `linkedin.com/in/...` URL.

---

##  Basic Error Handling

| Issue | Solution |
| :--- | :--- |
| **"Could not connect to Career API"** | Ensure the Python server is running on port **8001**. |
| **"AI Chat unavailable"** | Ensure the Node server is running on port **3001** and your `GEMINI_API_KEY` is valid. |
| **News not loading** | Check your `VITE_NEWSAPI_KEY` or wait for the system to fallback to RSS feeds. |

---

##  Security
- **No Secrets**: This repository uses `.gitignore` to ensure no active API keys or environment secrets are committed.
- **Environment Management**: All sensitive keys are managed via local `.env` files.



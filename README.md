# InsightEdge

> AI-powered career guidance for Smart Cities and urban technology.

InsightEdge combines resume parsing, skill analysis, career path matching, and a career chatbot to help users discover Smart City career opportunities.

---

## Key Features

- Upload **PDF resumes** for AI resume parsing and skill extraction
- Link **LinkedIn profiles** for profile analysis
- Discover **career matches** in Smart City roles
- Analyze **skill gaps** and next learning steps
- Chat with an AI career assistant powered by Gemini
- View **industry news** and career insights

---

## Tech Stack

- Frontend: **React 18 + Vite + TypeScript**
- Styling: **Tailwind CSS**
- Career backend: **FastAPI (Python)**
- AI chat backend: **Express / Node.js**
- PDF parsing: **PyMuPDF**

---

## Local Setup

### 1. Install dependencies
```bash
cd D:\Projects\insightEdge
npm install
```

### 2. Install Python backend dependencies
```bash
cd career_api
python -m pip install -r requirements.txt
```

### 3. Configure environment variables
Create a `.env` file in the root folder:
```env
GEMINI_API_KEY=your_gemini_api_key_here
VITE_NEWSAPI_KEY=your_newsapi_key_here
```

### 4. Start the backend services

#### Python Career API
```bash
cd D:\Projects\insightEdge\career_api
python main.py
```
This backend listens on **http://localhost:8000**.

#### Node AI Chat Server
```bash
cd D:\Projects\insightEdge
npm run server
```
This server listens on **http://localhost:3001**.

### 5. Start the frontend
```bash
cd D:\Projects\insightEdge
npm run dev
```
Open **http://localhost:8080** in your browser.

---

## Notes

- The frontend proxies Career API calls to **http://localhost:8000**.
- The chat feature calls **http://localhost:3001/api/chat** in development.
- Keep both backend servers running for full AI and resume upload functionality.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Career API unavailable | Make sure `python main.py` is running from `career_api/` on port **8000** |
| AI Chat fails | Make sure `npm run server` is running and `GEMINI_API_KEY` is set |
| Frontend errors | Restart `npm run dev` after starting both backends |

---

## Helpful commands

- `npm run dev` — start the frontend
- `npm run server` — start the Node AI backend
- `python main.py` — start the Python career backend



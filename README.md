# InsightEdge 🌱

> AI-Powered Career Advisor for Smart Cities Professionals

InsightEdge helps professionals discover career opportunities in the Smart Cities domain by analyzing resumes, identifying skill gaps, and providing personalized roadmaps.

## ✨ Features

- **Resume Upload & Analysis** - AI-powered parsing using FastAPI backend
- **Career Match** - Find roles matching your skills
- **Skill Gap Analysis** - Identify areas for improvement
- **Personalized Roadmaps** - Step-by-step career progression
- **Real-time News** - Live updates from Smart Cities industry (RSS feeds)
- **Sentiment Analysis** - Analyze career-related content
- **AI ChatBot** - Career advice with voice input support

## 🛠️ Tech Stack

| Frontend | Backend | ML/AI |
|----------|---------|-------|
| React + Vite | FastAPI (Python) | LangChain |
| TypeScript | Uvicorn | RAG Pipeline |
| Tailwind CSS | Firebase | Speech Recognition |
| shadcn/ui | NewsAPI | PyMuPDF |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- NewsAPI Key (optional, for live news)

### 1. Frontend Setup
```bash
git clone https://github.com/BhavikaSainani/insightEdge.git
cd insightEdge
npm install
```

### 2. Backend Setup
```bash
cd career_api
pip install -r requirements.txt
python main.py  # Runs on port 8001
```

### 3. Environment Variables
Create `.env` in the project root:
```env
VITE_NEWSAPI_KEY=your_newsapi_key_here
```

### 4. Run Development Server
```bash
npm run dev  # Frontend at http://localhost:8080
```

## 📁 Project Structure

```
insightEdge/
├── src/
│   ├── pages/           # React pages
│   ├── components/      # UI components
│   ├── lib/             # News & utility services
│   └── services/        # API services
├── career_api/          # FastAPI backend
│   ├── main.py          # API endpoints
│   └── utils/           # ML utilities
└── public/              # Static assets
```

## 🌐 Deployment

- **Frontend**: Deploy to Vercel or Netlify
- **Backend**: Deploy to Railway, Render, or any Python host

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

Built with 💚 for Smart City professionals

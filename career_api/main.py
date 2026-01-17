"""
Career API - FastAPI Microservice
Provides resume parsing and AI-powered career guidance
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import os
import shutil
import logging

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Import our modules
from utils.pdf_parser import extract_text_from_pdf
from utils.resume_parser import parse_resume, analyze_resume_quality

# Create FastAPI app
app = FastAPI(
    title="Career Advisor API",
    description="AI-powered resume parsing and career guidance",
    version="1.0.0"
)

# Add CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Store current session data
current_session = {
    "resume_path": None,
    "resume_data": None,
    "raw_text": None
}

# Pydantic models
class ChatRequest(BaseModel):
    question: str

class SkillsGapRequest(BaseModel):
    target_role: str

class CareerAdviceResponse(BaseModel):
    answer: str
    rag_used: bool = False

# ============ API Endpoints ============

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Career Advisor API",
        "features": ["resume_parsing", "skills_analysis", "career_guidance"]
    }


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    """Upload and parse a resume PDF"""
    
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        # Save uploaded file
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        logger.info(f"Resume uploaded: {file_path}")
        
        # Extract text from PDF
        raw_text = extract_text_from_pdf(file_path)
        
        if not raw_text:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
        
        logger.info(f"Extracted {len(raw_text)} characters from PDF")
        
        # Parse resume
        parsed_data = parse_resume(raw_text)
        
        # Analyze quality
        quality = analyze_resume_quality(parsed_data)
        
        # Store in session
        current_session["resume_path"] = file_path
        current_session["resume_data"] = parsed_data
        current_session["raw_text"] = raw_text
        
        return {
            "success": True,
            "message": "Resume uploaded and parsed successfully",
            "filename": file.filename,
            "characters_extracted": len(raw_text),
            "skills_found": len(parsed_data.get("skills", [])),
            "projects_found": len(parsed_data.get("projects", [])),
            "quality": quality
        }
        
    except Exception as e:
        logger.error(f"Error processing resume: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/analyze-resume")
async def analyze_resume():
    """Get detailed resume analysis"""
    
    if not current_session["resume_data"]:
        raise HTTPException(status_code=400, detail="No resume uploaded. Please upload a resume first.")
    
    parsed_data = current_session["resume_data"]
    quality = analyze_resume_quality(parsed_data)
    
    return {
        "contact": parsed_data.get("contact", {}),
        "education": parsed_data.get("education", []),
        "experience": parsed_data.get("experience", []),
        "projects": parsed_data.get("projects", []),
        "skills": parsed_data.get("skills", []),
        "certifications": parsed_data.get("certifications", []),
        "achievements": parsed_data.get("achievements", []),
        "quality_analysis": quality,
        "metadata": parsed_data.get("metadata", {})
    }


@app.post("/skills-gap")
async def skills_gap_analysis(request: SkillsGapRequest):
    """Analyze skills gap for a target role"""
    
    if not current_session["resume_data"]:
        raise HTTPException(status_code=400, detail="No resume uploaded. Please upload a resume first.")
    
    target_role = request.target_role.lower()
    current_skills = set(skill.lower() for skill in current_session["resume_data"].get("skills", []))
    
    # Smart City Role skill requirements
    role_skills = {
        # Smart City Specific Roles
        "smart city analyst": ["data analysis", "python", "gis", "urban planning", "iot", "data visualization", "statistics", "public policy"],
        "urban data scientist": ["python", "machine learning", "gis", "spatial analysis", "statistics", "data visualization", "urban analytics", "sql"],
        "urban planner (tech-enabled)": ["urban planning", "gis", "data analysis", "public policy", "sustainability", "transportation planning", "community engagement"],
        "smart infrastructure engineer": ["iot", "sensors", "networking", "cloud computing", "data engineering", "embedded systems", "smart grid"],
        "gis analyst": ["gis", "spatial analysis", "python", "arcgis", "qgis", "remote sensing", "cartography", "data visualization"],
        "transportation systems analyst": ["traffic modeling", "urban mobility", "data analysis", "gis", "transportation planning", "simulation", "python"],
        "sustainability analyst": ["sustainability metrics", "environmental science", "data analysis", "carbon footprint", "energy optimization", "reporting"],
        "energy systems engineer": ["smart grid", "energy optimization", "renewable energy", "power systems", "iot", "data analysis", "electrical engineering"],
        "iot engineer (smart cities)": ["iot", "sensors", "embedded systems", "networking", "cloud platforms", "data streaming", "python", "mqtt"],
        "civic tech developer": ["python", "javascript", "api development", "open data", "civic engagement", "web development", "data visualization"],
        "urban ai engineer": ["machine learning", "deep learning", "python", "computer vision", "urban analytics", "tensorflow", "data engineering"],
        
        # Fallback general roles
        "data scientist": ["python", "sql", "machine learning", "statistics", "data visualization"],
        "software engineer": ["programming", "data structures", "algorithms", "system design", "git"],
    }
    
    required_skills = role_skills.get(target_role, ["data analysis", "python", "communication", "problem solving", "gis"])
    
    # Find matching and missing skills
    matching_skills = []
    missing_skills = []
    
    for skill in required_skills:
        if any(skill in cs for cs in current_skills):
            matching_skills.append(skill)
        else:
            missing_skills.append(skill)
    
    # Calculate match percentage
    match_percentage = (len(matching_skills) / len(required_skills)) * 100 if required_skills else 0
    
    # Generate recommendations
    recommendations = []
    for skill in missing_skills[:5]:  # Top 5 missing skills
        recommendations.append(get_skill_recommendation(skill))
    
    return {
        "target_role": request.target_role,
        "current_skills": list(current_session["resume_data"].get("skills", [])),
        "required_skills": required_skills,
        "matching_skills": matching_skills,
        "missing_skills": missing_skills,
        "match_percentage": round(match_percentage, 1),
        "recommendations": recommendations,
        "readiness": "High" if match_percentage >= 70 else "Medium" if match_percentage >= 40 else "Low"
    }


@app.get("/career-paths")
async def get_career_paths():
    """Get Smart City career path suggestions based on current skills"""
    
    if not current_session["resume_data"]:
        raise HTTPException(status_code=400, detail="No resume uploaded. Please upload a resume first.")
    
    skills = set(skill.lower() for skill in current_session["resume_data"].get("skills", []))
    skills_text = " ".join(skills)
    
    career_paths = []
    
    # Smart City Career Paths based on skills
    
    # Urban Data Scientist - for data/ML skills
    if any(s in skills for s in ["python", "machine learning", "data science", "statistics", "data analysis"]):
        career_paths.append({
            "title": "Urban Data Scientist",
            "match": "High",
            "description": "Apply data science and ML to solve urban challenges and improve city services",
            "next_steps": ["Learn GIS & Spatial Analysis", "Study Urban Analytics", "Build city data projects"]
        })
    
    # GIS Analyst - for mapping/spatial skills
    if any(s in skills for s in ["gis", "mapping", "spatial", "arcgis", "qgis", "geography"]):
        career_paths.append({
            "title": "GIS Analyst",
            "match": "High",
            "description": "Analyze spatial data to support urban planning and city operations",
            "next_steps": ["Master ArcGIS/QGIS", "Learn Remote Sensing", "Study Urban Geography"]
        })
    
    # Smart City Analyst - for general data/analysis skills
    if any(s in skills for s in ["data analysis", "excel", "sql", "tableau", "power bi", "visualization"]):
        career_paths.append({
            "title": "Smart City Analyst",
            "match": "High",
            "description": "Analyze city data to drive smarter urban planning and policy decisions",
            "next_steps": ["Learn GIS Tools", "Study Urban Planning Basics", "Understand IoT & Sensors"]
        })
    
    # Transportation Systems Analyst
    if any(s in skills for s in ["transportation", "traffic", "mobility", "logistics", "simulation"]):
        career_paths.append({
            "title": "Transportation Systems Analyst",
            "match": "High",
            "description": "Optimize transportation networks and urban mobility systems",
            "next_steps": ["Learn Traffic Modeling", "Study Urban Mobility Analytics", "Master Simulation Tools"]
        })
    
    # IoT Engineer (Smart Cities)
    if any(s in skills for s in ["iot", "embedded", "sensors", "arduino", "raspberry", "networking", "hardware"]):
        career_paths.append({
            "title": "IoT Engineer (Smart Cities)",
            "match": "High",
            "description": "Design and deploy IoT sensor networks for smart city infrastructure",
            "next_steps": ["Learn MQTT & Data Streaming", "Study Cloud Platforms", "Build Smart Sensor Projects"]
        })
    
    # Smart Infrastructure Engineer
    if any(s in skills for s in ["engineering", "infrastructure", "systems", "electrical", "civil"]):
        career_paths.append({
            "title": "Smart Infrastructure Engineer",
            "match": "Medium",
            "description": "Design and manage smart city infrastructure and connected systems",
            "next_steps": ["Learn IoT & Sensors", "Study Smart Grid Technology", "Understand City Networks"]
        })
    
    # Sustainability Analyst
    if any(s in skills for s in ["sustainability", "environment", "climate", "carbon", "green", "renewable"]):
        career_paths.append({
            "title": "Sustainability Analyst",
            "match": "High",
            "description": "Measure and improve city sustainability and environmental impact",
            "next_steps": ["Learn Sustainability Metrics", "Study Energy Optimization", "Understand Carbon Accounting"]
        })
    
    # Civic Tech Developer
    if any(s in skills for s in ["python", "javascript", "web", "api", "programming", "software"]):
        career_paths.append({
            "title": "Civic Tech Developer",
            "match": "Medium",
            "description": "Build applications that improve civic engagement and city services",
            "next_steps": ["Work with Open Data APIs", "Learn Civic Design", "Build Community Tech Projects"]
        })
    
    # Urban AI Engineer
    if any(s in skills for s in ["machine learning", "deep learning", "ai", "tensorflow", "pytorch", "computer vision"]):
        career_paths.append({
            "title": "Urban AI Engineer",
            "match": "High",
            "description": "Apply AI and computer vision to urban challenges like traffic and safety",
            "next_steps": ["Study Computer Vision", "Learn Urban Analytics", "Build Smart City AI Models"]
        })
    
    # Energy Systems Engineer
    if any(s in skills for s in ["energy", "power", "electrical", "grid", "renewable"]):
        career_paths.append({
            "title": "Energy Systems Engineer",
            "match": "Medium",
            "description": "Design and optimize smart grid and city energy systems",
            "next_steps": ["Learn Smart Grid Tech", "Study Energy Optimization", "Understand Renewable Integration"]
        })
    
    # Default Smart City entry path
    if not career_paths:
        career_paths.append({
            "title": "Smart City Analyst",
            "match": "Medium",
            "description": "Entry point for Smart City careers - analyze urban data for better cities",
            "next_steps": ["Learn Python for Data Analysis", "Study GIS Basics", "Understand Urban Planning"]
        })
    
    return {
        "skills_detected": list(current_session["resume_data"].get("skills", [])),
        "career_paths": career_paths,
        "total_paths": len(career_paths)
    }


@app.post("/chat")
async def career_chat(request: ChatRequest):
    """AI-powered career advice chat"""
    
    question = request.question.lower()
    resume_data = current_session.get("resume_data", {})
    
    # Generate contextual response based on question and resume
    response = generate_career_advice(question, resume_data)
    
    return CareerAdviceResponse(answer=response, rag_used=False)


# ============ Helper Functions ============

def get_skill_recommendation(skill: str) -> Dict:
    """Get learning recommendation for a skill - focused on Smart City skills with Udemy links"""
    recommendations = {
        # Core Programming
        "python": {"resource": "Python for Data Science - Udemy", "url": "https://www.udemy.com/topic/python/", "duration": "4-6 weeks"},
        "sql": {"resource": "SQL Bootcamp - Udemy", "url": "https://www.udemy.com/topic/sql/", "duration": "2-3 weeks"},
        "javascript": {"resource": "JavaScript Complete Course - Udemy", "url": "https://www.udemy.com/topic/javascript/", "duration": "4-8 weeks"},
        
        # Smart City / Urban Tech Skills
        "gis": {"resource": "GIS & Spatial Analysis - Udemy", "url": "https://www.udemy.com/topic/geographic-information-systems-gis/", "duration": "4-6 weeks"},
        "spatial analysis": {"resource": "Spatial Data Science - Udemy", "url": "https://www.udemy.com/topic/geographic-information-systems-gis/", "duration": "3-4 weeks"},
        "arcgis": {"resource": "ArcGIS Complete Course - Udemy", "url": "https://www.udemy.com/topic/arcgis/", "duration": "4-6 weeks"},
        "qgis": {"resource": "QGIS Masterclass - Udemy", "url": "https://www.udemy.com/topic/qgis/", "duration": "2-3 weeks"},
        "urban planning": {"resource": "Urban Planning Fundamentals - Udemy", "url": "https://www.udemy.com/courses/search/?q=urban+planning", "duration": "8-12 weeks"},
        "iot": {"resource": "IoT & Smart Cities - Udemy", "url": "https://www.udemy.com/topic/internet-of-things/", "duration": "4-6 weeks"},
        "sensors": {"resource": "IoT Sensors & Arduino - Udemy", "url": "https://www.udemy.com/topic/arduino/", "duration": "2-4 weeks"},
        "smart grid": {"resource": "Smart Grid Technology - Udemy", "url": "https://www.udemy.com/courses/search/?q=smart+grid", "duration": "6-8 weeks"},
        "urban mobility": {"resource": "Urban Transport Planning - Udemy", "url": "https://www.udemy.com/courses/search/?q=urban+mobility", "duration": "8 weeks"},
        "traffic modeling": {"resource": "Traffic Engineering - Udemy", "url": "https://www.udemy.com/courses/search/?q=traffic+engineering", "duration": "4-6 weeks"},
        "transportation planning": {"resource": "Transport Planning Course - Udemy", "url": "https://www.udemy.com/courses/search/?q=transportation+planning", "duration": "6-8 weeks"},
        "sustainability": {"resource": "Sustainability & Green Cities - Udemy", "url": "https://www.udemy.com/topic/sustainability/", "duration": "4-6 weeks"},
        "sustainability metrics": {"resource": "ESG & Sustainability Reporting - Udemy", "url": "https://www.udemy.com/courses/search/?q=sustainability+metrics", "duration": "3-4 weeks"},
        "energy optimization": {"resource": "Energy Management - Udemy", "url": "https://www.udemy.com/topic/energy/", "duration": "6-8 weeks"},
        "public policy": {"resource": "Public Policy Analysis - Udemy", "url": "https://www.udemy.com/courses/search/?q=public+policy", "duration": "6-8 weeks"},
        "open data": {"resource": "Open Data & APIs - Udemy", "url": "https://www.udemy.com/courses/search/?q=open+data", "duration": "2-3 weeks"},
        "remote sensing": {"resource": "Remote Sensing & GIS - Udemy", "url": "https://www.udemy.com/topic/remote-sensing/", "duration": "4-6 weeks"},
        "cartography": {"resource": "Cartography & Map Design - Udemy", "url": "https://www.udemy.com/courses/search/?q=cartography", "duration": "3-4 weeks"},
        
        # Data & ML
        "machine learning": {"resource": "Machine Learning A-Z - Udemy", "url": "https://www.udemy.com/topic/machine-learning/", "duration": "11 weeks"},
        "data visualization": {"resource": "Data Visualization Masterclass - Udemy", "url": "https://www.udemy.com/topic/data-visualization/", "duration": "2-3 weeks"},
        "data analysis": {"resource": "Data Analysis with Python - Udemy", "url": "https://www.udemy.com/topic/data-analysis/", "duration": "6-8 weeks"},
        "statistics": {"resource": "Statistics for Data Science - Udemy", "url": "https://www.udemy.com/topic/statistics/", "duration": "4-6 weeks"},
        "urban analytics": {"resource": "Urban Data Analytics - Udemy", "url": "https://www.udemy.com/courses/search/?q=urban+analytics", "duration": "6-8 weeks"},
        "deep learning": {"resource": "Deep Learning Complete - Udemy", "url": "https://www.udemy.com/topic/deep-learning/", "duration": "4-5 months"},
        "computer vision": {"resource": "Computer Vision with Python - Udemy", "url": "https://www.udemy.com/topic/computer-vision/", "duration": "4-6 weeks"},
        "data engineering": {"resource": "Data Engineering Bootcamp - Udemy", "url": "https://www.udemy.com/topic/data-engineering/", "duration": "8-10 weeks"},
        "cloud platforms": {"resource": "Cloud Computing - Udemy", "url": "https://www.udemy.com/topic/cloud-computing/", "duration": "6-8 weeks"},
        "networking": {"resource": "Networking Fundamentals - Udemy", "url": "https://www.udemy.com/topic/networking/", "duration": "4-6 weeks"},
    }
    
    rec = recommendations.get(skill.lower(), {
        "resource": f"Learn {skill} on Udemy",
        "url": f"https://www.udemy.com/courses/search/?q={skill.replace(' ', '+')}",
        "duration": "Varies"
    })
    
    return {
        "skill": skill,
        **rec
    }


def generate_career_advice(question: str, resume_data: Dict) -> str:
    """Generate career advice based on question and resume context"""
    
    skills = resume_data.get("skills", [])
    projects = resume_data.get("projects", [])
    
    # Pattern-based responses (fallback when RAG not available)
    if "skill" in question and "gap" in question:
        return "I can help analyze your skills gap! Use the Skills Gap Analysis feature by specifying your target role. I'll compare your current skills with the requirements and provide personalized recommendations."
    
    elif "career" in question and "path" in question:
        if skills:
            return f"Based on your skills ({', '.join(skills[:5])}), I see great potential in software development and data-related roles. Check out the Career Paths feature for detailed suggestions tailored to your profile!"
        return "To suggest career paths, I need to analyze your resume. Please upload your resume first, and I'll provide personalized career recommendations."
    
    elif "resume" in question or "improve" in question:
        if resume_data:
            tips = []
            if len(skills) < 5:
                tips.append("Add more technical skills to showcase your capabilities")
            if len(projects) < 2:
                tips.append("Include more projects to demonstrate practical experience")
            tips.append("Use action verbs and quantify achievements where possible")
            return "Here are some tips to improve your resume:\n• " + "\n• ".join(tips)
        return "Upload your resume first, and I'll provide specific improvement suggestions!"
    
    elif "learn" in question or "study" in question:
        if skills:
            return f"Given your current skills in {', '.join(skills[:3])}, I recommend deepening your expertise in these areas while also learning complementary skills. For specific learning paths, use the Skills Gap Analysis with your target role."
        return "I'd recommend starting with fundamentals: Python for versatility, SQL for data work, and Git for collaboration. What field interests you most?"
    
    elif "interview" in question:
        return "For interview preparation:\n• Review data structures & algorithms (LeetCode)\n• Practice behavioral questions (STAR method)\n• Research the company thoroughly\n• Prepare questions to ask the interviewer\n• Practice explaining your projects clearly"
    
    elif "salary" in question or "pay" in question:
        return "Salary varies by role, location, and experience. For accurate data, check Glassdoor, Levels.fyi, or LinkedIn Salary Insights. Focus on building skills and demonstrating value - compensation follows!"
    
    else:
        # Generic helpful response
        return f"I'm here to help with your career! You can:\n• Ask about skills gap analysis\n• Get career path suggestions\n• Receive resume improvement tips\n• Learn about interview preparation\n\nWhat would you like to explore?"


# ============ Run Server ============

if __name__ == "__main__":
    import uvicorn
    print("Starting Career Advisor API...")
    print("Server will be available at: http://localhost:8001")
    print("API docs at: http://localhost:8001/docs")
    uvicorn.run(app, host="0.0.0.0", port=8001)

/**
 * Career API Service
 * Communicates with the FastAPI Career Advisor backend
 */

const CAREER_API_URL = '/api';

export interface ResumeUploadResponse {
    success: boolean;
    message: string;
    filename: string;
    characters_extracted: number;
    skills_found: number;
    projects_found: number;
    quality: ResumeQuality;
}

export interface ResumeQuality {
    completeness_score: number;
    missing_sections: string[];
    recommendations: string[];
    strengths: string[];
}

export interface ResumeAnalysis {
    contact: {
        email?: string;
        phone?: string;
        linkedin?: string;
        github?: string;
    };
    education: string[];
    experience: string[];
    projects: string[];
    skills: string[];
    certifications: string[];
    achievements: string[];
    quality_analysis: ResumeQuality;
    metadata: {
        total_characters?: number;
        total_lines?: number;
        sections_found: string[];
        contact_info_found: boolean;
    };
}

export interface SkillsGapAnalysis {
    target_role: string;
    current_skills: string[];
    required_skills: string[];
    matching_skills: string[];
    missing_skills: string[];
    match_percentage: number;
    recommendations: SkillRecommendation[];
    readiness: 'High' | 'Medium' | 'Low';
}

export interface SkillRecommendation {
    skill: string;
    resource: string;
    url: string;
    duration: string;
}

export interface CareerPath {
    title: string;
    match: string;
    description: string;
    next_steps: string[];
}

export interface CareerPathsResponse {
    skills_detected: string[];
    career_paths: CareerPath[];
    total_paths: number;
}

export interface ChatResponse {
    answer: string;
    rag_used: boolean;
}

export interface HealthCheck {
    status: string;
    service: string;
    features: string[];
}

// Check if Career API is available
export async function checkCareerApiHealth(): Promise<HealthCheck | null> {
    try {
        const response = await fetch(`${CAREER_API_URL}/`);
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error('Career API not available:', error);
        return null;
    }
}

// Upload and parse resume
export async function uploadResume(file: File): Promise<ResumeUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${CAREER_API_URL}/upload-resume`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to upload resume');
    }

    return await response.json();
}

// Get detailed resume analysis
export async function getResumeAnalysis(): Promise<ResumeAnalysis> {
    const response = await fetch(`${CAREER_API_URL}/analyze-resume`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to get resume analysis');
    }

    return await response.json();
}

// Analyze skills gap for a target role
export async function analyzeSkillsGap(targetRole: string): Promise<SkillsGapAnalysis> {
    const response = await fetch(`${CAREER_API_URL}/skills-gap`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target_role: targetRole }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to analyze skills gap');
    }

    return await response.json();
}

// Get career path suggestions
export async function getCareerPaths(): Promise<CareerPathsResponse> {
    const response = await fetch(`${CAREER_API_URL}/career-paths`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to get career paths');
    }

    return await response.json();
}

// Chat with AI career advisor
export async function sendChatMessage(question: string): Promise<ChatResponse> {
    const response = await fetch(`${CAREER_API_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to get chat response');
    }

    return await response.json();
}

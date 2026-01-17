import { ResumeData, Education, Experience, Project } from './types';

// Simulated resume parsing logic (inspired by PyMuPDF patterns)
export const parseResume = async (file: File): Promise<ResumeData> => {
  // In a real implementation, this would use a backend service with PyMuPDF
  // For now, we simulate parsing with intelligent extraction patterns
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulated extracted data based on common resume patterns
      const extractedData: ResumeData = {
        skills: extractSkills(),
        education: extractEducation(),
        experience: extractExperience(),
        projects: extractProjects(),
        completenessScore: calculateCompleteness(),
      };
      
      resolve(extractedData);
    }, 2000); // Simulate processing time
  });
};

const extractSkills = (): string[] => {
  // Common skills that might be extracted from a resume
  const possibleSkills = [
    'Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Data Analysis',
    'Machine Learning', 'Cloud Computing', 'API Development', 'Git',
    'Agile', 'Project Management', 'Communication', 'Problem Solving'
  ];
  
  // Randomly select 6-10 skills to simulate extraction
  const numSkills = Math.floor(Math.random() * 5) + 6;
  const shuffled = possibleSkills.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numSkills);
};

const extractEducation = (): Education[] => {
  return [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      year: '2023',
    },
  ];
};

const extractExperience = (): Experience[] => {
  return [
    {
      company: 'Tech Solutions Inc.',
      role: 'Software Developer Intern',
      duration: 'Jun 2022 - Aug 2022',
      description: 'Developed web applications using React and Node.js. Collaborated with cross-functional teams.',
    },
    {
      company: 'Data Analytics Corp',
      role: 'Data Analyst Intern',
      duration: 'Jan 2023 - May 2023',
      description: 'Analyzed large datasets using Python and SQL. Created visualizations and reports.',
    },
  ];
};

const extractProjects = (): Project[] => {
  return [
    {
      name: 'Smart Health Monitor',
      description: 'IoT-based health monitoring system with real-time data visualization',
      technologies: ['Python', 'React', 'AWS', 'IoT'],
    },
    {
      name: 'Agricultural Data Platform',
      description: 'Data analytics platform for crop yield prediction',
      technologies: ['Python', 'Machine Learning', 'SQL'],
    },
  ];
};

const calculateCompleteness = (): number => {
  // Calculate resume completeness based on sections present
  return Math.floor(Math.random() * 20) + 75; // 75-95%
};

// Skill matching engine
export const matchSkills = (userSkills: string[], requiredSkills: string[]): {
  matching: string[];
  missing: string[];
  score: number;
} => {
  const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
  const normalizedRequired = requiredSkills.map(s => s.toLowerCase());
  
  const matching = requiredSkills.filter(skill => 
    normalizedUserSkills.includes(skill.toLowerCase())
  );
  
  const missing = requiredSkills.filter(skill => 
    !normalizedUserSkills.includes(skill.toLowerCase())
  );
  
  const score = Math.round((matching.length / requiredSkills.length) * 100);
  
  return { matching, missing, score };
};

// Career matching engine
export const generateCareerMatch = (
  skills: string[],
  quizSector?: string
): { sector: string; role: string; confidence: number; explanation: string } => {
  const sectorScores = {
    healthcare: 0,
    agritech: 0,
    smartcities: 0,
  };
  
  // Healthcare keywords
  const healthcareKeywords = ['medical', 'health', 'clinical', 'bioinformatics', 'hipaa'];
  // Agritech keywords
  const agritechKeywords = ['agriculture', 'farming', 'iot', 'sensor', 'gis', 'drone'];
  // Smart cities keywords
  const smartcitiesKeywords = ['urban', 'infrastructure', 'traffic', 'smart', 'city'];
  
  skills.forEach(skill => {
    const lowerSkill = skill.toLowerCase();
    if (healthcareKeywords.some(k => lowerSkill.includes(k))) sectorScores.healthcare += 2;
    if (agritechKeywords.some(k => lowerSkill.includes(k))) sectorScores.agritech += 2;
    if (smartcitiesKeywords.some(k => lowerSkill.includes(k))) sectorScores.smartcities += 2;
    
    // Common tech skills add points to all
    if (['python', 'machine learning', 'data', 'sql'].some(k => lowerSkill.includes(k))) {
      sectorScores.healthcare += 1;
      sectorScores.agritech += 1;
      sectorScores.smartcities += 1;
    }
  });
  
  // Boost quiz-selected sector
  if (quizSector && sectorScores[quizSector as keyof typeof sectorScores] !== undefined) {
    sectorScores[quizSector as keyof typeof sectorScores] += 5;
  }
  
  // Find best match
  const bestSector = Object.entries(sectorScores).reduce((a, b) => 
    b[1] > a[1] ? b : a
  )[0];
  
  const roles = {
    healthcare: 'Health Data Scientist',
    agritech: 'Precision Agriculture Specialist',
    smartcities: 'Smart City Solutions Architect',
  };
  
  const explanations = {
    healthcare: 'Your skills in data analysis and technology, combined with an interest in improving lives, make you an excellent fit for healthcare technology roles.',
    agritech: 'Your technical background and analytical skills align well with the data-driven nature of modern agriculture technology.',
    smartcities: 'Your combination of technical skills and systems thinking makes you well-suited for urban technology and smart infrastructure roles.',
  };
  
  const confidence = Math.min(95, 60 + (sectorScores[bestSector as keyof typeof sectorScores] * 3));
  
  return {
    sector: bestSector,
    role: roles[bestSector as keyof typeof roles],
    confidence,
    explanation: explanations[bestSector as keyof typeof explanations],
  };
};

import { SectorInfo, RoadmapStep, Resource } from './types';

export const sectorData: Record<string, SectorInfo> = {
  healthcare: {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Digital health, telemedicine, AI diagnostics, and medical devices are transforming patient care. This sector combines technology with life sciences to improve health outcomes globally.',
    keySkills: ['Machine Learning', 'Data Analytics', 'Python', 'HIPAA Compliance', 'Medical Imaging', 'Natural Language Processing', 'Cloud Computing', 'Bioinformatics'],
    roles: ['Health Data Scientist', 'Clinical Informatics Specialist', 'AI/ML Engineer - Healthcare', 'Biomedical Engineer', 'Healthcare Software Developer', 'Digital Health Product Manager'],
    growthRate: '15.4%',
    avgSalary: '$95,000 - $145,000',
    trends: ['AI-powered diagnostics', 'Remote patient monitoring', 'Personalized medicine', 'Mental health tech', 'Wearable health devices'],
  },
  agritech: {
    id: 'agritech',
    name: 'Agri-Tech',
    description: 'Precision agriculture, IoT sensors, drones, and AI are revolutionizing farming. This sector addresses food security challenges through sustainable technology solutions.',
    keySkills: ['IoT Development', 'Drone Technology', 'Data Science', 'GIS Mapping', 'Embedded Systems', 'Machine Learning', 'Sensor Networks', 'Sustainability Analysis'],
    roles: ['Precision Agriculture Specialist', 'AgriTech Data Analyst', 'IoT Solutions Architect', 'Agricultural AI Engineer', 'Supply Chain Tech Lead', 'Sustainable Tech Consultant'],
    growthRate: '12.8%',
    avgSalary: '$75,000 - $120,000',
    trends: ['Vertical farming', 'AI crop monitoring', 'Blockchain food traceability', 'Autonomous farming equipment', 'Climate-smart agriculture'],
  },
  smartcities: {
    id: 'smartcities',
    name: 'Smart Cities',
    description: 'Urban technology, IoT infrastructure, intelligent transportation, and sustainable city planning are creating the cities of tomorrow. This sector focuses on urban efficiency and quality of life.',
    keySkills: ['IoT Architecture', 'Urban Planning Tech', 'Data Visualization', 'Cloud Infrastructure', 'Cybersecurity', 'API Development', 'GIS Systems', 'Real-time Analytics'],
    roles: ['Smart City Solutions Architect', 'Urban Data Scientist', 'IoT Infrastructure Engineer', 'Transportation Tech Analyst', 'Sustainability Data Engineer', 'Civic Tech Developer'],
    growthRate: '18.2%',
    avgSalary: '$85,000 - $135,000',
    trends: ['Digital twins', '5G infrastructure', 'Smart traffic management', 'Energy optimization', 'Citizen engagement platforms'],
  },
};

export const quizQuestions = {
  sector: [
    {
      id: 's1',
      question: 'Which problem space excites you most?',
      options: [
        { value: 'healthcare', label: 'Improving patient outcomes and healthcare access' },
        { value: 'agritech', label: 'Sustainable food production and farming innovation' },
        { value: 'smartcities', label: 'Building efficient, connected urban environments' },
      ],
    },
    {
      id: 's2',
      question: 'What type of data would you prefer working with?',
      options: [
        { value: 'healthcare', label: 'Medical records, clinical data, genomics' },
        { value: 'agritech', label: 'Sensor data, satellite imagery, crop yields' },
        { value: 'smartcities', label: 'Traffic patterns, energy usage, citizen data' },
      ],
    },
  ],
  role: [
    {
      id: 'r1',
      question: 'What best describes your preferred work style?',
      options: [
        { value: 'analyst', label: 'Analyzing data and finding insights' },
        { value: 'engineer', label: 'Building systems and writing code' },
        { value: 'product', label: 'Designing solutions and leading projects' },
      ],
    },
    {
      id: 'r2',
      question: 'Which skill do you want to develop most?',
      options: [
        { value: 'ml', label: 'Machine Learning & AI' },
        { value: 'data', label: 'Data Engineering & Analytics' },
        { value: 'iot', label: 'IoT & Embedded Systems' },
      ],
    },
  ],
  preference: [
    {
      id: 'p1',
      question: 'What matters most to you in a career?',
      options: [
        { value: 'impact', label: 'Making a direct impact on peoples lives' },
        { value: 'innovation', label: 'Working on cutting-edge technology' },
        { value: 'growth', label: 'Fast career growth and learning' },
      ],
    },
  ],
};

export const generateRoadmap = (sector: string, missingSkills: string[]): RoadmapStep[] => {
  const baseResources: Resource[] = [
    { title: 'Coursera Professional Certificate', url: 'https://coursera.org', type: 'course' },
    { title: 'Industry Documentation', url: 'https://docs.example.com', type: 'article' },
    { title: 'YouTube Tutorial Series', url: 'https://youtube.com', type: 'video' },
  ];

  return missingSkills.slice(0, 5).map((skill, index) => ({
    id: `step-${index + 1}`,
    title: `Master ${skill}`,
    description: `Build proficiency in ${skill} through hands-on projects and structured learning. This skill is essential for ${sector} roles.`,
    skills: [skill],
    estimatedTime: `${2 + index} weeks`,
    priority: index === 0 ? 'high' : index < 3 ? 'medium' : 'low',
    resources: baseResources,
    completed: false,
  }));
};

export const skillDatabase = {
  healthcare: ['Python', 'Machine Learning', 'Data Analytics', 'SQL', 'HIPAA Compliance', 'Medical Imaging', 'NLP', 'TensorFlow', 'PyTorch', 'Cloud Computing', 'Bioinformatics', 'Statistics'],
  agritech: ['Python', 'IoT Development', 'Data Science', 'GIS', 'Embedded Systems', 'Machine Learning', 'Sensor Networks', 'Drone Technology', 'SQL', 'Cloud Computing', 'Computer Vision'],
  smartcities: ['Python', 'IoT Architecture', 'Data Visualization', 'Cloud Infrastructure', 'Cybersecurity', 'API Development', 'GIS', 'Real-time Analytics', 'React', 'Node.js', 'SQL'],
};

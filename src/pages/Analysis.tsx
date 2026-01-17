import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  ArrowRight,
  Edit3,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { ProgressRing } from '@/components/shared/ProgressRing';

const Analysis = () => {
  const navigate = useNavigate();
  const { profile } = useUser();
  const [showEditMode, setShowEditMode] = useState(false);

  useEffect(() => {
    if (!profile.resumeData) {
      navigate('/upload');
    }
  }, [profile.resumeData, navigate]);

  if (!profile.resumeData) {
    return null;
  }

  const { skills, education, experience, projects, completenessScore } = profile.resumeData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-agritech-light mb-6">
            <CheckCircle2 className="h-4 w-4 text-agritech" />
            <span className="text-sm font-medium text-agritech">
              Resume Parsed Successfully
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Resume Analysis Results
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Here's what we extracted from your resume. Review the details and continue to career insights.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Completeness Score */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Resume Score
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <ProgressRing 
                  progress={completenessScore} 
                  size={140}
                  label="Completeness"
                />
                <div className="text-center">
                  <p className="font-semibold">
                    {completenessScore >= 80 ? 'Excellent' : completenessScore >= 60 ? 'Good' : 'Needs Work'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {completenessScore >= 80 
                      ? 'Your resume is comprehensive'
                      : 'Consider adding more details'}
                  </p>
                </div>
                {completenessScore < 80 && (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-accent text-sm">
                    <AlertCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Adding more projects or certifications can improve your score.
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="glass-card h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-primary" />
                    Extracted Skills
                  </CardTitle>
                  <CardDescription>
                    {skills.length} skills identified from your resume
                  </CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setShowEditMode(!showEditMode)}
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge variant="secondary" className="px-3 py-1 text-sm">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <p className="font-medium">{edu.degree} in {edu.field}</p>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu.year}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="space-y-1 pb-4 border-b border-border last:border-0 last:pb-0">
                    <p className="font-medium">{exp.role}</p>
                    <p className="text-sm text-primary">{exp.company}</p>
                    <p className="text-xs text-muted-foreground">{exp.duration}</p>
                    <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Projects */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="space-y-2 pb-4 border-b border-border last:border-0 last:pb-0">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/career-match">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              Continue to Career Insights
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/quiz">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              Enhance with Quiz
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Analysis;

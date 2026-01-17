import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Lightbulb
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { ProgressRing } from '@/components/shared/ProgressRing';
import { SectorBadge } from '@/components/shared/SectorBadge';
import { generateCareerMatch, matchSkills } from '@/lib/resume-parser';
import { sectorData, skillDatabase, generateRoadmap } from '@/lib/career-data';
import { Sector } from '@/lib/types';

const CareerMatch = () => {
  const navigate = useNavigate();
  const { profile, setCareerMatch, setSkillGap, setRoadmap } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processMatch = async () => {
      // Get user skills from resume or use empty array
      const userSkills = profile.resumeData?.skills || [];
      
      // Generate career match
      const match = generateCareerMatch(
        userSkills,
        profile.quizResult?.sector
      );

      const sectorKey = match.sector as Sector;
      const requiredSkills = skillDatabase[sectorKey] || [];
      
      // Calculate skill gap
      const skillMatch = matchSkills(userSkills, requiredSkills);

      setCareerMatch({
        sector: sectorKey,
        role: match.role,
        confidence: match.confidence,
        explanation: match.explanation,
        matchingSkills: skillMatch.matching,
      });

      setSkillGap({
        requiredSkills,
        userSkills,
        missingSkills: skillMatch.missing,
        readinessScore: skillMatch.score,
      });

      // Generate roadmap
      const roadmap = generateRoadmap(match.sector, skillMatch.missing);
      setRoadmap(roadmap);

      setIsLoading(false);
    };

    processMatch();
  }, [profile.resumeData, profile.quizResult, setCareerMatch, setSkillGap, setRoadmap]);

  if (isLoading || !profile.careerMatch) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Analyzing your career match...</p>
        </motion.div>
      </div>
    );
  }

  const { sector, role, confidence, explanation, matchingSkills } = profile.careerMatch;
  const sectorInfo = sectorData[sector];

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              AI Career Analysis Complete
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your Career Match Results
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Based on your {profile.resumeData ? 'resume' : ''} 
            {profile.resumeData && profile.quizResult ? ' and ' : ''}
            {profile.quizResult ? 'quiz responses' : ''}, here's your ideal career path.
          </p>
        </motion.div>

        {/* Main Match Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center">
              <SectorBadge sector={sector} size="lg" />
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-4 mb-2">
                {role}
              </h2>
              <p className="text-muted-foreground">Recommended Role in {sectorInfo?.name}</p>
            </div>
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Confidence Score */}
                <div className="flex flex-col items-center text-center">
                  <ProgressRing 
                    progress={confidence} 
                    size={140}
                    label="Match Score"
                    color={sector === 'healthcare' ? 'healthcare' : sector === 'agritech' ? 'agritech' : 'smartcities'}
                  />
                  <p className="mt-4 text-sm text-muted-foreground">
                    {confidence >= 80 
                      ? 'Excellent match! You have strong alignment.'
                      : confidence >= 60
                      ? 'Good match with room to grow.'
                      : 'Potential match - skill development recommended.'}
                  </p>
                </div>

                {/* AI Explanation */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-accent">
                      <Lightbulb className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Why This Fits</h3>
                      <p className="text-muted-foreground text-sm">
                        {explanation}
                      </p>
                    </div>
                  </div>

                  {matchingSkills.length > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-agritech-light">
                        <CheckCircle2 className="h-5 w-5 text-agritech" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Matching Skills</h3>
                        <div className="flex flex-wrap gap-1">
                          {matchingSkills.slice(0, 6).map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sector Highlights */}
        {sectorInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {sectorInfo.name} Sector Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-accent">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-agritech" />
                      <span className="text-sm font-medium">Growth Rate</span>
                    </div>
                    <p className="text-2xl font-bold font-display">{sectorInfo.growthRate}</p>
                    <p className="text-xs text-muted-foreground">Annual growth</p>
                  </div>
                  <div className="p-4 rounded-xl bg-accent">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Salary Range</span>
                    </div>
                    <p className="text-lg font-bold font-display">{sectorInfo.avgSalary}</p>
                    <p className="text-xs text-muted-foreground">Average range</p>
                  </div>
                  <div className="p-4 rounded-xl bg-accent">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-smartcities" />
                      <span className="text-sm font-medium">Roles Available</span>
                    </div>
                    <p className="text-2xl font-bold font-display">{sectorInfo.roles.length}+</p>
                    <p className="text-xs text-muted-foreground">Career paths</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/skill-gap">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              View Skill Gap Analysis
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/sectors">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              Explore Other Sectors
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerMatch;

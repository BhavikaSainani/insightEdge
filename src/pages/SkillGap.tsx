import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  ArrowRight, 
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { ProgressRing } from '@/components/shared/ProgressRing';
import { SkillBar } from '@/components/shared/SkillBar';
import { SectorBadge } from '@/components/shared/SectorBadge';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

const SkillGap = () => {
  const navigate = useNavigate();
  const { profile } = useUser();

  useEffect(() => {
    if (!profile.skillGap || !profile.careerMatch) {
      navigate('/upload');
    }
  }, [profile.skillGap, profile.careerMatch, navigate]);

  if (!profile.skillGap || !profile.careerMatch) {
    return null;
  }

  const { requiredSkills, userSkills, missingSkills, readinessScore } = profile.skillGap;
  const { sector, role } = profile.careerMatch;

  // Prepare radar chart data
  const radarData = requiredSkills.slice(0, 8).map(skill => ({
    skill: skill.length > 12 ? skill.slice(0, 12) + '...' : skill,
    fullSkill: skill,
    required: 100,
    current: userSkills.some(s => s.toLowerCase() === skill.toLowerCase()) ? 80 : 20,
  }));

  // Prepare bar chart data for missing skills
  const barData = missingSkills.slice(0, 6).map((skill, index) => ({
    skill: skill.length > 15 ? skill.slice(0, 15) + '...' : skill,
    fullSkill: skill,
    importance: 100 - (index * 12),
  }));

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              Skill Gap Analysis
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your Skill Gap Report
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how your current skills align with {role} requirements in{' '}
            <SectorBadge sector={sector} size="sm" showIcon={false} />
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* Readiness Score */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Career Readiness</CardTitle>
                <CardDescription>
                  Your overall skill alignment
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <ProgressRing 
                  progress={readinessScore} 
                  size={160}
                  strokeWidth={12}
                  label="Readiness"
                  color={readinessScore >= 70 ? 'agritech' : readinessScore >= 40 ? 'primary' : 'healthcare'}
                />
                <div className="mt-6 w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-agritech" />
                      Skills You Have
                    </span>
                    <span className="font-medium">{requiredSkills.length - missingSkills.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-healthcare" />
                      Skills to Learn
                    </span>
                    <span className="font-medium">{missingSkills.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Radar Chart */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Skill Comparison</CardTitle>
                <CardDescription>
                  Required skills vs your current skillset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis 
                        dataKey="skill" 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                      />
                      <PolarRadiusAxis 
                        angle={30} 
                        domain={[0, 100]} 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                      />
                      <Radar
                        name="Required"
                        dataKey="required"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.1}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Current"
                        dataKey="current"
                        stroke="hsl(var(--agritech))"
                        fill="hsl(var(--agritech))"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-primary/30 border-2 border-primary" />
                    Required Level
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full bg-agritech/30 border-2 border-agritech" />
                    Your Level
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Missing Skills Priority */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-healthcare" />
                  Priority Skills to Learn
                </CardTitle>
                <CardDescription>
                  Skills ranked by importance for {role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis 
                        type="category" 
                        dataKey="skill" 
                        width={120}
                        tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${value}% importance`, 'Priority']}
                        labelFormatter={(label) => barData.find(d => d.skill === label)?.fullSkill}
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                        {barData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`}
                            fill={index < 2 ? 'hsl(var(--healthcare))' : index < 4 ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Lists */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Your Strong Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userSkills.filter(s => 
                    requiredSkills.some(r => r.toLowerCase() === s.toLowerCase())
                  ).map(skill => (
                    <Badge key={skill} className="bg-agritech-light text-agritech border-agritech/20">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {skill}
                    </Badge>
                  ))}
                </div>
                {userSkills.filter(s => 
                  requiredSkills.some(r => r.toLowerCase() === s.toLowerCase())
                ).length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Take the quiz or upload a resume to see matching skills.
                  </p>
                )}
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
          <Link to="/roadmap">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              View Learning Roadmap
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              Go to Dashboard
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillGap;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutDashboard, FileText, Brain, RefreshCw, Target, Map, TrendingUp } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { ProgressRing } from '@/components/shared/ProgressRing';
import { SectorBadge } from '@/components/shared/SectorBadge';

const Dashboard = () => {
  const { profile, resetProfile } = useUser();
  const hasData = profile.careerMatch || profile.resumeData || profile.quizResult;

  if (!hasData) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <Card className="glass-card max-w-md text-center p-8">
          <LayoutDashboard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">No Data Yet</h2>
          <p className="text-muted-foreground mb-6">Upload your resume or take the quiz to see your dashboard.</p>
          <div className="flex gap-4 justify-center">
            <Link to="/upload"><Button><FileText className="h-4 w-4 mr-2" />Upload Resume</Button></Link>
            <Link to="/quiz"><Button variant="outline"><Brain className="h-4 w-4 mr-2" />Take Quiz</Button></Link>
          </div>
        </Card>
      </div>
    );
  }

  const roadmapProgress = profile.roadmap ? Math.round((profile.roadmap.filter(s => s.completed).length / profile.roadmap.length) * 100) : 0;

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Your Dashboard</h1>
            <p className="text-muted-foreground">Track your career development progress</p>
          </div>
          <Button variant="outline" onClick={resetProfile} className="gap-2"><RefreshCw className="h-4 w-4" />Reset</Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />Readiness</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProgressRing progress={profile.readinessScore || 0} size={120} label="Score" />
            </CardContent>
          </Card>

          {profile.careerMatch && (
            <Card className="glass-card">
              <CardHeader><CardTitle className="flex items-center gap-2"><Target className="h-5 w-5" />Career Match</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <SectorBadge sector={profile.careerMatch.sector} />
                <p className="font-semibold">{profile.careerMatch.role}</p>
                <p className="text-sm text-muted-foreground">{profile.careerMatch.confidence}% confidence</p>
                <Link to="/career-match"><Button variant="outline" size="sm" className="w-full">View Details</Button></Link>
              </CardContent>
            </Card>
          )}

          <Card className="glass-card">
            <CardHeader><CardTitle className="flex items-center gap-2"><Map className="h-5 w-5" />Learning</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center">
              <ProgressRing progress={roadmapProgress} size={120} label="Complete" color="agritech" />
              <Link to="/roadmap" className="mt-4 w-full"><Button variant="outline" size="sm" className="w-full">View Roadmap</Button></Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6 flex items-center gap-4">
              <FileText className="h-8 w-8 text-primary" />
              <div className="flex-1">
                <p className="font-semibold">Resume Analysis</p>
                <p className="text-sm text-muted-foreground">{profile.resumeData ? `${profile.resumeData.skills.length} skills extracted` : 'Not uploaded'}</p>
              </div>
              <Link to="/upload"><Button variant="outline" size="sm">{profile.resumeData ? 'Reupload' : 'Upload'}</Button></Link>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 flex items-center gap-4">
              <Brain className="h-8 w-8 text-smartcities" />
              <div className="flex-1">
                <p className="font-semibold">Career Quiz</p>
                <p className="text-sm text-muted-foreground">{profile.quizResult ? `${profile.quizResult.confidence}% confidence` : 'Not taken'}</p>
              </div>
              <Link to="/quiz"><Button variant="outline" size="sm">{profile.quizResult ? 'Retake' : 'Take Quiz'}</Button></Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

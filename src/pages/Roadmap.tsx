import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Map, 
  ArrowRight, 
  Clock,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { SectorBadge } from '@/components/shared/SectorBadge';

const Roadmap = () => {
  const navigate = useNavigate();
  const { profile, updateRoadmapStep } = useUser();

  useEffect(() => {
    if (!profile.roadmap || !profile.careerMatch) {
      navigate('/upload');
    }
  }, [profile.roadmap, profile.careerMatch, navigate]);

  if (!profile.roadmap || !profile.careerMatch) {
    return null;
  }

  const { sector, role } = profile.careerMatch;
  const completedSteps = profile.roadmap.filter(s => s.completed).length;
  const progress = Math.round((completedSteps / profile.roadmap.length) * 100);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'course':
        return BookOpen;
      case 'video':
        return Video;
      case 'article':
        return FileText;
      default:
        return BookOpen;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-healthcare-light text-healthcare border-healthcare/20';
      case 'medium':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'low':
        return 'bg-muted text-muted-foreground border-muted';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
            <Map className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              Personalized Learning Path
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Your Learning Roadmap
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A step-by-step plan to become a {role} in{' '}
            <SectorBadge sector={sector} size="sm" showIcon={false} />
          </p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">Learning Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedSteps} of {profile.roadmap.length} steps completed
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-3xl font-bold font-display">{progress}%</p>
                    <p className="text-xs text-muted-foreground">Complete</p>
                  </div>
                  <div className="w-24 h-24">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        strokeWidth="8"
                        className="stroke-muted"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="stroke-primary"
                        initial={{ strokeDasharray: `0 ${2 * Math.PI * 40}` }}
                        animate={{ strokeDasharray: `${(progress / 100) * 2 * Math.PI * 40} ${2 * Math.PI * 40}` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Roadmap Steps */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border hidden sm:block" />

          <div className="space-y-6">
            {profile.roadmap.map((step, index) => {
              const Icon = step.completed ? CheckCircle2 : Map;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="relative"
                >
                  <Card className={`glass-card ml-0 sm:ml-14 ${step.completed ? 'opacity-75' : ''}`}>
                    {/* Step indicator */}
                    <div className="absolute -left-14 top-6 hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-background border-2 border-border z-10">
                      <Icon className={`h-5 w-5 ${step.completed ? 'text-agritech' : 'text-primary'}`} />
                    </div>

                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getPriorityColor(step.priority)}>
                              {step.priority} priority
                            </Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {step.estimatedTime}
                            </span>
                          </div>
                          <CardTitle className={`text-lg ${step.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {step.title}
                          </CardTitle>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={step.id}
                            checked={step.completed}
                            onCheckedChange={(checked) => updateRoadmapStep(step.id, checked as boolean)}
                          />
                          <label
                            htmlFor={step.id}
                            className="text-sm font-medium cursor-pointer"
                          >
                            Done
                          </label>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>

                      {/* Skills covered */}
                      <div className="flex flex-wrap gap-1">
                        {step.skills.map(skill => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Resources */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Learning Resources:</p>
                        <div className="grid sm:grid-cols-3 gap-2">
                          {step.resources.map((resource, i) => {
                            const ResourceIcon = getResourceIcon(resource.type);
                            return (
                              <a
                                key={i}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-sm"
                              >
                                <ResourceIcon className="h-4 w-4 text-primary flex-shrink-0" />
                                <span className="truncate flex-1">{resource.title}</span>
                                <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/dashboard">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              Go to Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/sectors">
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              Explore Sectors
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Roadmap;

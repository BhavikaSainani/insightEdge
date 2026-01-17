import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Target,
  Briefcase,
  Heart
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { quizQuestions } from '@/lib/career-data';
import { Sector } from '@/lib/types';

type QuestionSection = 'sector' | 'role' | 'preference';

interface Answer {
  questionId: string;
  value: string;
}

const Quiz = () => {
  const navigate = useNavigate();
  const { setQuizResult, profile } = useUser();
  const [currentSection, setCurrentSection] = useState<QuestionSection>('sector');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const sections: { key: QuestionSection; label: string; icon: React.ComponentType<any> }[] = [
    { key: 'sector', label: 'Sector Preference', icon: Target },
    { key: 'role', label: 'Role Alignment', icon: Briefcase },
    { key: 'preference', label: 'Career Values', icon: Heart },
  ];

  const allQuestions = [
    ...quizQuestions.sector.map(q => ({ ...q, section: 'sector' as QuestionSection })),
    ...quizQuestions.role.map(q => ({ ...q, section: 'role' as QuestionSection })),
    ...quizQuestions.preference.map(q => ({ ...q, section: 'preference' as QuestionSection })),
  ];

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / allQuestions.length) * 100;
  const isLastQuestion = currentQuestionIndex === allQuestions.length - 1;

  const handleAnswer = (value: string) => {
    const newAnswers = [
      ...answers.filter(a => a.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, value },
    ];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Calculate results
      const sectorCounts: Record<string, number> = { healthcare: 0, agritech: 0, smartcities: 0 };
      
      newAnswers.forEach(answer => {
        if (sectorCounts[answer.value] !== undefined) {
          sectorCounts[answer.value]++;
        }
      });

      const topSector = Object.entries(sectorCounts).reduce((a, b) => 
        b[1] > a[1] ? b : a
      )[0] as Sector;

      const confidence = Math.min(95, 60 + (sectorCounts[topSector] * 15));

      const roleMap: Record<Sector, string> = {
        healthcare: 'Health Data Scientist',
        agritech: 'Precision Agriculture Specialist',
        smartcities: 'Smart City Solutions Architect',
      };

      setQuizResult({
        sector: topSector,
        role: roleMap[topSector],
        confidence,
        preferences: newAnswers.map(a => a.value),
      });

      setTimeout(() => {
        if (profile.resumeData) {
          navigate('/career-match');
        } else {
          navigate('/career-match');
        }
      }, 500);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setCurrentSection(allQuestions[currentQuestionIndex + 1].section);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setCurrentSection(allQuestions[currentQuestionIndex - 1].section);
    }
  };

  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              2-Minute Career Quiz
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Discover Your Ideal Sector
          </h1>
          <p className="text-muted-foreground">
            Answer a few questions to refine your career match
          </p>
        </motion.div>

        {/* Section Indicators */}
        <div className="flex justify-center gap-4 mb-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const sectionQuestions = allQuestions.filter(q => q.section === section.key);
            const sectionStartIndex = allQuestions.findIndex(q => q.section === section.key);
            const isActive = currentSection === section.key;
            const isCompleted = currentQuestionIndex > sectionStartIndex + sectionQuestions.length - 1;

            return (
              <div
                key={section.key}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                    ? 'bg-agritech-light text-agritech'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
                <span className="text-sm font-medium hidden sm:inline">{section.label}</span>
              </div>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestionIndex + 1} of {allQuestions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion?.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl">
                  {currentQuestion?.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion?.options.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      currentAnswer?.value === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="text-sm text-muted-foreground">
            Click an option to continue
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

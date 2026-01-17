import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  FileText, 
  Brain, 
  Target, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  Heart,
  Leaf,
  Building2,
  CheckCircle2
} from 'lucide-react';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const sectors = [
    {
      icon: Heart,
      name: 'Healthcare',
      description: 'AI diagnostics, telemedicine, health tech',
      color: 'text-healthcare',
      bg: 'bg-healthcare-light',
    },
    {
      icon: Leaf,
      name: 'Agri-Tech',
      description: 'Precision farming, IoT sensors, sustainability',
      color: 'text-agritech',
      bg: 'bg-agritech-light',
    },
    {
      icon: Building2,
      name: 'Smart Cities',
      description: 'Urban tech, infrastructure, connectivity',
      color: 'text-smartcities',
      bg: 'bg-smartcities-light',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Upload Resume',
      description: 'AI parses your skills, experience, and projects instantly',
      icon: FileText,
    },
    {
      step: '02',
      title: 'Take Quiz (Optional)',
      description: 'Quick 2-minute quiz to refine sector and role matching',
      icon: Brain,
    },
    {
      step: '03',
      title: 'Get Insights',
      description: 'Receive personalized career match, skill gaps, and roadmap',
      icon: Target,
    },
  ];

  const stats = [
    { value: '95%', label: 'Accuracy Rate', icon: CheckCircle2 },
    { value: '10K+', label: 'Careers Matched', icon: Users },
    { value: '3 Min', label: 'Average Time', icon: Zap },
    { value: '50+', label: 'Skills Analyzed', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-accent/20 to-background py-20 lg:py-32">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">
                AI-Powered Career Intelligence
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              Discover Your Path in{' '}
              <span className="gradient-text">Emerging Tech</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              Upload your resume, get AI-driven analysis, and uncover which sector 
              fits you best. From skill gaps to personalized learning roadmaps.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/upload">
                <Button size="lg" className="gap-2 text-lg px-8 shadow-glow">
                  <FileText className="h-5 w-5" />
                  Upload Resume
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  <Brain className="h-5 w-5" />
                  Take Career Quiz
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-2">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-display text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Target Sectors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore opportunities in three high-growth emerging technology sectors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <motion.div
                  key={sector.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full glass-card hover:shadow-lg transition-shadow group">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-3 rounded-xl ${sector.bg} mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-6 w-6 ${sector.color}`} />
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2">
                        {sector.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {sector.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link to="/sectors">
              <Button variant="outline" className="gap-2">
                Explore All Sectors
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to your personalized career intelligence report
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                  )}
                  <Card className="relative glass-card">
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground mb-4">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="text-sm text-primary font-semibold mb-2">
                        Step {step.step}
                      </div>
                      <h3 className="font-display text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-primary p-8 md:p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
                Ready to Discover Your Edge?
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
                Join thousands of professionals who have unlocked their career potential 
                with AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/upload">
                  <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

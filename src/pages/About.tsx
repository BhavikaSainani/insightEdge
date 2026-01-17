import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Code2, Database, Brain, Shield, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">About InsightEdge</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">AI-powered career intelligence for emerging technology sectors</p>
        </motion.div>

        <Card className="glass-card mb-8">
          <CardContent className="p-8">
            <h2 className="font-display text-xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              InsightEdge helps students and professionals understand where they stand in emerging sectors. 
              Users can upload their resume for AI-driven analysis, optionally take a short aptitude quiz, 
              and instantly see which sector and role they fit best. The system then identifies skill gaps 
              and generates a personalized learning roadmap using AI explanations and sector-specific data.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Brain, title: 'AI Analysis', desc: 'Advanced resume parsing and career matching' },
            { icon: Database, title: 'Sector Data', desc: 'Healthcare, Agri-Tech, Smart Cities insights' },
            { icon: Shield, title: 'Privacy First', desc: 'Your data stays secure and private' },
          ].map((item, i) => (
            <Card key={i} className="glass-card">
              <CardContent className="p-6 text-center">
                <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="glass-card">
          <CardContent className="p-8">
            <h2 className="font-display text-xl font-bold mb-4">Tech Stack & Architecture</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts'].map(tech => (
                <span key={tech} className="px-3 py-1 bg-accent rounded-full text-sm">{tech}</span>
              ))}
            </div>
            <p className="text-sm text-muted-foreground italic">
              InsightEdge is designed with modular AI and pluggable data services.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;

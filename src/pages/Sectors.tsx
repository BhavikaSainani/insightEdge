import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Heart, Leaf, Building2, TrendingUp, Briefcase, Sparkles } from 'lucide-react';
import { sectorData } from '@/lib/career-data';

const Sectors = () => {
  const [activeTab, setActiveTab] = useState('healthcare');

  const sectorIcons = { healthcare: Heart, agritech: Leaf, smartcities: Building2 };

  return (
    <div className="min-h-screen py-12 lg:py-20">
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Sector Insights</h1>
          <p className="text-muted-foreground">Explore opportunities in emerging technology sectors</p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {Object.entries(sectorData).map(([key, sector]) => {
              const Icon = sectorIcons[key as keyof typeof sectorIcons];
              return (
                <TabsTrigger key={key} value={key} className="gap-2">
                  <Icon className="h-4 w-4" /> {sector.name}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(sectorData).map(([key, sector]) => (
            <TabsContent key={key} value={key}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>{sector.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{sector.description}</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-accent">
                        <TrendingUp className="h-5 w-5 text-agritech mb-2" />
                        <p className="font-bold text-xl">{sector.growthRate}</p>
                        <p className="text-xs text-muted-foreground">Growth Rate</p>
                      </div>
                      <div className="p-4 rounded-xl bg-accent">
                        <Briefcase className="h-5 w-5 text-primary mb-2" />
                        <p className="font-bold">{sector.avgSalary}</p>
                        <p className="text-xs text-muted-foreground">Salary Range</p>
                      </div>
                      <div className="p-4 rounded-xl bg-accent">
                        <Sparkles className="h-5 w-5 text-smartcities mb-2" />
                        <p className="font-bold text-xl">{sector.roles.length}+</p>
                        <p className="text-xs text-muted-foreground">Roles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="glass-card">
                    <CardHeader><CardTitle className="text-lg">Key Skills</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {sector.keySkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-card">
                    <CardHeader><CardTitle className="text-lg">Trending Topics</CardTitle></CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {sector.trends.map(trend => <Badge key={trend} variant="outline">{trend}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Sectors;

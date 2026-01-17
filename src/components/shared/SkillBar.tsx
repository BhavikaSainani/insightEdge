import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkillBarProps {
  skill: string;
  level: number;
  maxLevel?: number;
  variant?: 'default' | 'required' | 'missing';
  showLabel?: boolean;
}

export const SkillBar = ({
  skill,
  level,
  maxLevel = 100,
  variant = 'default',
  showLabel = true,
}: SkillBarProps) => {
  const percentage = (level / maxLevel) * 100;

  const variantClasses = {
    default: 'bg-primary',
    required: 'bg-agritech',
    missing: 'bg-destructive',
  };

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium">{skill}</span>
          <span className="text-muted-foreground">{level}%</span>
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full', variantClasses[variant])}
        />
      </div>
    </div>
  );
};

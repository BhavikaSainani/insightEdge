import { cn } from '@/lib/utils';
import { Heart, Leaf, Building2 } from 'lucide-react';
import { Sector } from '@/lib/types';

interface SectorBadgeProps {
  sector: Sector;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

const sectorConfig = {
  healthcare: {
    label: 'Healthcare',
    icon: Heart,
    bgClass: 'bg-healthcare-light',
    textClass: 'text-healthcare',
  },
  agritech: {
    label: 'Agri-Tech',
    icon: Leaf,
    bgClass: 'bg-agritech-light',
    textClass: 'text-agritech',
  },
  smartcities: {
    label: 'Smart Cities',
    icon: Building2,
    bgClass: 'bg-smartcities-light',
    textClass: 'text-smartcities',
  },
};

export const SectorBadge = ({ sector, size = 'md', showIcon = true }: SectorBadgeProps) => {
  const config = sectorConfig[sector];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        config.bgClass,
        config.textClass,
        sizeClasses[size]
      )}
    >
      {showIcon && <Icon className={iconSizes[size]} />}
      {config.label}
    </span>
  );
};

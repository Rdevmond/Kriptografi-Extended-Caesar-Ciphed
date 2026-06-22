import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'panel' | 'solid';
}

export const Card: React.FC<CardProps> = ({ children, className, variant = 'solid', ...props }) => {
  const baseClasses = {
    glass: 'bg-white border border-slate-200 shadow-sm rounded-xl p-6',
    solid: 'bg-white border border-slate-200 shadow-sm rounded-xl p-6',
    panel: 'bg-slate-50 border border-slate-100 rounded-lg p-4'
  };

  return (
    <div className={cn(baseClasses[variant], className)} {...props}>
      {children}
    </div>
  );
};

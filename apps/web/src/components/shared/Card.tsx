'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card Component
 * Reusable container with consistent styling
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  clickable = false,
  onClick,
  padding = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-lg border border-gray-200 shadow-sm
        ${paddingClasses[padding]}
        ${hoverable ? 'hover:shadow-md hover:border-gray-300 transition' : ''}
        ${clickable ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

/**
 * Card Header Component
 */
export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-200">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

interface CardBodyProps {
  children: React.ReactNode;
}

/**
 * Card Body Component
 */
export const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

/**
 * Card Footer Component
 */
export const CardFooter: React.FC<CardFooterProps> = ({ children, align = 'right' }) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={`flex gap-3 pt-4 border-t border-gray-200 ${alignClasses[align]}`}>
      {children}
    </div>
  );
};

/**
 * Empty State Component
 */
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {icon && <div className="text-gray-400 mb-4 text-5xl">{icon}</div>}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-600 text-center max-w-sm mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

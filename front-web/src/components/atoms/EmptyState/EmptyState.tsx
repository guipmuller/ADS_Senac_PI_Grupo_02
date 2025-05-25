import React from 'react';

interface EmptyStateProps {
  message: string;
  className?: string;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  message, 
  className = '', 
  icon 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 ${className}`}>
      {icon && <div className="mb-4">{icon}</div>}
      <p className="text-gray-500 text-center">{message}</p>
    </div>
  );
};
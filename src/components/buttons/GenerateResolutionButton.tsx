import React from 'react';

interface GenerateResolutionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const GenerateResolutionButton: React.FC<GenerateResolutionButtonProps> = ({
  onClick,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition-colors flex items-center ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Generar Proyecto de Resolución
    </button>
  );
};
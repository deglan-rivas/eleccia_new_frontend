import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ExpedienteInfo } from '../../types/resolution';

interface ExpedienteInfoSectionProps {
  expedienteInfo: ExpedienteInfo;
  isLoading?: boolean;
}

export const ExpedienteInfoSection: React.FC<ExpedienteInfoSectionProps> = ({
  expedienteInfo,
  isLoading = false
}) => {
  const navigate = useNavigate();

  const handleViewAnalysis = () => {
    navigate(`/expediente/${expedienteInfo.codigo}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-40"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
          <div className="mt-4">
            <div className="h-10 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Información del Expediente
          </h2>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 w-32">Código:</span>
              <span className="text-sm text-gray-800 font-mono">{expedienteInfo.codigo}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 w-32">ID Expediente:</span>
              <span className="text-sm text-gray-800">{expedienteInfo.id}</span>
            </div>
            
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 w-32">Resoluciones:</span>
              <span className="text-sm text-gray-800">
                {expedienteInfo.totalResoluciones} 
                {expedienteInfo.totalResoluciones === 1 ? ' resolución generada' : ' resoluciones generadas'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 ml-6">
          <button
            onClick={handleViewAnalysis}
            className="inline-flex items-center px-4 py-2 bg-jne-red text-white text-sm font-medium rounded-md hover:bg-red-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
              />
            </svg>
            Ver análisis del expediente
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { type CandidatoData, type RequisitoData } from '../../types/expediente';
import { RequisitoCard } from './RequisitoCard';

interface CandidatoCardProps {
  candidato: CandidatoData;
  onEditRequisito?: (requisito: RequisitoData) => void;
}

export const CandidatoCard: React.FC<CandidatoCardProps> = ({ candidato, onEditRequisito }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getInitials = () => {
    return `${candidato.nombres[0]}${candidato.apellidos[0]}`;
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-600">{getInitials()}</span>
          </div>
        </div>
        <div className="flex-1">
          <h5 className="text-lg font-semibold text-gray-800">{candidato.nombres} {candidato.apellidos}</h5>
          <p className="text-sm text-gray-600">{candidato.cargo}</p>
          <p className="text-xs text-gray-500">DNI: {candidato.dni}</p>
        </div>
        <div className="flex-shrink-0">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            candidato.cumple ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {candidato.cumple ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {candidato.cumple ? 'Cumple' : 'No Cumple'}
          </span>
        </div>
      </div>                   

      <div className="border-t border-gray-200 pt-4">
        <button 
          onClick={toggleExpanded}
          className="w-full flex justify-between items-center text-left text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          <span>Requisitos Evaluados</span>
          <svg 
            className={`h-5 w-5 transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {candidato.requisitos.map((requisito, reqIndex) => (
              <RequisitoCard
                key={reqIndex}
                requisito={requisito}
                onEdit={onEditRequisito}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
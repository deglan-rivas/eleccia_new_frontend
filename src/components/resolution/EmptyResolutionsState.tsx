import React from 'react';

interface EmptyResolutionsStateProps {
  expedienteCodigo?: string;
}

export const EmptyResolutionsState: React.FC<EmptyResolutionsStateProps> = ({
  expedienteCodigo
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-6">
        <svg
          className="w-24 h-24 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      
      <div className="text-center max-w-md">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No hay resoluciones generadas
        </h3>
        
        <p className="text-gray-500 text-sm mb-4">
          {expedienteCodigo 
            ? `No se han generado resoluciones para el expediente ${expedienteCodigo}.`
            : 'No se han generado resoluciones para este expediente.'
          }
        </p>
        
        <p className="text-gray-400 text-xs">
          Las resoluciones aparecerán aquí una vez que sean generadas desde el análisis del expediente.
        </p>
      </div>

      {/* Alternative SVG with document stack for more context */}
      <div className="mt-8 opacity-50">
        <svg
          className="w-16 h-16 text-gray-200"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};
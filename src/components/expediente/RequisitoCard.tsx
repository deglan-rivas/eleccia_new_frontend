import React from 'react';
import { type RequisitoData } from '../../types/expediente';

interface RequisitoCardProps {
  requisito: RequisitoData;
  onEdit?: (requisito: RequisitoData) => void;
  editMode?: boolean;
}

export const RequisitoCard: React.FC<RequisitoCardProps> = ({ requisito, onEdit, editMode = false }) => {
  const getIcon = () => {
    if (requisito.estado === 'CUMPLE') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else if (requisito.estado === 'NO_CUMPLE') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    }
  };

  return (
    <div className={`border rounded-lg p-4 bg-${requisito.estado_color}-50`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex justify-between">
            <h5 className="text-sm font-medium text-gray-800">{requisito.nombre}</h5>
            <span className={`text-xs bg-${requisito.estado_color}-100 text-${requisito.estado_color}-800 px-2 py-1 rounded-full`}>
              {requisito.estado_texto}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">{requisito.descripcion}</p>
          
          {requisito.observacion && (
            <div className={`mt-2 bg-${requisito.estado_color}-100 p-2 rounded text-xs text-${requisito.estado_color}-800`}>
              <p><strong>Observación:</strong> <span dangerouslySetInnerHTML={{ __html: requisito.observacion }} /></p>
            </div>
          )}
          
          <div className="mt-2 flex justify-between items-center">
            <span className="text-xs text-gray-500">{requisito.metodo_validacion}</span>
            <div className="flex space-x-2">
              {requisito.boton_accion && (
                <a href={requisito.boton_accion} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                  Ver Documento
                </a>
              )}
              {onEdit && editMode && (
                <button 
                  onClick={() => onEdit(requisito)}
                  className="text-xs text-jne-red hover:text-red-700 hover:cursor-pointer flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
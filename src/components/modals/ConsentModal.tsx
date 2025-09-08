import React from 'react';
import { type SelectedNormativas } from '../../types/normativa';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (normativas: SelectedNormativas) => void;
  selectedNormativas: SelectedNormativas;
  hasAlertRequirements?: boolean;
  alertCount?: number;
  isLoading?: boolean;
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedNormativas,
  hasAlertRequirements = false,
  alertCount = 0,
  isLoading = false
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(selectedNormativas);
  };

  return (
    <div className="fixed inset-0 modal-backdrop overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex items-center justify-between mb-6">
            <div className="w-full text-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Consentimiento para Generación de Proyecto de Resolución Asistida
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 flex-shrink-0 cursor-pointer ml-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Sección de alertas */}
          {hasAlertRequirements && alertCount > 0 && (
            <div className="mb-4">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>¡Atención!</strong> Existen {alertCount} requisitos marcados como alerta. Se recomienda revisar estos elementos antes de continuar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 px-4 py-3 bg-blue-50 rounded-lg mb-4">
            <div className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-800">
                A través de esta acción, usted reconoce que:
              </p>
            </div>
          </div>
          
          <div className="space-y-4 px-4">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-green-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-700">
                Los requisitos aplicables han sido verificados conforme a la normativa electoral vigente del Jurado Electoral Especial.
              </p>
            </div>
            <div className="flex items-start">
              <svg className="h-5 w-5 text-green-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-gray-700">
                La documentación y datos examinados son completos, veraces y se ajustan a lo requerido para la calificación de la inscripción de listas de candidatos.
              </p>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm text-yellow-800 text-justify">
                  <strong>Importante:</strong> Este proceso de calificación cuenta con el respaldo del Asistente Jurisdiccional, mediante herramienta que optimiza la revisión manual y la precisión en la elaboración de la propuesta de resolución. No obstante, la autoridad competente conserva la responsabilidad final sobre su contenido y emisión.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3 px-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 transition-colors ${
                isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300'
              }`}
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className={`px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 transition-colors flex items-center ${
                isLoading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando resolución...
                </>
              ) : (
                'Confirmar y Generar'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
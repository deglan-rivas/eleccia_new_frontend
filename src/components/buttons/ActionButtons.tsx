import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GenerateResolutionButton } from './GenerateResolutionButton';

interface ActionButtonsProps {
  expedienteId: string;
  onEditModeToggle?: (editMode: boolean) => void;
  onSaveChanges?: () => Promise<void>;
  onCancelEdit?: () => void;
  onGenerateResolution?: () => void;
  editMode?: boolean;
  hasChanges?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  expedienteId,
  onEditModeToggle,
  onSaveChanges,
  onCancelEdit,
  onGenerateResolution,
  editMode = false,
  hasChanges = false
}) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const handleEditToggle = async () => {
    if (editMode && hasChanges) {
      // Guardar cambios
      setIsSaving(true);
      try {
        if (onSaveChanges) {
          await onSaveChanges();
        }
        if (onEditModeToggle) {
          onEditModeToggle(false);
        }
      } catch (error) {
        console.error('Error al guardar cambios:', error);
        // TODO: Mostrar error toast
      } finally {
        setIsSaving(false);
      }
    } else {
      // Toggle edit mode
      if (onEditModeToggle) {
        onEditModeToggle(!editMode);
      }
    }
  };

  const handleCancelEdit = () => {
    if (onCancelEdit) {
      onCancelEdit();
    } else if (onEditModeToggle) {
      onEditModeToggle(false);
    }
  };

  const handleVerResoluciones = () => {
    navigate(`/resoluciones/${expedienteId}`);
  };

  return (
    <div className="flex justify-center mt-6 mb-8 space-x-4">
      <div className="flex space-x-4">
        {/* Botón Habilitar Edición / Guardar Cambios */}
        <button
          onClick={handleEditToggle}
          disabled={isSaving}
          className={`px-6 py-3 text-white rounded-lg shadow-sm transition-colors flex items-center ${
            editMode
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-jne-red hover:bg-red-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando cambios...
            </>
          ) : editMode ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Guardar Cambios
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Habilitar Edición
            </>
          )}
        </button>

        {/* Botón Cancelar Edición */}
        <button
          onClick={handleCancelEdit}
          className={`px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-sm transition-colors flex items-center ${
            editMode ? '' : 'hidden'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancelar Edición
        </button>

        {/* Botón Ver Resoluciones */}
        <button
          onClick={handleVerResoluciones}
          disabled={isSaving}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Ver Resoluciones
        </button>
      </div>
      
      {/* Botón Generar Proyecto de Resolución */}
      {onGenerateResolution && (
        <GenerateResolutionButton
          onClick={onGenerateResolution}
          disabled={isSaving}
        />
      )}
    </div>
  );
};
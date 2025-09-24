import React, { useState, useEffect } from 'react';
import { type RequisitoData } from '../../types/expediente';

interface EditRequisitoModalProps {
  isOpen: boolean;
  onClose: () => void;
  requisito: RequisitoData | null;
  onSave: (requisitoId: string, estado: string, observacion: string) => void;
}

export const EditRequisitoModal: React.FC<EditRequisitoModalProps> = ({
  isOpen,
  onClose,
  requisito,
  onSave
}) => {
  const [estado, setEstado] = useState('');
  const [observacion, setObservacion] = useState('');

  useEffect(() => {
    if (requisito) {
      setEstado(requisito.estado);
      setObservacion(requisito.observacion || '');
    }
  }, [requisito]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requisito) {
      onSave(requisito.id_estado_requisito, estado, observacion);
      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen || !requisito) return null;

  return (
    <div className="fixed inset-0 modal-backdrop overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Editar Requisito</h3>
            <button 
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Requisito</label>
              <p className="mt-1 text-sm text-gray-600">{requisito.nombre}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <select 
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-jne-red focus:border-jne-red sm:text-sm rounded-md"
              >
                <option value="CUMPLE">Cumple</option>
                <option value="NO_CUMPLE">No Cumple</option>
                <option value="ALERTA">Alerta</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Observación</label>
              <textarea 
                value={observacion}
                onChange={(e) => setObservacion(e.target.value)}
                rows={3}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-jne-red focus:border-jne-red sm:text-sm"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={handleClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
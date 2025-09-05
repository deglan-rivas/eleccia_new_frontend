import React from 'react';
import { type ExpedienteDetailData } from '../../types/expediente';

interface InformeModalProps {
  isOpen: boolean;
  onClose: () => void;
  expedienteData: ExpedienteDetailData;
}

export const InformeModal: React.FC<InformeModalProps> = ({ isOpen, onClose, expedienteData }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log('Downloading report...');
  };

  return (
    <div className="fixed inset-0 modal-backdrop overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Informe Completo del Expediente {expedienteData.nombre_expediente}
            </h3>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleDownload}
                className="text-jne-red hover:text-red-700 flex items-center text-sm font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar informe
              </button>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Resumen de Requisitos */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Resumen de Requisitos</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-blue-700">{expedienteData.total_requisitos}</span>
                <p className="text-sm text-blue-700 mt-1">Total Requisitos</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-green-700">{expedienteData.requisitos_cumplidos}</span>
                <p className="text-sm text-green-700 mt-1">Requisitos Cumplidos</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-red-700">{expedienteData.requisitos_faltantes}</span>
                <p className="text-sm text-red-700 mt-1">Requisitos Faltantes</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <span className="text-2xl font-bold text-yellow-700">{expedienteData.porcentaje_cumplimiento}%</span>
                <p className="text-sm text-yellow-700 mt-1">Nivel de Cumplimiento</p>
              </div>
            </div>
          </div>

          {/* Requisitos por Sección */}
          <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Requisitos por Sección</h4>
            {expedienteData.tabs.map((tab) => (
              <div key={tab.id} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="text-sm font-medium text-gray-600">{tab.nombre}</h5>
                  {tab.id === '3' ? (
                    <div className="flex items-center">
                      {/* Candidate requirements count logic would go here */}
                    </div>
                  ) : (
                    <div className="flex items-center">
                      {tab.requisitos && (
                        <span className={`text-sm font-medium ${
                          tab.requisitos.filter(r => r.estado === 'CUMPLE').length === tab.requisitos.length && tab.requisitos.length > 0
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {tab.requisitos.filter(r => r.estado === 'CUMPLE').length}/{tab.requisitos.length}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  {tab.id === '3' ? (
                    <>
                      {tab.candidatos?.map((candidato, candidatoIndex) => (
                        <div key={candidatoIndex} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{candidato.nombres} {candidato.apellidos}</span>
                            <span className={`text-sm font-medium ${
                              candidato.requisitos.filter(r => r.estado === 'CUMPLE').length === candidato.requisitos.length && candidato.requisitos.length > 0
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}>
                              {candidato.requisitos.filter(r => r.estado === 'CUMPLE').length}/{candidato.requisitos.length}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {candidato.requisitos.map((requisito, reqIndex) => (
                              <div key={reqIndex} className="flex justify-between items-center py-1">
                                <span>{requisito.nombre}</span>
                                <span className={`text-xs ${requisito.estado === 'CUMPLE' ? 'text-green-600' : 'text-red-600'}`}>
                                  {requisito.estado_texto}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {tab.requisitos?.map((requisito, reqIndex) => (
                        <div key={reqIndex} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                          <span className="text-sm">{requisito.nombre}</span>
                          <span className={`text-xs ${requisito.estado === 'CUMPLE' ? 'text-green-600' : 'text-red-600'}`}>
                            {requisito.estado_texto}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Descripción de la Resolución */}
          {/* <div className="mb-6">
            <h4 className="text-md font-semibold text-gray-700 mb-3">Descripción de la Resolución</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-600">Tipo de Resolución</h5>
                <p className="text-sm text-gray-800">{expedienteData.tipo_resolucion}</p>
              </div>
              <div className="mb-3">
                <h5 className="text-sm font-medium text-gray-600">Motivo</h5>
                <p className="text-sm text-gray-800">{expedienteData.motivo_resolucion}</p>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-600">Análisis</h5>
                <div 
                  className="text-sm text-gray-800 text-justify"
                  dangerouslySetInnerHTML={{ __html: expedienteData.analisis_resolucion }}
                />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { type ExpedienteDetailData, type RequisitoData } from '../types/expediente';
import { InformeModal } from '../components/expediente/InformeModal';
import { RequisitosTabs } from '../components/expediente/RequisitosTabs';

export const ExpedienteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [expediente, setExpediente] = useState<ExpedienteDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInformeModalOpen, setIsInformeModalOpen] = useState(false);

  useEffect(() => {
    const fetchExpediente = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/expediente/${id}`);
        // const data = await response.json();
        
        // Mock data for now
        const mockData: ExpedienteDetailData = {
          nombre_expediente: '0025-2023-JNE',
          tipo_expediente: 'Inscripción de Lista',
          materia: 'Solicitud de Inscripción',
          total_requisitos: 15,
          total_requisitos_lista: 8,
          total_requisitos_candidatos: 7,
          requisitos_cumplidos: 12,
          requisitos_faltantes: 3,
          porcentaje_cumplimiento: 80,
          mensaje_alerta: 'Algunos candidatos no presentaron certificado de antecedentes penales',
          tipo_resolucion: 'RESOLUCIÓN DE INSCRIPCIÓN',
          motivo_resolucion: 'Cumplimiento parcial de requisitos con observaciones menores',
          analisis_resolucion: 'La lista presenta el cumplimiento de los requisitos principales, sin embargo se observan algunas deficiencias en la documentación de candidatos.',
          tabs: [
            {
              id: 'documentos_lista',
              nombre: 'Documentos de Lista',
              requisitos: [
                {
                  nombre: 'Solicitud de inscripción',
                  estado: 'CUMPLE',
                  estado_texto: 'Cumple',
                  estado_color: 'green',
                  descripcion: 'Solicitud de inscripción presentada correctamente',
                  metodo_validacion: 'Validación automática',
                  id_estado_requisito: '1'
                },
                {
                  nombre: 'Plan de gobierno',
                  estado: 'CUMPLE',
                  estado_texto: 'Cumple',
                  estado_color: 'green',
                  descripcion: 'Plan de gobierno cumple con los requisitos establecidos',
                  metodo_validacion: 'Revisión manual',
                  id_estado_requisito: '2'
                }
              ]
            },
            {
              id: 'hoja_vida_candidatos',
              nombre: 'Hoja de Vida de Candidatos',
              candidatos: [
                {
                  nombres: 'Juan Carlos',
                  apellidos: 'Pérez García',
                  dni: '12345678',
                  cargo: 'Alcalde',
                  cumple: true,
                  requisitos: [
                    {
                      nombre: 'Documento de identidad',
                      estado: 'CUMPLE',
                      estado_texto: 'Cumple',
                      estado_color: 'green',
                      descripcion: 'DNI vigente presentado',
                      metodo_validacion: 'Validación RENIEC',
                      id_estado_requisito: '3'
                    },
                    {
                      nombre: 'Hoja de vida',
                      estado: 'CUMPLE',
                      estado_texto: 'Cumple',
                      estado_color: 'green',
                      descripcion: 'Hoja de vida completa y firmada',
                      metodo_validacion: 'Revisión manual',
                      id_estado_requisito: '4'
                    }
                  ]
                },
                {
                  nombres: 'María Elena',
                  apellidos: 'López Vega',
                  dni: '87654321',
                  cargo: 'Regidor',
                  cumple: false,
                  requisitos: [
                    {
                      nombre: 'Documento de identidad',
                      estado: 'CUMPLE',
                      estado_texto: 'Cumple',
                      estado_color: 'green',
                      descripcion: 'DNI vigente presentado',
                      metodo_validacion: 'Validación RENIEC',
                      id_estado_requisito: '5'
                    },
                    {
                      nombre: 'Certificado de antecedentes penales',
                      estado: 'NO_CUMPLE',
                      estado_texto: 'No Cumple',
                      estado_color: 'red',
                      descripcion: 'Certificado de antecedentes penales requerido',
                      observacion: 'Documento no presentado. Debe presentar certificado vigente.',
                      metodo_validacion: 'Revisión manual',
                      id_estado_requisito: '6'
                    }
                  ]
                }
              ]
            }
          ]
        };
        
        setExpediente(mockData);
      } catch (err) {
        setError('Error al cargar los datos del expediente');
        console.error('Error fetching expediente:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpediente();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-jne-red"></div>
      </div>
    );
  }

  if (error || !expediente) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error || 'Expediente no encontrado'}</span>
      </div>
    );
  }

  const handleEditRequisito = (requisito: RequisitoData) => {
    // TODO: Implement edit functionality
    console.log('Edit requisito:', requisito);
  };

  return (
    <>
      {/* Información del Expediente */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Información del Expediente</h3>
            <p className="text-sm text-gray-600">Detalles del expediente analizado</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Analizado
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Número de Expediente</h4>
            <p className="text-lg font-semibold text-gray-800">{expediente.nombre_expediente}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Tipo de Expediente</h4>
            <p className="text-lg font-semibold text-gray-800">{expediente.tipo_expediente}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Materia</h4>
            <p className="text-lg font-semibold text-gray-800">{expediente.materia}</p>
          </div>
        </div>
      </div>

      {/* Resumen de requisitos */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de Validación</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <span className="text-3xl font-bold text-blue-700">{expediente.total_requisitos}</span>
            <p className="text-sm text-blue-700 mt-1">Total Requisitos</p>
            <div className="mt-2 flex justify-center space-x-4 text-xs text-blue-600">
              <div className="flex items-center group relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>{expediente.total_requisitos_lista}</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Requisitos de Lista
                </div>
              </div>
              <div className="flex items-center group relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>{expediente.total_requisitos_candidatos}</span>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Requisitos de Candidatos
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <span className="text-3xl font-bold text-green-700">{expediente.requisitos_cumplidos}</span>
            <p className="text-sm text-green-700 mt-1">Requisitos Cumplidos</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <span className="text-3xl font-bold text-red-700">{expediente.requisitos_faltantes}</span>
            <p className="text-sm text-red-700 mt-1">Requisitos Faltantes</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <span className="text-3xl font-bold text-yellow-700">{expediente.porcentaje_cumplimiento}%</span>
            <p className="text-sm text-yellow-700 mt-1">Nivel de Cumplimiento</p>
          </div>
        </div>
        
        {expediente.mensaje_alerta && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Importante:</strong> {expediente.mensaje_alerta}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <div className="flex space-x-4">
            <button 
              type="button" 
              onClick={() => setIsInformeModalOpen(true)}
              className="text-jne-red hover:text-red-700 flex items-center text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ver informe completo
            </button>
          </div>
        </div>    
      </div>

      {/* Recomendación de Resolución */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto mb-6">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-800">Recomendación de Resolución</h3>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-gray-700 text-sm">
                De acuerdo al análisis realizado, se recomienda emitir una 
                <span className="font-bold text-blue-600"> {expediente.tipo_resolucion}</span> 
                para el presente expediente, considerando el cumplimiento de los requisitos establecidos y la normativa aplicable.
              </p>
            </div>
          </div>
          
          <div className="mt-3 flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <p className="text-indigo-700 text-sm font-medium">Motivo:</p>
              <p className="text-indigo-600 text-sm mt-1">{expediente.motivo_resolucion}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categorias de requisitos */}
      <RequisitosTabs 
        tabs={expediente.tabs}
        onEditRequisito={handleEditRequisito}
      />

      {/* Modal de Informe Completo */}
      <InformeModal
        isOpen={isInformeModalOpen}
        onClose={() => setIsInformeModalOpen(false)}
        expedienteData={expediente}
      />
    </>
  );
};
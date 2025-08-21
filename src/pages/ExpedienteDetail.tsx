import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

interface ExpedienteData {
  id_expediente: string;
  nombre_expediente: string;
  tipo_proceso: string;
  materia: string;
  fecha_creacion: string;
  estado: string;
  usuario: string;
  analisis?: {
    documentos_analizados: number;
    requisitos_cumplidos: number;
    requisitos_total: number;
    observaciones: string[];
    recomendacion: string;
  };
}

export const ExpedienteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [expediente, setExpediente] = useState<ExpedienteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpediente = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/expediente/${id}`);
        // const data = await response.json();
        
        // Mock data for now
        const mockData: ExpedienteData = {
          id_expediente: id,
          nombre_expediente: '0025-2023-JNE',
          tipo_proceso: 'Inscripción de Lista',
          materia: 'Solicitud de Inscripción',
          fecha_creacion: '2023-01-15',
          estado: 'COMPLETADO',
          usuario: 'admin',
          analisis: {
            documentos_analizados: 5,
            requisitos_cumplidos: 8,
            requisitos_total: 10,
            observaciones: [
              'Documento de identidad del representante legal válido',
              'Plan de gobierno presentado correctamente',
              'Falta certificado de antecedentes penales de algunos candidatos',
              'Declaración jurada de hoja de vida completa'
            ],
            recomendacion: 'APROBAR con observaciones menores'
          }
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

  const getEstadoBadgeClass = (estado: string) => {
    switch (estado) {
      case 'COMPLETADO':
        return 'bg-green-100 text-green-800';
      case 'EN_PROCESO':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRecomendacionClass = (recomendacion: string) => {
    if (recomendacion.includes('APROBAR')) {
      return 'text-green-600 bg-green-50';
    }
    if (recomendacion.includes('RECHAZAR')) {
      return 'text-red-600 bg-red-50';
    }
    return 'text-yellow-600 bg-yellow-50';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            to="/dashboard" 
            className="text-jne-red hover:text-red-700 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al dashboard
          </Link>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoBadgeClass(expediente.estado)}`}>
          {expediente.estado}
        </span>
      </div>

      {/* Expediente Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Expediente {expediente.nombre_expediente}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Tipo de Proceso:</span>
              <span className="ml-2 text-gray-800">{expediente.tipo_proceso}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Materia:</span>
              <span className="ml-2 text-gray-800">{expediente.materia}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Fecha de Creación:</span>
              <span className="ml-2 text-gray-800">{expediente.fecha_creacion}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">Usuario:</span>
              <span className="ml-2 text-gray-800">{expediente.usuario}</span>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        {expediente.analisis && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Resultados del Análisis</h2>
            
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {expediente.analisis.documentos_analizados}
                </div>
                <div className="text-sm text-blue-800">Documentos Analizados</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {expediente.analisis.requisitos_cumplidos}/{expediente.analisis.requisitos_total}
                </div>
                <div className="text-sm text-green-800">Requisitos Cumplidos</div>
              </div>
              <div className={`p-4 rounded-lg ${getRecomendacionClass(expediente.analisis.recomendacion)}`}>
                <div className="text-2xl font-bold">
                  {Math.round((expediente.analisis.requisitos_cumplidos / expediente.analisis.requisitos_total) * 100)}%
                </div>
                <div className="text-sm">Cumplimiento</div>
              </div>
            </div>

            {/* Recommendation */}
            <div className={`p-4 rounded-lg border-l-4 ${getRecomendacionClass(expediente.analisis.recomendacion)} border-current`}>
              <h3 className="font-semibold mb-2">Recomendación</h3>
              <p className="text-lg font-medium">{expediente.analisis.recomendacion}</p>
            </div>

            {/* Observations */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-gray-800">Observaciones</h3>
              <ul className="space-y-2">
                {expediente.analisis.observaciones.map((obs, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3"></span>
                    <span className="text-gray-700">{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
          <Link to={`/resoluciones/${expediente.id_expediente}`}>
            <Button variant="primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ver Resoluciones
            </Button>
          </Link>
          
          {expediente.estado === 'COMPLETADO' && (
            <Button variant="success">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descargar Resolución
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
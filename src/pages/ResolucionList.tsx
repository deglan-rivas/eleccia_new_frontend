import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

interface ResolucionData {
  id: string;
  numero: string;
  fecha: string;
  estado: string;
  archivo?: string;
  observaciones?: string;
}

export const ResolucionList: React.FC = () => {
  const { expedienteId } = useParams<{ expedienteId: string }>();
  const [resoluciones, setResoluciones] = useState<ResolucionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResoluciones = async () => {
      if (!expedienteId) return;
      
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/resoluciones/${expedienteId}`);
        // const data = await response.json();
        
        // Mock data for now
        const mockData: ResolucionData[] = [
          {
            id: '1',
            numero: 'R-001-2023',
            fecha: '2023-01-20',
            estado: 'APROBADO',
            archivo: 'resolucion_001.pdf',
            observaciones: 'Resolución aprobada sin observaciones'
          },
          {
            id: '2',
            numero: 'R-002-2023',
            fecha: '2023-01-25',
            estado: 'EN_REVISION',
            observaciones: 'Pendiente de revisión por el área legal'
          }
        ];
        
        setResoluciones(mockData);
      } catch (err) {
        setError('Error al cargar las resoluciones');
        console.error('Error fetching resoluciones:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResoluciones();
  }, [expedienteId]);

  const getEstadoBadgeClass = (estado: string) => {
    switch (estado) {
      case 'APROBADO':
        return 'bg-green-100 text-green-800';
      case 'EN_REVISION':
        return 'bg-yellow-100 text-yellow-800';
      case 'RECHAZADO':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-jne-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
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
          {expedienteId && (
            <>
              <span className="text-gray-400">|</span>
              <Link 
                to={`/expediente/${expedienteId}`}
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                Ver análisis del expediente
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Resoluciones del Expediente
        </h1>
        <p className="text-gray-600">
          Lista de todas las resoluciones generadas para este expediente
        </p>
      </div>

      {/* Resoluciones Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Listado de resoluciones ({resoluciones.length})
          </h3>
        </div>
        
        {resoluciones.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 mb-4">No hay resoluciones disponibles para este expediente</p>
            <Button variant="primary">
              Generar Nueva Resolución
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    N°
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número de Resolución
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Observaciones
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resoluciones.map((resolucion, index) => (
                  <tr key={resolucion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {resolucion.numero}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resolucion.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadgeClass(resolucion.estado)}`}>
                        {resolucion.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <div className="truncate" title={resolucion.observaciones}>
                        {resolucion.observaciones || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                          title="Ver resolución"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        
                        {resolucion.archivo && (
                          <a
                            href={`/api/resoluciones/${resolucion.id}/descargar`}
                            className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                            title="Descargar resolución"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </a>
                        )}
                        
                        {resolucion.estado !== 'APROBADO' && (
                          <button
                            className="text-yellow-600 hover:text-yellow-900 p-1 rounded-full hover:bg-yellow-50"
                            title="Editar resolución"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {resoluciones.length > 0 && (
        <div className="flex justify-end space-x-3">
          <Button variant="secondary">
            Exportar Listado
          </Button>
          <Button variant="primary">
            Nueva Resolución
          </Button>
        </div>
      )}
    </div>
  );
};
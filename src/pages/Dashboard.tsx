import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';

interface FilterData {
  num_expediente: string;
  tipo_proceso: string;
  materia: string;
  fecha_desde: string;
  fecha_hasta: string;
  estado: string;
}

interface ProcessData {
  id_expediente: string;
  nombre_expediente: string;
  tipo_proceso: string;
  materia: string;
  fecha_creacion: string;
  usuario: string;
  estado: string;
  archivo_resolucion?: string;
  id_resolucion?: string;
}

interface PaginationData {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  has_prev: boolean;
  has_next: boolean;
}

interface DashboardData {
  procesos: ProcessData[];
  pagination: PaginationData;
}

export const Dashboard: React.FC = () => {
  const [filters, setFilters] = useState<FilterData>({
    num_expediente: '',
    tipo_proceso: '',
    materia: '',
    fecha_desde: '',
    fecha_hasta: '',
    estado: ''
  });

  const [dashboardData, setDashboardData] = useState<DashboardData>({
    procesos: [],
    pagination: {
      current_page: 1,
      per_page: 10,
      total_pages: 1,
      total_records: 0,
      has_prev: false,
      has_next: false
    }
  });

  const [loading, setLoading] = useState(true);

  const tipoProcesoOptions = [
    { value: '', label: 'Todos' },
    { value: '1', label: 'Inscripción de Lista' },
    { value: '2', label: 'Acta Electoral' },
    { value: '3', label: 'Publicidad Estatal' },
    { value: '4', label: 'Propaganda Electoral' },
    { value: '5', label: 'Nulidad Electoral' }
  ];

  const materiaOptions = [
    { value: '', label: 'Todas' },
    { value: '5', label: 'Solicitud de Inscripción' },
    { value: '2', label: 'Apelación' },
    { value: '3', label: 'Nulidad' },
    { value: '4', label: 'Tacha' },
    { value: '1', label: 'Vacancia' }
  ];

  const estadoOptions = [
    { value: '', label: 'Todos' },
    { value: 'PENDIENTE', label: 'Pendiente' },
    { value: 'EN_PROCESO', label: 'En Proceso' },
    { value: 'COMPLETADO', label: 'Completado' }
  ];

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual search functionality
    console.log('Searching with filters:', filters);
  };

  const handleClear = () => {
    setFilters({
      num_expediente: '',
      tipo_proceso: '',
      materia: '',
      fecha_desde: '',
      fecha_hasta: '',
      estado: ''
    });
  };

  // TODO: Replace with actual data fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock data for now
        const mockData: DashboardData = {
          procesos: [
            {
              id_expediente: '1',
              nombre_expediente: '0025-2023-JNE',
              tipo_proceso: 'Inscripción de Lista',
              materia: 'Solicitud de Inscripción',
              fecha_creacion: '2023-01-15',
              usuario: 'admin',
              estado: 'COMPLETADO',
              archivo_resolucion: 'resolucion.pdf',
              id_resolucion: '123'
            }
          ],
          pagination: {
            current_page: 1,
            per_page: 10,
            total_pages: 1,
            total_records: 1,
            has_prev: false,
            has_next: false
          }
        };
        setDashboardData(mockData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-jne-red"></div>
      </div>
    );
  }

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Dashboard de Resoluciones</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Consulta y gestiona todas las resoluciones procesadas en el sistema.</p>
      </div>

      {/* Filters Card */}
      <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros de búsqueda</h3>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Número de Expediente"
              name="num_expediente"
              value={filters.num_expediente}
              onChange={handleFilterChange}
              placeholder="Ej: 0025-2023-JNE"
            />
            
            <Select
              label="Tipo de Proceso"
              name="tipo_proceso"
              value={filters.tipo_proceso}
              onChange={handleFilterChange}
              options={tipoProcesoOptions}
            />
            
            <Select
              label="Materia"
              name="materia"
              value={filters.materia}
              onChange={handleFilterChange}
              options={materiaOptions}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Fecha desde"
              name="fecha_desde"
              type="date"
              value={filters.fecha_desde}
              onChange={handleFilterChange}
            />
            
            <Input
              label="Fecha hasta"
              name="fecha_hasta"
              type="date"
              value={filters.fecha_hasta}
              onChange={handleFilterChange}
            />
            
            <Select
              label="Estado"
              name="estado"
              value={filters.estado}
              onChange={handleFilterChange}
              options={estadoOptions}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="secondary"
              onClick={handleClear}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpiar
            </Button>
            <Button type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar
            </Button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Listado de resoluciones</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expediente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo Proceso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Ingreso</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dashboardData.procesos.map((proceso, index) => (
                <tr key={proceso.id_expediente}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {(dashboardData.pagination.current_page - 1) * dashboardData.pagination.per_page + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proceso.nombre_expediente}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proceso.tipo_proceso}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proceso.materia}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proceso.fecha_creacion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{proceso.usuario}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoBadgeClass(proceso.estado)}`}>
                      {proceso.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Link 
                        to={`/expediente/${proceso.id_expediente}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                        title="Ver análisis"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                      <Link 
                        to={`/resoluciones/${proceso.id_expediente}`}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-50"
                        title="Ver resoluciones"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </Link>
                      {proceso.estado === 'COMPLETADO' && proceso.archivo_resolucion && (
                        <a 
                          href={`/api/descargar_resolucion/${proceso.id_expediente}?id_resolucion=${proceso.id_resolucion}`}
                          className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-50"
                          title="Descargar resolución"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
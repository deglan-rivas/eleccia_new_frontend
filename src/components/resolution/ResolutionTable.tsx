import React from 'react';
import type { FormattedResolutionData } from '../../types/resolution';
import resolutionService from '../../services/resolutionService';

interface ResolutionTableProps {
  resolutions: FormattedResolutionData[];
  isLoading?: boolean;
  onDownloadError?: (error: string) => void;
}

export const ResolutionTable: React.FC<ResolutionTableProps> = ({
  resolutions,
  isLoading = false,
  onDownloadError
}) => {
  const handleDownload = async (resolution: FormattedResolutionData) => {
    if (!resolution.archivoDisponible || !resolution.archivoNombre) {
      onDownloadError?.('Archivo no disponible para descarga');
      return;
    }

    try {
      await resolutionService.downloadResolution(resolution.archivoNombre);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al descargar el archivo';
      onDownloadError?.(errorMessage);
    }
  };

  const getEstadoBadgeClasses = (color: string): string => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (color) {
      case 'green':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'yellow':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'red':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Listado de Resoluciones</h3>
        <div className="animate-pulse">
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Listado de Resoluciones
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código de Resolución
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo Resolución
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Creación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {resolutions.map((resolution) => (
              <tr key={resolution.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900 font-mono">
                      {resolution.codigo}
                    </div>
                    {resolution.estadisticas.totalRequisitos > 0 && (
                      <div className="text-xs text-gray-500">
                        {resolution.estadisticas.cumplidos}/{resolution.estadisticas.totalRequisitos} requisitos
                        <span className="ml-2 font-semibold text-gray-600">
                          ({resolution.estadisticas.porcentajeCumplimiento}%)
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{resolution.usuario}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{resolution.tipoResolucion}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getEstadoBadgeClasses(resolution.estadoBadge.color)}>
                    {resolution.estadoBadge.text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-900">{resolution.fechaCreacion}</div>
                    {resolution.fechaModificacion !== resolution.fechaCreacion && (
                      <div className="text-xs text-gray-500">
                        Mod: {resolution.fechaModificacion}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-2">
                    {resolution.archivoDisponible ? (
                      <button
                        onClick={() => handleDownload(resolution)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-jne-red bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Descargar
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 text-xs text-gray-400">
                        No disponible
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Summary */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          Mostrando {resolutions.length} {resolutions.length === 1 ? 'resolución' : 'resoluciones'}
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 rounded-full mr-1"></div>
            <span className="text-xs">Completada</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-100 rounded-full mr-1"></div>
            <span className="text-xs">Pendiente</span>
          </div>
        </div>
      </div>
    </div>
  );
};
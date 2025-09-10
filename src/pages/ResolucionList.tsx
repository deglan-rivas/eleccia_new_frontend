import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExpedienteInfoSection } from '../components/resolution/ExpedienteInfoSection';
import { EmptyResolutionsState } from '../components/resolution/EmptyResolutionsState';
import { ResolutionTable } from '../components/resolution/ResolutionTable';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import resolutionService from '../services/resolutionService';
import type { FormattedResolutionData, ExpedienteInfo } from '../types/resolution';

export const ResolucionList: React.FC = () => {
  const { codigo } = useParams<{ codigo: string }>();
  const [resoluciones, setResoluciones] = useState<FormattedResolutionData[]>([]);
  const [expedienteInfo, setExpedienteInfo] = useState<ExpedienteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast, showError, hideToast } = useToast();

  useEffect(() => {
    const fetchResoluciones = async () => {
      if (!codigo) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await resolutionService.getResolutionsByExpediente(codigo);
        
        // Filter only COMPLETADA resolutions and then format them
        const completedResolutions = response.resoluciones.filter(resolution => 
          resolution.estado === 'COMPLETADA'
        );
        
        const formattedResoluciones = completedResolutions.map(resolution => 
          resolutionService.formatResolutionData(resolution)
        );
        
        const expedienteInfo = resolutionService.formatExpedienteInfo(response);
        
        setResoluciones(formattedResoluciones);
        setExpedienteInfo(expedienteInfo);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar las resoluciones';
        setError(errorMessage);
        showError(errorMessage);
        console.error('Error fetching resoluciones:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResoluciones();
  }, [codigo]);

  const handleDownloadError = (error: string) => {
    showError(error);
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
    <div className="max-w-7xl mx-auto space-y-6 p-6">
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

      {/* Expediente Info Section */}
      {expedienteInfo && (
        <ExpedienteInfoSection 
          expedienteInfo={expedienteInfo} 
          isLoading={loading}
        />
      )}

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-64 mb-4"></div>
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
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Content */}
      {!loading && !error && (
        <>
          {resoluciones.length === 0 ? (
            <EmptyResolutionsState expedienteCodigo={codigo} />
          ) : (
            <ResolutionTable 
              resolutions={resoluciones}
              onDownloadError={handleDownloadError}
            />
          )}
        </>
      )}

      {/* Toast Component */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
};
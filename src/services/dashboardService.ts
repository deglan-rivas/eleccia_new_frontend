import apiClient from '../config/axios';
import { handleApiError } from '../utils/apiErrorHandler';
import { DASHBOARD_ENDPOINTS } from '../config/endpoints';

// Backend response interfaces
export interface BackendProcesoResponse {
  id_expediente: number;
  expediente: string;
  nombre_expediente: string;
  tipo_expediente: string;
  materia: string;
  estado: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  usuario: string;
  archivo_resolucion: string | null;
  id_resolucion: number | null;
}

export interface BackendPaginationResponse {
  current_page: number;
  total_pages: number;
  total_records: number;
  per_page: number;
  has_prev: boolean;
  has_next: boolean;
}

export interface BackendListadoProcesadosResponse {
  procesos: BackendProcesoResponse[];
  pagination: BackendPaginationResponse;
}

// Frontend interfaces (matching existing Dashboard structure)
export interface FrontendProcesoData {
  id_expediente: string;
  nombre_expediente: string;
  tipo_expediente: string;
  materia: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  usuario: string;
  estado: string;
  archivo_resolucion?: string;
  id_resolucion?: string;
}

export interface FrontendPaginationData {
  current_page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
  has_prev: boolean;
  has_next: boolean;
}

export interface FrontendDashboardData {
  procesos: FrontendProcesoData[];
  pagination: FrontendPaginationData;
}

class DashboardService {
  /**
   * Fetch processed records list from backend
   */
  async getListadoProcesados(page: number = 1, filters?: Record<string, string | number>): Promise<FrontendDashboardData> {
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      
      // Add filters if provided
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== '') {
            params.append(key, value.toString());
          }
        });
      }

      const response = await apiClient.get<BackendListadoProcesadosResponse>(`${DASHBOARD_ENDPOINTS.LISTADO_PROCESADOS}?${params.toString()}`);
      console.log('response de erick: ', response)
      
      return this.mapBackendResponseToFrontend(response.data);
    } catch (error) {
      console.error('Error fetching listado procesados:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Map backend response to frontend format
   */
  private mapBackendResponseToFrontend(backendData: BackendListadoProcesadosResponse): FrontendDashboardData {
    return {
      procesos: backendData.procesos.map(proceso => this.mapProcesoToFrontend(proceso)),
      pagination: this.mapPaginationToFrontend(backendData.pagination)
    };
  }

  /**
   * Map individual proceso from backend to frontend format
   */
  private mapProcesoToFrontend(backendProceso: BackendProcesoResponse): FrontendProcesoData {
    return {
      id_expediente: backendProceso.id_expediente.toString(),
      nombre_expediente: backendProceso.nombre_expediente,
      tipo_expediente: this.formatTipoProceso(backendProceso.tipo_expediente),
      materia: this.formatMateria(backendProceso.materia),
      fecha_creacion: backendProceso.fecha_creacion,
      fecha_modificacion: backendProceso.fecha_actualizacion,
      usuario: backendProceso.usuario,
      estado: this.formatEstado(backendProceso.estado),
      archivo_resolucion: backendProceso.archivo_resolucion || undefined,
      id_resolucion: backendProceso.id_resolucion?.toString() || undefined
    };
  }

  /**
   * Map pagination from backend to frontend format
   */
  private mapPaginationToFrontend(backendPagination: BackendPaginationResponse): FrontendPaginationData {
    return {
      current_page: backendPagination.current_page,
      per_page: backendPagination.per_page,
      total_pages: backendPagination.total_pages,
      total_records: backendPagination.total_records,
      has_prev: backendPagination.has_prev,
      has_next: backendPagination.has_next
    };
  }

  /**
   * Format tipo_proceso for better display
   */
  private formatTipoProceso(tipoProceso: string): string {
    const formatMap: Record<string, string> = {
      'INSCRIPCION_LISTAS': 'Inscripción de Listas',
      'TACHA_CANDIDATO': 'Tacha de Candidato',
      'EXCLUSION_CANDIDATO': 'Exclusión de Candidato'
    };
    
    return formatMap[tipoProceso] || tipoProceso;
  }

  /**
   * Format materia for better display
   */
  private formatMateria(materia: string): string {
    const formatMap: Record<string, string> = {
      'SOLICITUD_INSCRIPCION': 'Solicitud de Inscripción',
      'SUBSANACION': 'Subsanación',
      'RECURSO_APELACION': 'Recurso de Apelación'
    };
    
    return formatMap[materia] || materia;
  }

  /**
   * Format estado for better display
   */
  private formatEstado(estado: string): string {
    const formatMap: Record<string, string> = {
      'COMPLETADO': 'Completado',
      'EN_PROCESO': 'En Proceso',
      'PENDIENTE': 'Pendiente',
      'CANCELADO': 'Cancelado'
    };
    
    return formatMap[estado] || estado;
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;
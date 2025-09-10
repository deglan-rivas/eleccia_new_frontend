import apiClient from '../config/axios';
import { RESOLUTION_ENDPOINTS } from '../config/endpoints';
import { handleApiError } from '../utils/apiErrorHandler';
import type { 
  ResolutionListResponse, 
  FormattedResolutionData, 
  ExpedienteInfo,
  ResolutionData
} from '../types/resolution';

class ResolutionService {
  /**
   * Get resolutions by expediente code
   */
  async getResolutionsByExpediente(codigo: string): Promise<ResolutionListResponse> {
    try {
      const response = await apiClient.get<ResolutionListResponse>(
        RESOLUTION_ENDPOINTS.GET_RESOLUTIONS,
        {
          params: { codigo },
          timeout: 30000
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching resolutions:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Format resolution data for display
   */
  formatResolutionData(resolution: ResolutionData): FormattedResolutionData {
    const porcentajeCumplimiento = resolution.total_requisitos > 0 
      ? Math.round((resolution.requisitos_cumplidos / resolution.total_requisitos) * 100)
      : 0;

    return {
      id: resolution.id_resolucion,
      codigo: resolution.codigo_resolucion,
      tipoResolucion: resolution.tipo_resolucion || 'Sin especificar',
      usuario: resolution.usuario_asignado,
      estado: resolution.estado,
      estadoBadge: this.getEstadoBadge(resolution.estado),
      fechaCreacion: this.formatDate(resolution.fecha_creacion),
      fechaModificacion: this.formatDate(resolution.fecha_modificacion),
      archivoDisponible: !!resolution.archivo_resolucion,
      archivoNombre: resolution.archivo_resolucion || undefined,
      estadisticas: {
        totalRequisitos: resolution.total_requisitos,
        cumplidos: resolution.requisitos_cumplidos,
        faltantes: resolution.requisitos_faltantes,
        porcentajeCumplimiento
      }
    };
  }

  /**
   * Format expediente info for display
   */
  formatExpedienteInfo(response: ResolutionListResponse): ExpedienteInfo {
    return {
      codigo: response.expediente,
      id: response.id_expediente,
      totalResoluciones: response.total_resoluciones
    };
  }

  /**
   * Get badge configuration for resolution state
   */
  private getEstadoBadge(estado: 'PENDIENTE' | 'COMPLETADA'): { text: string; color: 'yellow' | 'green' | 'red' | 'gray' } {
    switch (estado) {
      case 'COMPLETADA':
        return { text: 'Completada', color: 'green' };
      case 'PENDIENTE':
        return { text: 'Pendiente', color: 'yellow' };
      default:
        return { text: 'Desconocido', color: 'gray' };
    }
  }

  /**
   * Format date for display
   */
  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-PE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date);
    } catch (error) {
      console.warn('Error formatting date:', dateString, error);
      return dateString;
    }
  }

  /**
   * Build download URL for resolution file using codigo_resolucion
   */
  buildDownloadUrl(codigoResolucion: string): string {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://192.168.27.222:5010';
    return `${baseUrl}/descarga/descargar_resolucion?codigo_resolucion=${codigoResolucion}`;
  }

  /**
   * Download resolution file using codigo_resolucion
   */
  async downloadResolution(codigoResolucion: string): Promise<void> {
    try {
      const url = this.buildDownloadUrl(codigoResolucion);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading resolution:', error);
      throw new Error('Error al descargar la resolución');
    }
  }
}

const resolutionService = new ResolutionService();
export default resolutionService;
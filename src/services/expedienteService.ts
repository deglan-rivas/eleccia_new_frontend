import apiClient from '../config/axios';
import { type ExpedienteDetailData } from '../types/expediente';
import { type SelectedNormativas } from '../types/normativa';
import { handleApiError } from '../utils/apiErrorHandler';
import { mapExpedienteDetailData, validateBackendResponse, type BackendExpedienteResponse } from '../utils/dataMappers';

export interface ExpedienteApiResponse {
  success: boolean;
  data: ExpedienteDetailData;
  message?: string;
}

export interface GenerateResolutionRequest {
  normativas: SelectedNormativas;
}

export interface GenerateResolutionResponse {
  success: boolean;
  message: string;
  resolution_url?: string;
}

export interface SaveRequisitoRequest {
  id_expediente: string;
  requisito_id: string;
  estado: string;
  observacion: string;
}

export interface SaveRequisitoResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

class ExpedienteService {
  /**
   * Get expediente details by ID
   */
  async getExpedienteDetail(idExpediente: string): Promise<ExpedienteDetailData> {
    try {
      const response = await apiClient.get<BackendExpedienteResponse>('/expediente/analisis', {
        params: {
          codigo: idExpediente
        }
      });

      console.log('Raw backend response:', response.data);

      // Validate the backend response structure
      if (!validateBackendResponse(response.data)) {
        throw new Error('Estructura de respuesta del backend inválida');
      }

      // Map backend data to frontend types
      const mappedData = mapExpedienteDetailData(response.data);
      console.log('Mapped frontend data:', mappedData);

      return mappedData;
    } catch (error) {
      console.error('Error fetching expediente:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Generate resolution for expediente
   */
  async generateResolution(
    nombreExpediente: string, 
    normativas: SelectedNormativas
  ): Promise<GenerateResolutionResponse> {
    try {
      const response = await apiClient.post<GenerateResolutionResponse>(
        '/generar_resolucion',
        { normativas },
        {
          params: {
            nombre_expediente: nombreExpediente
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error generating resolution:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Save requisito changes
   */
  async saveRequisito(
    idExpediente: string,
    requisitoId: string,
    estado: string,
    observacion: string
  ): Promise<SaveRequisitoResponse> {
    try {
      const formData = new FormData();
      formData.append('id_expediente', idExpediente);
      formData.append(`requisito_${requisitoId}`, estado);
      if (observacion) {
        formData.append(`observacion_${requisitoId}`, observacion);
      }

      const response = await apiClient.post<SaveRequisitoResponse>(
        '/guardar_cambios_requisitos',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error saving requisito:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Save multiple requisito changes
   */
  async saveMultipleRequisitos(
    idExpediente: string,
    cambios: Array<{ requisitoId: string; estado: string; observacion?: string }>
  ): Promise<SaveRequisitoResponse> {
    try {
      const formData = new FormData();
      formData.append('id_expediente', idExpediente);
      
      cambios.forEach(cambio => {
        formData.append(`requisito_${cambio.requisitoId}`, cambio.estado);
        if (cambio.observacion) {
          formData.append(`observacion_${cambio.requisitoId}`, cambio.observacion);
        }
      });

      const response = await apiClient.post<SaveRequisitoResponse>(
        '/guardar_cambios_requisitos',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error saving multiple requisitos:', error);
      throw handleApiError(error);
    }
  }
}

// Export singleton instance
export const expedienteService = new ExpedienteService();
export default expedienteService;
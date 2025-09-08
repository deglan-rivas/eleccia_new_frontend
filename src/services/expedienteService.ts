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
  codigo_resolucion?: string;
  archivo_resolucion?: string;
  tipo_resolucion?: string;
  fecha_generacion?: string;
}

export interface GenerateResolutionErrorResponse {
  error: string;
}

export interface SaveRequisitoRequest {
  id_expediente: string;
  requisito_id: string;
  estado: string;
  observacion: string;
}

// Bulk save interfaces
export interface BulkSaveRequisitoItem {
  requisitoId: string;
  estado: string;
  observacion: string;
}

export interface BulkSaveRequisitoRequest {
  requisitos_data: BulkSaveRequisitoItem[];
}

export interface BulkSaveRequisitoResponse {
  success: boolean;
  message: string;
  cambiosGuardados: number;
}

// Backend response interface
interface BackendSaveRequisitoResponse {
  success: boolean;
  inappropriate: boolean;
  message: string;
  details: {
    bad_words: string[];
  };
}

// Frontend response interface  
export interface SaveRequisitoResponse {
  success: boolean;
  isInappropriate: boolean;
  message: string;
  badWords: string[];
}

class ExpedienteService {
  /**
   * Map backend save requisito response to frontend format
   */
  private mapSaveRequisitoResponse(backendResponse: BackendSaveRequisitoResponse): SaveRequisitoResponse {
    return {
      success: backendResponse.success,
      isInappropriate: backendResponse.inappropriate,
      message: backendResponse.message,
      badWords: backendResponse.details?.bad_words || []
    };
  }
  /**
   * Get expediente details by ID
   */
  async getExpedienteDetail(idExpediente: string): Promise<ExpedienteDetailData> {
    try {
      const response = await apiClient.get<BackendExpedienteResponse>('/resultados/analisis', {
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
    codigoExpediente: string, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _normativas: SelectedNormativas
  ): Promise<GenerateResolutionResponse> {
    try {
      const response = await apiClient.post<GenerateResolutionResponse | GenerateResolutionErrorResponse>(
        '/resolucion/generar_resolucion',
        {}, // Empty body as per the example
        {
          params: {
            codigo: codigoExpediente
          },
          timeout: 300000 // 5 minutes timeout
        }
      );

      // Handle error response format
      if ('error' in response.data) {
        throw new Error((response.data as GenerateResolutionErrorResponse).error);
      }

      return response.data as GenerateResolutionResponse;
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
    _estado: string,
    observacion: string
  ): Promise<SaveRequisitoResponse> {
    try {
      // Validate observacion is not empty after trimming
      const trimmedObservacion = observacion.trim();
      if (!trimmedObservacion) {
        throw new Error('La observación no puede estar vacía');
      }

      const formData = new FormData();
      formData.append('id_expediente', idExpediente);
      formData.append('id_requisito', requisitoId);
      formData.append('observacion', trimmedObservacion);

      const response = await apiClient.post<BackendSaveRequisitoResponse>(
        '/expediente/editar_calificacion',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      // Map backend response to frontend format
      const mappedResponse = this.mapSaveRequisitoResponse(response.data);
      
      return mappedResponse;
    } catch (error) {
      console.error('Error saving requisito:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Save multiple requisito changes in bulk
   */
  async saveBulkRequisitos(codigo: string, cambios: BulkSaveRequisitoItem[]): Promise<BulkSaveRequisitoResponse> {
    try {
      const requestBody: BulkSaveRequisitoRequest = { requisitos_data: cambios };

      const response = await apiClient.post<BulkSaveRequisitoResponse>(
        '/expediente/guardar_cambios_calificacion',
        requestBody,
        {
          params: { codigo },
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000 // 30 seconds timeout for bulk operations
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error saving bulk requisitos:', error);
      throw handleApiError(error);
    }
  }

  /**
   * Save multiple requisito changes (legacy method)
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
        '/expediente/editar_calificacion',
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
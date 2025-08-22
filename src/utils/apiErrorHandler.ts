import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  message: string;
  detail?: string;
  status?: number;
}

export class ApiError extends Error {
  public status: number;
  public detail?: string;

  constructor(message: string, status: number = 500, detail?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

/**
 * Handle and format API errors consistently
 */
export const handleApiError = (error: unknown): ApiError => {
  // Handle axios errors
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;
    const responseData = error.response?.data;
    
    // Extract error message from response
    let message = 'Error de conexión con el servidor';
    let detail = error.message;

    if (responseData) {
      if (typeof responseData === 'string') {
        message = responseData;
      } else if (responseData.message) {
        message = responseData.message;
        detail = responseData.detail;
      } else if (responseData.error) {
        message = responseData.error;
      }
    }

    // Handle specific HTTP status codes
    switch (status) {
      case 400:
        message = responseData?.message || 'Solicitud inválida';
        break;
      case 401:
        message = 'No autorizado - Verifique sus credenciales';
        break;
      case 403:
        message = 'Acceso denegado - Permisos insuficientes';
        break;
      case 404:
        message = 'Recurso no encontrado';
        break;
      case 422:
        message = responseData?.message || 'Datos de entrada inválidos';
        break;
      case 500:
        message = 'Error interno del servidor';
        break;
      case 502:
        message = 'Servidor no disponible';
        break;
      case 503:
        message = 'Servicio temporalmente no disponible';
        break;
      default:
        if (status >= 500) {
          message = 'Error del servidor';
        } else if (status >= 400) {
          message = 'Error en la solicitud';
        }
    }

    return new ApiError(message, status, detail);
  }

  // Handle standard errors
  if (error instanceof Error) {
    return new ApiError(error.message, 500);
  }

  // Handle unknown errors
  return new ApiError('Error desconocido', 500);
};

/**
 * Format error message for user display
 */
export const formatErrorMessage = (error: ApiError | Error): string => {
  if (error instanceof ApiError) {
    return error.detail ? `${error.message}: ${error.detail}` : error.message;
  }
  return error.message || 'Error desconocido';
};

/**
 * Check if error is a network/connection error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return !error.response && error.code === 'ECONNREFUSED';
  }
  return false;
};

/**
 * Check if error is a timeout error
 */
export const isTimeoutError = (error: unknown): boolean => {
  if (error instanceof AxiosError) {
    return error.code === 'ECONNABORTED' || error.message.includes('timeout');
  }
  return false;
};
/**
 * Centralized endpoint configuration
 * This file contains all API endpoints used throughout the application
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7999';

/**
 * Authentication endpoints
 */
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email'
} as const;

/**
 * Expediente endpoints
 */
export const EXPEDIENTE_ENDPOINTS = {
  GET_DETAIL: '/expediente/analisis',
  SAVE_CHANGES: '/guardar_cambios_requisitos',
  GENERATE_RESOLUTION: '/generar_resolucion',
  LIST_RESOLUCIONES: '/listado_resoluciones_expediente'
} as const;

/**
 * Dashboard endpoints
 */
export const DASHBOARD_ENDPOINTS = {
  LISTADO_PROCESADOS: '/expediente/listado_procesados'
} as const;

/**
 * User management endpoints
 */
export const USER_ENDPOINTS = {
  GET_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  CHANGE_PASSWORD: '/user/change-password',
  GET_PERMISSIONS: '/user/permissions'
} as const;

/**
 * Parámetros de requisitos endpoints
 */
export const PARAMETROS_ENDPOINTS = {
  SAVE_CONFIGURATION: '/plataforma/guarda_parametros',
  GET_CONFIGURATION: '/parametros/obtener_configuracion',
  LIST_CONFIGURATIONS: '/parametros/listar_configuraciones'
} as const;

/**
 * Backend endpoints para procesamiento de expedientes
 */
export const BACKEND_ENDPOINTS = {
  CALIFICAR_EXPEDIENTE: '/expediente/calificar_expediente'
} as const;

/**
 * Backend URLs específicas (para endpoints que usan servidores diferentes)
 */
export const BACKEND_URLS = {
  CALIFICAR_EXPEDIENTE_BASE: 'http://192.168.27.222:5010'
} as const;

/**
 * System endpoints
 */
export const SYSTEM_ENDPOINTS = {
  HEALTH: '/health',
  VERSION: '/version',
  CONFIG: '/config'
} as const;

/**
 * Build complete URL for an endpoint
 */
export const buildUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  let url = `${API_BASE_URL}${endpoint}`;
  
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }
  
  return url;
};

/**
 * Environment-specific configurations
 */
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
} as const;

/**
 * Auth-related constants
 */
export const AUTH_CONFIG = {
  TOKEN_KEY: 'eleccia_auth_token',
  REFRESH_TOKEN_KEY: 'eleccia_refresh_token',
  USER_KEY: 'eleccia_user',
  TOKEN_EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes before expiry
} as const;
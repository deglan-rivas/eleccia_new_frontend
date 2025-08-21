import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens or additional headers here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
    } else if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const expedienteAPI = {
  analyzeExpediente: (data: any) => api.post('/analiza_expediente', data),
  getExpediente: (id: string) => api.get(`/expediente/${id}`),
  getExpedienteList: (filters: any) => api.get('/listado_procesados', { params: filters }),
};

export const resolucionAPI = {
  getResoluciones: (expedienteId: string) => api.get(`/resoluciones/${expedienteId}`),
  downloadResolucion: (expedienteId: string, resolucionId: string) => 
    api.get(`/descargar_resolucion/${expedienteId}?id_resolucion=${resolucionId}`, {
      responseType: 'blob'
    }),
};

export default api;
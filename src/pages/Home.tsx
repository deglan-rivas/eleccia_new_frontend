import React, { useState } from 'react';
import { Alert } from '../components/ui/Alert';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { BACKEND_ENDPOINTS, BACKEND_URLS } from '../config/endpoints';
import { fakeBackendCall } from '../utils/fakeBackendCall';

interface FormData {
  num_expediente: string;
  tipo_expediente: string;
  tipo_materia: string;
}

// Interfaces para la validación
interface ValidationSuccess {
  isValid: true;
  tipoEleccion: string;
  año: number;
  codigo: string;
}

interface ValidationError {
  isValid: false;
  error: string;
}

type ValidationResult = ValidationSuccess | ValidationError;

// Función de validación del formato de expediente
const validateExpedienteFormat = (expediente: string): ValidationResult => {
  const trimmedExpediente = expediente.trim().toUpperCase();
  
  // Regex para validar el formato: (EG|ERM|EMC).YYYY######
  const expedienteRegex = /^(EG|ERM|EMC)\.(\d{4})(\d{6})$/;
  const match = trimmedExpediente.match(expedienteRegex);
  
  if (!match) {
    return {
      isValid: false,
      error: 'Formato inválido. El expediente debe seguir el patrón: EG.2026105522, ERM.2022012288 o EMC.2025005358'
    };
  }
  
  const [, tipoEleccion, año, codigo] = match;
  const añoNum = parseInt(año);
  const añoActual = new Date().getFullYear();
  
  // Validar que el año sea razonable (entre 2000 y 5 años en el futuro)
  if (añoNum < 2000 || añoNum > añoActual + 5) {
    return {
      isValid: false,
      error: `Año inválido (${año}). El año debe estar entre 2000 y ${añoActual + 5}`
    };
  }
  
  // Validar que el código tenga exactamente 6 dígitos
  if (codigo.length !== 6) {
    return {
      isValid: false,
      error: 'El código del expediente debe tener exactamente 6 dígitos'
    };
  }
  
  // Validar tipos de proceso electoral
  const tiposValidos = {
    'EG': 'Elecciones Generales',
    'ERM': 'Elecciones Regionales y Municipales',
    'EMC': 'Elecciones Municipales Complementarias'
  };
  
  return {
    isValid: true,
    tipoEleccion: tiposValidos[tipoEleccion as keyof typeof tiposValidos],
    año: añoNum,
    codigo
  };
};

export const Home: React.FC = () => {
  const { toast, showError, hideToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    num_expediente: '',
    tipo_expediente: '1',
    tipo_materia: '5'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    show: boolean;
    expediente: string;
    processingTime: string;
    dashboardUrl: string;
  }>({
    show: false,
    expediente: '',
    processingTime: '',
    dashboardUrl: ''
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
    if (success.show) setSuccess(prev => ({ ...prev, show: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.num_expediente.trim()) {
      showError('El número de expediente es requerido');
      return;
    }

    // Validar formato del expediente
    const validationResult = validateExpedienteFormat(formData.num_expediente);
    
    if (!validationResult.isValid) {
      showError(validationResult.error || 'Formato de expediente inválido');
      return;
    }

    // Si es válido, mostrar información en console.log
    if (validationResult.isValid) {
      console.log('📋 Expediente válido:', {
        expediente: formData.num_expediente.trim().toUpperCase(),
        tipoEleccion: validationResult.tipoEleccion,
        año: validationResult.año,
        codigo: validationResult.codigo,
        timestamp: new Date().toISOString()
      });
    }

    setLoading(true);
    setError(null);
    setSuccess(prev => ({ ...prev, show: false }));

    // Marcar el inicio del procesamiento
    const startTime = Date.now();

    try {
      const expedienteFormateado = formData.num_expediente.trim().toUpperCase();
      
      // Construir URL con query parameter para el backend específico
      const endpoint = `${BACKEND_ENDPOINTS.CALIFICAR_EXPEDIENTE}?codigo=${encodeURIComponent(expedienteFormateado)}`;
      
      console.log('🚀 Enviando petición al backend:', `${BACKEND_URLS.CALIFICAR_EXPEDIENTE_BASE}${endpoint}`);
      
      // Realizar petición POST con timeout de 5 minutos (solo para esta petición)
      // const response = await apiClient.post(endpoint, {}, {
      //   baseURL: BACKEND_URLS.CALIFICAR_EXPEDIENTE_BASE, // Override baseURL solo para esta petición
      //   timeout: 5 * 60 * 1000 // 5 minutos en milisegundos
      // });
      await fakeBackendCall({}, 8400);
      
      // Calcular tiempo de procesamiento
      const endTime = Date.now();
      const processingTimeMs = endTime - startTime;
      const processingTimeSeconds = Math.round(processingTimeMs / 1000);
      const processingTimeFormatted = processingTimeSeconds < 60 
        ? `${processingTimeSeconds} segundos`
        : `${Math.round(processingTimeSeconds / 60)} minutos`;
      
      // Imprimir respuesta en consola
      // console.log('📋 Respuesta del backend:', response.data);
      console.log('⏱️ Tiempo de procesamiento:', processingTimeFormatted);
      
      // Mostrar mensaje de éxito en lugar de toast
      setSuccess({
        show: true,
        expediente: expedienteFormateado,
        processingTime: processingTimeFormatted,
        dashboardUrl: `/expediente/${expedienteFormateado}` // URL del dashboard
      });
      
    } catch (error) {
      console.error('❌ Error en backend:', error);
      
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'ECONNABORTED') {
          showError('⏱️ Tiempo de espera agotado. El procesamiento del expediente tomó más de 5 minutos.');
        } else if ('response' in error && error.response) {
          const axiosError = error as { response: { status: number; data?: { message?: string } } };
          showError(`Error del servidor: ${axiosError.response.status} - ${axiosError.response.data?.message || 'Error desconocido'}`);
        } else if ('request' in error) {
          showError('No se pudo conectar al servidor backend. Verifique la conexión.');
        } else if ('message' in error) {
          showError(`Error de configuración: ${(error as { message: string }).message}`);
        }
      } else {
        showError('Ocurrió un error inesperado al procesar el expediente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert 
          message={error} 
          type="error" 
          onClose={() => setError(null)} 
        />
      )}

      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Generador de Proyectos de Resolución
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Este sistema analiza los documentos ingresados para generar proyectos de resolución para procesos jurisdiccionales.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Expediente</h3>
            <p className="text-sm text-gray-600">Ingrese el número de expediente para proceder con el análisis</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              Pendiente de análisis
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Número de Expediente"
              name="num_expediente"
              value={formData.num_expediente}
              onChange={handleInputChange}
              placeholder="Ej: EG.2026105522, ERM.2022012288, EMC.2025005358"
              required
            />
            
            {/* <Select
              label="Tipo de Expediente"
              name="tipo_expediente"
              value={formData.tipo_expediente}
              onChange={handleInputChange}
              options={TIPO_EXPEDIENTE_OPTIONS}
              required
            />
            
            <Select
              label="Tipo de Materia"
              name="tipo_materia"
              value={formData.tipo_materia}
              onChange={handleInputChange}
              options={TIPO_MATERIA_OPTIONS}
              required
            /> */}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <Button 
              type="submit" 
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Procesando...' : 'Analizar Expediente'}
            </Button>
          </div>
          
          {loading && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-jne-red"></div>
                <div className="text-sm text-blue-700">
                  <p className="font-medium">Procesamiento en curso</p>
                  <p className="text-blue-600">El backend está analizando el expediente. Esto puede tomar hasta 5 minutos.</p>
                </div>
              </div>
            </div>
          )}

          {success.show && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-sm text-green-700">
                  <p className="font-medium">Procesamiento completado exitosamente</p>
                  <p className="text-green-600">
                    El expediente <span className="font-mono font-medium">{success.expediente}</span> se procesó exitosamente en {success.processingTime} y ya se puede revisar en el{' '}
                    <a 
                      href={success.dashboardUrl} 
                      className="text-green-800 hover:text-green-900 underline font-medium"
                    >
                      dashboard
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Toast para notificaciones */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
        duration={4000}
      />
    </>
  );
};